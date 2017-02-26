goog.provide('ol.style.Shape');

goog.require('ol');
goog.require('ol.style.Image');

/**
 * @classdesc
 * Set shape icon style for shape features.
 *
 * @constructor
 * @abstract
 * @param {olx.style.ShapeOptions=} opt_options Options.
 * @extends {ol.style.Image}
 * @api
 */
ol.style.Shape = function(opt_options) {

  var options = opt_options || {};

  /**
   * @private
   * @type {Array.<number>}
   */
  this.canvasAnchor_ = options.canvasAnchor !== undefined ? options.canvasAnchor : [0, 0];

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

  /**
   * @private
   * @type {?HTMLCanvasElement}
   */
  this.image_ = null;

  /**
   * @private
   * @type {?Array.<number>}
   */
  this.anchor_ = null;
};
ol.inherits(ol.style.Shape, ol.style.Image);


/**
 * Get the extent of the smybol's canvas coordinates.
 * @abstract
 * @return {ol.Extent} Extent.
 * @api
 */
ol.style.Shape.prototype.getExtent = function() {};


/**
 * Render the shape to the given canvas context.
 * @abstract
 * @param {CanvasRenderingContext2D} context The canvas 2D context.
 * @param {ol.Extent} extent Extent.
 * @api
 */
ol.style.Shape.prototype.render = function(context, extent) {};


/**
 * Invalidate the internally cached image state upon changs to the style.
 * @protected
 */
ol.style.Shape.prototype.changed = function() {
  this.image_ = null;
  this.anchor_ = null;
};


/**
 * Set the shape's anchor in canvas coordinates.
 *
 * @param {Array.<number>} canvasAnchor The anchor point.
 * @api
 */
ol.style.Shape.prototype.setCanvasAnchor = function(canvasAnchor) {
  this.canvasAnchor_ = canvasAnchor;
  this.changed();
};


/**
 * Get the shape's anchor in canvas coordinates.
 *
 * @return {Array.<number>} The canvas anchor point.
 * @api
 */
ol.style.Shape.prototype.getCanvasAnchor = function() {
  return this.canvasAnchor_;
};

/**
 * Actually render the shape in a deferred manner, if requested by the renderer.
 *
 * @private
 */
ol.style.Shape.prototype.renderImage_ = function() {

  var extent = this.getExtent();

  var minx = Math.floor(extent[0]);
  var miny = Math.floor(extent[1]);
  var maxx = Math.ceil(extent[2]);
  var maxy = Math.ceil(extent[3]);

  var canvas =
      /** @type {HTMLCanvasElement} */ (document.createElement('canvas'));

  canvas.width = maxx - minx;
  canvas.height = maxy - miny;

  var context = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

  context.translate(-minx, -miny);

  this.render(context, extent);

  this.image_ = canvas;
  this.anchor_ = [this.canvasAnchor_[0] - minx, this.canvasAnchor_[1] - miny];
};

/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getAnchor = function() {

  if (!this.anchor_) {
    this.renderImage_();
  }
  return this.anchor_;
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getImage = function(pixelRatio) {

  if (!this.image_) {
    this.renderImage_();
  }
  return this.image_;
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getHitDetectionImage = function(pixelRatio) {
  return this.getImage(pixelRatio);
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
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getOrigin = function() {
  return [0, 0];
};


/**
 * @inheritDoc
 * @api
 */
ol.style.Shape.prototype.getSize = function() {

  if (!this.image_) {
    this.renderImage_();
  }
  return [this.image_.width, this.image_.height];
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
