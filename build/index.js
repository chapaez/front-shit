import './../js/scripts.js';

var __svg__           = { path: './../img/*.svg', name: '/assets/sprite.svg' };
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);