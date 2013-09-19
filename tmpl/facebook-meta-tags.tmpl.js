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

  return "<meta property=\"og:url\" content=\"" + escape(obj.url) + "\">\n<meta property=\"og:title\" content=\"" + escape(obj.title) + "\">\n<meta property=\"og:image\" content=\"" + escape(obj.img) + "\">\n" + section(obj, "graph", false, "\n	<meta property=\"og:type\" content=\"article\">\n	<meta property=\"article:publisher\" content=\"" + escape(obj.fbAppId) + "\">\n	<meta property=\"article:section\" content=\"visualisations\">\n	<meta property=\"article:published_time\" content=\"" + escape(obj.time) + "\">\n	" + section(obj, "author", false, "<meta property=\"article:author\" content=\"" + escape(obj.author) + "\">") + "\n") + "\n" + section(obj, "homepage", false, "\n	<meta property=\"og:description\" content=\"" + escape(obj.desc) + "\">\n	<meta property=\"article:modified_time\" content=\"" + escape(obj.modified) + "\">\n	<!-- <meta property=\"article:modified_time\" content=\"2013-09-13T15:11Z\"> -->\n") + "\n\n"
}