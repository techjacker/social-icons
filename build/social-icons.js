
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("social-icons/lib/main.js", function(exports, require, module){
if (typeof require !== 'undefined') {
	var fbLike = require('../tmpl/facebook-like.tmpl.js');
	var fbMetaTags = require('../tmpl/facebook-meta-tags.tmpl');
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		fbLike: fbLike,
		fbMetaTags: fbMetaTags
	};
}
});
require.register("social-icons/tmpl/facebook-like.tmpl.js", function(exports, require, module){
module.exports = function anonymous(obj) {

  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function section(obj, prop, negate, str) {
    var val = obj[prop];
    if ('function' == typeof val) return val.call(obj, str);
    if (negate) val = !val;
    if (val) return str;
    return '';
  };

  return "<div id=\"facebook-container\">\n	<iframe src=\"//www.facebook.com/plugins/like.php?href=http%3A%2F%2F" + escape(obj.url) + "&amp;width=80&amp;height=20&amp;colorscheme=light&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;send=true\" scrolling=\"no\" frameborder=\"0\" allowTransparency=\"true\"></iframe>\n</div>"
}
});
require.register("social-icons/tmpl/facebook-meta-tags.tmpl.js", function(exports, require, module){
module.exports = function anonymous(obj) {

  function escape(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  function section(obj, prop, negate, str) {
    var val = obj[prop];
    if ('function' == typeof val) return val.call(obj, str);
    if (negate) val = !val;
    if (val) return str;
    return '';
  };

  return "<meta property=\"fb:app_id\"          content=\"1234567890\" />\n<meta property=\"og:type\"            content=\"social-cookbook:recipe\" />\n<meta property=\"og:url\"             content=\"http://samples.ogp.me/136756249803614\" />\n<meta property=\"og:title\"           content=\"Chocolate Pecan Pie\" />\n<meta property=\"og:image\"           content=\"https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/851565_496755187057665_544240989_n.jpg\" />\n<meta property=\"cookbook:author\"    content=\"http://samples.ogp.me/390580850990722\" />\n\n<!-- homepage -->\n<meta content=\"Sky News for Facebook - dev\" property=\"og:site_name\">\n<meta content=\"http://dev.app.sky.com/\" property=\"og:url\">\n<meta content=\"Sky News for Facebook - dev\" property=\"og:title\">\n<meta content=\"First for Breaking News\" property=\"og:description\">\n<meta content=\"http://dev.app.sky.com/static/img/SkyNews_Logo_Square_200x200.jpg?id=1377022862\" property=\"og:image\">\n\n\n<!-- article -->\n<meta property=\"fb:app_id\" content=\"319816014746238\">\n<meta property=\"og:type\" content=\"article\">\n<meta property=\"og:url\" content=\"http://apps.facebook.com/skynewsfbadev/article.php?id=1129766\">\n<meta property=\"og:site_name\" content=\"Sky News for Facebook - dev\">\n<meta property=\"og:image\" content=\"http://qa.scoop.bskyb.com/media/images/generated/defaults/1420/default/v0/default-web-180x180.jpg\">\n<meta property=\"og:title\" content=\"TEST 2\">\n<meta property=\"og:description\" content=\"120913 iPad At The Cinema Hannah S…\">\n<meta property=\"article:published_time\" content=\"2013-09-13T15:11Z\">\n<meta property=\"article:modified_time\" content=\"2013-09-13T15:11Z\">\n<meta property=\"article:section\" content=\"unknown\">"
}
});
require.alias("social-icons/lib/main.js", "social-icons/index.js");