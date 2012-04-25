var url = 'http://annesamuelson.wordpress.com/feed/';

google.load('feeds', '1');

var getEntries = function(url, callback) {
  var feed = new google.feeds.Feed(url);
  feed.load(function(result) {
    callback(result.feed.entries);
  });
};

var formatDate = function(date) {
  return $.datepicker.formatDate('MM dd, yy', new Date(date));
}

var makeElement = function(entry) {
  var title = $(document.createElement('h1'));
  title.append(entry.title);
  title.addClass('title');
  var date = $(document.createElement('h2'));
  date.append(formatDate(entry.publishedDate));
  date.addClass('date');
  var blog = $(document.createElement('div'));
  blog.append(entry.content);
  $('a[rel=nofollow]', blog).css('display', 'none');
  $('iframe', blog).remove();
  var container = $(document.createElement('div'));
  container.addClass('blogEntry');
  container.append(title, date, blog);
  return container;
};

var insertEntries = function(parent, entries) {
  var elements = jQuery.map(entries, makeElement);
  jQuery.map(elements, function(element) { $(parent).append(element); });
};

function insertBlog(elem) {
  var entries = getEntries(url, function(entries) {
    insertEntries(elem, entries);
  });
}
