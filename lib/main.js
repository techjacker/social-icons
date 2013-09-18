if (typeof require !== 'undefined') {
	var fbTmpl = require('../tmpl/facebook.tmpl.js');
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = fbTmpl;
}