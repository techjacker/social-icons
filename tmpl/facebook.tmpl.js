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