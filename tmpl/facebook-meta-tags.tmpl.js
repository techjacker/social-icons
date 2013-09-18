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

  return "<meta property=\"fb:app_id\"          content=\"1234567890\" />\n<meta property=\"og:type\"            content=\"social-cookbook:recipe\" />\n<meta property=\"og:url\"             content=\"http://samples.ogp.me/136756249803614\" />\n<meta property=\"og:title\"           content=\"Chocolate Pecan Pie\" />\n<meta property=\"og:image\"           content=\"https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/851565_496755187057665_544240989_n.jpg\" />\n<meta property=\"cookbook:author\"    content=\"http://samples.ogp.me/390580850990722\" />\n\n\n<meta content=\"Sky News for Facebook - dev\" property=\"og:site_name\">\n<meta content=\"http://dev.app.sky.com/\" property=\"og:url\">\n<meta content=\"Sky News for Facebook - dev\" property=\"og:title\">\n<meta content=\"First for Breaking News\" property=\"og:description\">\n<meta content=\"http://dev.app.sky.com/static/img/SkyNews_Logo_Square_200x200.jpg?id=1377022862\" property=\"og:image\">"
}