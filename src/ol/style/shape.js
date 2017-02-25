goog.provide('ol.style.Shape');

goog.require('ol');
goog.require('ol.style.Image');

/**
 * @classdesc
 * Set shape icon style for shape features.
 *
 * @constructor
 * @param {olx.style.ShapeOptions=} opt_options Options.
 * @extends {ol.style.Image}
 * @api
 */
ol.style.Shape = function(opt_options) {

  var options = opt_options || {};

  /**
   * @type {ol.geom.Geometry}
   */
  this.geometry_ = options.geometry !== undefined ? options.geometry : null;

  /**
   * @private
   * @type {ol.Size}
   */
  this.size_ = options.size !== undefined ? options.size : [10, 10];

  /**
   * @private
   * @type {Array.<number>}
   */
  this.anchor_ = options.anchor !== undefined ? options.anchor : [0, 0];

  /**
   * @private
   * @type {Array.<number>}
   */
  this.origin_ = options.origin !== undefined ? options.origin : [-10, -10];

  /**
   * @private
   * @type {ol.style.Fill}
   */
  this.fill_ = options.fill !== undefined ? options.fill : null;

  /**
   * @private
   * @type {ol.style.Stroke}
   */
  this.stroke_ = options.stroke !== undefined ? options.stroke : null;

  /**
   * @type {boolean}
   */
  var rotateWithView = options.rotateWithView !== undefined ?
      options.rotateWithView : false;

  /**
   * @type {number}
   */
  var rotation = options.rotation !== undefined ? options.rotation : 0;

  /**
   * @type {number}
   */
  var scale = options.scale !== undefined ? options.scale : 1;

  /**
   * @type {boolean}
   */
  var snapToPixel = options.snapToPixel !== undefined ?
      options.snapToPixel : true;

  ol.style.Image.call(this, {
    opacity: 1,
    rotation: rotation,
    scale: scale,
    snapToPixel: snapToPixel,
    rotateWithView: rotateWithView
  });

};
ol.inherits(ol.style.Shape, ol.style.Image);


/**
 * Clones the shape style.
 * @return {ol.style.Shape} The cloned shape style.
 * @api
 */
ol.style.Shape.prototype.clone = function() {

  var newGeometry = this.geometry_ ? this.geometry_.clone() : null;
  var newAnchor = this.anchor_ ? this.anchor_.slice() : null;
  var newOrigin = this.origin_ ? this.origin_.slice() : null;
  var newSize = this.size_ ? this.size_.slice() : null;
  var newFill = this.fill_ ? this.fill_.clone() : null;
  var newStroke = this.stroke_ ? this.stroke_.clone() : null;

  return new ol.style.Shape({
    rotateWithView: this.rotateWithView_,
    rotation: this.rotation_,
    scale: this.scale_,
    geometry: newGeometry,
    fill: newFill,
    stroke: newStroke,
    anchor: newAnchor,
    origin: newOrigin,
    size: newSize
  });
};


/**
 * Get the shape symbols's geometry.
 * @return {ol.geom.Geometry} Geometry.
 * @api
 */
ol.style.Shape.prototype.getGeometry = function() {
  return this.geometry_;
};


/**
 * Set the shape symbols's geometry.
 *
 * @param {ol.geom.Geometry} geometry Geometry.
 * @api
 */
ol.style.Shape.prototype.setGeometry = function(geometry) {
  this.geometry_ = geometry;
};


/**
 * Get the stroke style for the shape.
 * @return {ol.style.Stroke} Stroke style.
 * @api
 */
ol.style.Shape.prototype.getStroke = function() {
  return this.stroke_;
};


/**
 * Get the fill style for the shape.
 * @return {ol.style.Fill} Fill style.
 * @api
 */
ol.style.Shape.prototype.getFill = function() {
  return this.fill_;
};


/**
 * Set the shape's anchor.
 *
 * @param {Array.<number>} anchor The anchor point.
 * @api
 */
ol.style.Shape.prototype.setAnchor = function(anchor) {
  this.anchor_ = anchor;
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getAnchor = function() {
  return this.anchor_;
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getImage = function(pixelRatio) {
  return this.getGeometry();
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getHitDetectionImage = function(pixelRatio) {
  return this.getGeometry();
};


/**
 * @override
 * @return {ol.ImageState} Image state, always {ol.ImageState.LOADED}.
 */
ol.style.Shape.prototype.getImageState = function() {
  return ol.ImageState.LOADED;
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getImageSize = function() {
  return this.getSize();
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getHitDetectionImageSize = function() {
  return this.getSize();
};


/**
 * Set the shape's origin aka the upper-left corner of the shape's coordinates.
 *
 * @param {Array.<number>} origin The upper-left corner of the shape's coordinates.
 * @api
 */
ol.style.Shape.prototype.setOrigin = function(origin) {
  this.origin_ = origin;
};

/**
 * @override
 * @return {Array.<number>} Origin, the upper-left corner of the shape's coordinates.
 */
ol.style.Shape.prototype.getOrigin = function() {
  return this.origin_;
};


/**
 * Set the shape's size aka the lower-right corner of the shape's coordinates.
 *
 * @param {Array.<number>} size The size of the image.
 * @api
 */
ol.style.Shape.prototype.setSize = function(size) {
  this.size_ = size;
};


/**
 * @override
 * @return {Array.<number>} Size, the lower-right corner of the shape's coordinates.
 */
ol.style.Shape.prototype.getSize = function() {
  return this.size_;
};

/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.listenImageChange = function(listener, thisArg) {};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.load = function() {};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.unlistenImageChange = function(listener, thisArg) {};
