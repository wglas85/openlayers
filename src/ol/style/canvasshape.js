goog.provide('ol.style.CanvasShape');

goog.require('ol');
goog.require('ol.extent');
goog.require('ol.style.Shape');

/**
 * @classdesc
 * Set shape icon style for shape features.
 *
 * @constructor
 * @param {olx.style.CanvasShapeOptions=} opt_options Options.
 * @extends {ol.style.Shape}
 * @api
 */
ol.style.CanvasShape = function(opt_options) {

  var options = opt_options || {};

  /**
   * @type {function(CanvasRenderingContext2D, ol.Extent)}
   */
  this.renderFunction_ = options.renderFunction;

  /**
   * @private
   * @type {ol.Extent}
   */
  this.extent_ = options.extent !== undefined ? options.extent : [-10, -10, 10, 10];

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
};
ol.inherits(ol.style.CanvasShape, ol.style.Shape);


/**
 * Clones the shape style.
 * @return {ol.style.CanvasShape} The cloned shape style.
 * @api
 */
ol.style.CanvasShape.prototype.clone = function() {

  var newExtent = this.extent_ ? ol.extent.clone(this.extent_) : null;
  var newCanvasAnchor = this.getCanvasAnchor() ? this.getCanvasAnchor().slice() : null;

  return new ol.style.CanvasShape({
    rotateWithView: this.getRotateWithView(),
    rotation: this.getRotation(),
    scale: this.getScale(),
    renderFunction: this.renderFunction_,
    extent: newExtent,
    canvasAnchor: newCanvasAnchor
  });
};


/**
 * Set the shape symbol's render function.
 *
 * @param {function(CanvasRenderingContext2D, ol.Extent)} renderFunction function to render.
 * @api
 */
ol.style.CanvasShape.prototype.setRenderFunction = function(renderFunction) {

  this.renderFunction_ = renderFunction;
  this.changed();
};


/**
 * Get the shape symbol's render function.
 * @return {function(CanvasRenderingContext2D, ol.Extent)} Render function.
 * @api
 */
ol.style.CanvasShape.prototype.getRenderFunction = function() {
  return this.renderFunction_;
};


/**
 * Set the shape's extent in canvas coordinates.
 *
 * @param {ol.Extent} extent Extent in canvas coordinates.
 * @api
 */
ol.style.CanvasShape.prototype.setExtent = function(extent) {
  this.extent_ = extent;
  this.changed();
};


/**
 * @inheritDoc
 * @api
 */
ol.style.CanvasShape.prototype.getExtent = function() {

  return this.extent_;
};


/**
 * @override
 */
ol.style.CanvasShape.prototype.render = function(context, extent) {

  if (this.renderFunction_) {
    context.save();
    try {
      this.renderFunction_(context, extent);
    } finally {
      context.restore();
    }
  }
};
