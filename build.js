import './js/scripts.js';

var __svg__ = { path: './img/*.svg', name: './sprite.svg' };
__svg__ = {filename: './assets/sprite.svg'};
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);