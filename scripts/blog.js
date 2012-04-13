var url = 'http://annesamuelson.wordpress.com/feed/';

google.load('feeds', '1');

var getEntries = function(url, callback) {
  var feed = new google.feeds.Feed(url);
  feed.load(function(result) {
    callback(result.feed.entries);
  });
};

var makeElement = function(entry) {
  var title = document.createElement('h2');
  title.appendChild(
      document.createTextNode(entry.title));
  var date = document.createElement('h3');
  date.appendChild(
      document.createTextNode(entry.publishedDate));
  var blog = document.createElement('div');
  blog.innerHTML = entry.content;
  var container = document.createElement('div');
  container.appendChild(title);
  container.appendChild(date);
  container.appendChild(blog);
  return container;
};

var insertEntries = function(parent, entries) {
  var elements = jQuery.map(entries, makeElement);
  jQuery.map(elements, function(element) { parent.appendChild(element); });
};

$(document).ready(function() {
  var entries = getEntries(url, function(entries) { 
    insertEntries(document.getElementById('blog'), entries);  
  });
});
