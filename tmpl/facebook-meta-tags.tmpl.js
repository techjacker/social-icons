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

  return "<!-- constant -->\n<meta property=\"fb:app_id\" content=\"" + escape(obj.fbAppId) + "\">\n<meta property=\"og:site_name\" content=\"" + escape(obj.websiteName) + "\">\n\n<!-- common but different -->\n<meta property=\"og:url\" content=\"" + escape(obj.url) + "\">\n<meta property=\"og:title\" content=\"" + escape(obj.pageTitle) + "\">\n<meta property=\"og:image\" content=\"" + escape(obj.fbImg) + "\">\n\n" + section(obj, "graph", false, "\n	<meta property=\"og:type\" content=\"article\">\n	<meta property=\"article:published_time\" content=\"" + escape(obj.publishedTime) + "\">\n	<meta property=\"article:section\" content=\"visualisations\">\n") + "\n\n" + section(obj, "homepage", false, "\n	<meta property=\"og:description\" content=\"" + escape(obj.tagline) + "\">\n	<meta property=\"article:modified_time\" content=\"" + escape(obj.nowtoIsoTime) + "\">\n	<!-- <meta property=\"article:modified_time\" content=\"2013-09-13T15:11Z\"> -->\n") + "\n\n"
}