module.exports = function(Handlebars) {

this["MyTemp"] = this["MyTemp"] || {};

this["MyTemp"]["app/templates/genres"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "        <li><input type=\"checkbox\" name="
    + alias2(alias1(depth0, depth0))
    + ">"
    + alias2(alias1(depth0, depth0))
    + "</li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<button id=\"by_title\">By Title</button>\r\n<button id=\"by_rating\">By Rating</button>\r\n<button id=\"by_showtime\">By Showtime</button> \r\n<a id=\"prev\">prev</a>&nbsp<a id=\"next\">Next</a>\r\n<ul>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.genres : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\r\n";
},"useData":true});

this["MyTemp"]["app/templates/join"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class='overlay'></div>\r\n<div class='content'>\r\n   <span class='close'>close</span>\r\n   <section class='join'>\r\n     <h1>Register</h1>\r\n     <div class='error'></div>\r\n     <form>\r\n     <label for='username'>Username</label>\r\n     <input type='text' name='username' />\r\n     <br>\r\n     <label for='email'>Email Address</label>\r\n     <input type='text' name='email' />\r\n     <br>\r\n     <label for='password'>Password</label>\r\n     <input type='password' name='password' />\r\n     <br>\r\n     <input type='submit'></input>\r\n   </section>\r\n</div>";
},"useData":true});

this["MyTemp"]["app/templates/login"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class='overlay'></div>\r\n  <div class='content'>\r\n  <span class='close'>close</span>\r\n  <h2>Login</h2>\r\n  <span class='error'></span>\r\n  <form id='login'>\r\n    <label for='username'>\r\n      Username:\r\n    </label>\r\n    <input name='username' />\r\n    <br>\r\n    <label for='password'>\r\n      Password:\r\n    </label>\r\n    <input type='password' name='password' />\r\n    <br>\r\n    <input type='submit'></input>\r\n  </form>\r\n</div>";
},"useData":true});

this["MyTemp"]["app/templates/navbar"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "  <!-- active user session -->\r\n  <a href=\"#\" class=\"logout\">Logout</a>\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "  <!-- no user session -->\r\n  <a href=\"#\" class=\"login\">Login</a> |\r\n  <a href=\"#\" class=\"join\">Join</a>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.session : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

return this["MyTemp"];

};