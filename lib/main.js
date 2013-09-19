if (typeof require !== 'undefined') {
	var fbLike = require('../tmpl/facebook-like.tmpl.js');
	var fbMetaTags = require('../tmpl/facebook-meta-tags.tmpl.js');
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		fbLike: fbLike,
		fbMetaTags: fbMetaTags
	};
}