/**
 *  Entry Point
 */
const getPixels = require('get-pixels');
const savePixels = require('save-pixels');
const renderer = require('./renderer');

// lib
module.exports.getPixels = getPixels;
module.exports.savePixels = savePixels;

// renderer
module.exports.preset = renderer.preset;
module.exports.convolution = renderer.convolution;


/**
 * render using custom filters.
 * @param path
 * @param filter
 * @param callback
 */
module.exports.render = function (path, filter, callback) {
    getPixels(path, function (err, pixels) { // load image
        if (err) {
            console.log('node-image-filter', err);
            return;
        }

        // image processing
        filter(pixels.data);
        var type = path.split('.').pop();

        var renderObject = {
            data : savePixels(pixels, type)._obj,
            type : type,
            width : pixels.shape[0],
            height : pixels.shape[1]
        };

        callback(renderObject);
    });
};