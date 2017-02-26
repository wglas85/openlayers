goog.provide('ol.style.GeometryShape');

goog.require('ol');
goog.require('ol.events');
goog.require('ol.render');
goog.require('ol.style.Shape');

/**
 * @classdesc
 * Set shape icon style for shape features.
 *
 * @constructor
 * @param {olx.style.GeometryShapeOptions=} opt_options Options.
 * @extends {ol.style.Shape}
 * @api
 */
ol.style.GeometryShape = function(opt_options) {

  var options = opt_options || {};

  /**
   * @type {ol.geom.Geometry}
   */
  this.geometry_ = options.geometry !== undefined ? options.geometry : null;

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
   * @private
   * @type {Array.<number>}
   */
  var canvasAnchor = options.canvasAnchor !== undefined ? options.canvasAnchor : [0, 0];

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

  ol.style.Shape.call(this, {
    canvasAnchor: canvasAnchor,
    opacity: 1,
    rotation: rotation,
    scale: scale,
    snapToPixel: snapToPixel,
    rotateWithView: rotateWithView
  });

  /**
   * @private
   * @type {?ol.EventsKey}
   */
  this.geometryChangedKey_ = this.geometry_ ?
      ol.events.listen(this.geometry_, ol.events.EventType.CHANGE, this.changed, this) :
      null;

  /**
   * @private
   * @type {?ol.Extent}
   */
  this.extent_ = null;
};
ol.inherits(ol.style.GeometryShape, ol.style.Shape);


/**
 * Clones the shape style.
 * @return {ol.style.GeometryShape} The cloned shape style.
 * @api
 */
ol.style.GeometryShape.prototype.clone = function() {

  var newGeometry = this.geometry_ ? this.geometry_.clone() : null;
  var newCanvasAnchor = this.getCanvasAnchor() ? this.getCanvasAnchor().slice() : null;
  var newFill = this.fill_ ? this.fill_.clone() : null;
  var newStroke = this.stroke_ ? this.stroke_.clone() : null;

  return new ol.style.GeometryShape({
    rotateWithView: this.getRotateWithView(),
    rotation: this.getRotation(),
    scale: this.getScale(),
    geometry: newGeometry,
    fill: newFill,
    stroke: newStroke,
    canvasAnchor: newCanvasAnchor
  });
};


/**
 * Get the shape symbols's geometry.
 * @return {ol.geom.Geometry} Geometry.
 * @api
 */
ol.style.GeometryShape.prototype.getGeometry = function() {
  return this.geometry_;
};


/**
 * Set the shape symbols's geometry.
 *
 * @param {ol.geom.Geometry} geometry Geometry.
 * @api
 */
ol.style.GeometryShape.prototype.setGeometry = function(geometry) {

  if (this.geometryChangedKey_) {
    ol.events.unlistenByKey(this.geometryChangedKey_);
    this.geometryChangedKey_ = null;

  }

  this.geometry_ = geometry;

  if (this.geometry_) {
    this.geometryChangedKey_ = ol.events.listen(this.geometry_, ol.events.EventType.CHANGE, this.changed, this);
  }

  this.changed();
};


/**
 * Get the stroke style for the shape.
 * @return {ol.style.Stroke} Stroke style.
 * @api
 */
ol.style.GeometryShape.prototype.getStroke = function() {
  return this.stroke_;
};


/**
 * Get the fill style for the shape.
 * @return {ol.style.Fill} Fill style.
 * @api
 */
ol.style.GeometryShape.prototype.getFill = function() {
  return this.fill_;
};


/**
 * @inheritDoc
 * @api
 */
ol.style.GeometryShape.prototype.getExtent = function() {

  if (this.extent_ === null && this.geometry_) {

    this.extent_ = this.geometry_.getExtent();

    if (this.stroke_) {
      var d = 0.5 * this.stroke_.getWidth();
      this.extent_[0] -= d;
      this.extent_[1] -= d;
      this.extent_[2] += d;
      this.extent_[3] += d;
    }
  }

  return this.extent_;
};

/**
 * @override
 */
ol.style.GeometryShape.prototype.changed = function() {

  ol.style.Shape.prototype.changed.call(this);
  this.extent_ = null;
};

/**
 * @override
 */
ol.style.GeometryShape.prototype.render = function(context, extent) {

  var render = ol.render.toContext(context, {extent: extent});
  render.setFillStrokeStyle(this.fill_, this.stroke_);
  render.drawGeometry(this.geometry_);
};
