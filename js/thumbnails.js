$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$activeDiv = this.$el.find("div.active")
  this.$gutterImages = this.$el.find('div.gutter-images');

  this.$activeImg = this.$gutterImages.children().first();
  this.activate(this.$activeImg);

  this.gutterIdx = 0;
  this.$images = this.$gutterImages.children();
  this.fillGutterImages();

  this.$gutterImages.on("click", "img", (function (event) {
    this.$activeImg = $(event.currentTarget)
    this.activate(this.$activeImg);
  }).bind(this));
  this.$gutterImages.on("mouseenter", "img", (function (event) {
    this.activate($(event.currentTarget));
  }).bind(this));
  this.$gutterImages.on("mouseleave", "img", (function (event) {
    this.activate(this.$activeImg);
  }).bind(this));
  this.$el.on("click", "a.nav", (function (event) {
    var $a = $(event.currentTarget);

    if ($a.hasClass("left") && (this.gutterIdx > 0)) {
      this.gutterIdx -= 1;
    } else if ($a.hasClass("right") &&
               ((this.gutterIdx + 5) < this.$images.length)) {
      this.gutterIdx += 1;
    }
    this.fillGutterImages();
  }).bind(this));
};

$.Thumbnails.prototype.activate = function ($img) {
  this.$activeDiv.html($img.clone());
};

$.Thumbnails.prototype.fillGutterImages = function () {
  this.$gutterImages.children().remove();

  this.$images.each((function (idx, element) {
    if (idx < this.gutterIdx || idx >= this.gutterIdx + 5) {
      return;
    }

    this.$gutterImages.append(element);
  }).bind(this));
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};

$(function () {
  $(".thumbnails").thumbnails();
});
