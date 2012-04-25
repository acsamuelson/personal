var url = 'http://annesamuelson.wordpress.com/feed/';
var MAX_HEIGHT = 340;
var MAX_WIDTH = 575;

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

var scaleImage = function(image, maxHeight, maxWidth) {
  removeImageSize(image);
  $(image).load(function() {
    var image = $(this);
    var ratio = 0;
    var height = this.naturalHeight;
    var width = this.naturalWidth;
    if (width > maxWidth) {
      ratio = maxWidth / width;
      width = maxWidth;
      image.css('width', maxWidth);
      height = height * ratio;
      image.css('height', height);
    }
    if (height > maxHeight) {
      ratio = maxHeight / height;
      height = maxHeight;
      image.css('height', maxHeight);
      width = width * ratio;
      image.css('width', width);
    }
  });
}

var removeImageSize = function(elem) {
  var src = elem.src
  src = src.replace(/w=[^&]+&?/, '');
  src = src.replace(/h=[^&]+&?/, '');
  src = src.replace(/\?$/, '');
  elem.src = src;
}


var makeElement = function(entry) {
  var title = $(document.createElement('h1'));
  title.append(entry.title);
  title.addClass('title');
  var date = $(document.createElement('h2'));
  date.append(formatDate(entry.publishedDate));
  date.addClass('date');
  var blog = $(document.createElement('div'));
  blog.addClass('blogContent');
  blog.append(entry.content);
  $('a[rel=nofollow]', blog).css('display', 'none');
  $.map($('img', blog), function(image) {
    scaleImage(image, MAX_HEIGHT, MAX_WIDTH);
  });
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
