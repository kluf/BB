module.exports = function(Handlebars) {

return Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"overlay\"></div>\r\n<div class=\"content\">\r\n   <span class=\"close\">close</span>\r\n   <section class=\"join\">\r\n     <h1>Register</h1>\r\n     <div class=\"error\"></div>\r\n     <form>\r\n     <label for=\"username\">Username</label>\r\n     <input type=\"text\" name=\"username\" />\r\n     <br>\r\n     <label for=\"email\">Email Address</label>\r\n     <input type=\"text\" name=\"email\" />\r\n     <br>\r\n     <label for=\"password\">Password</label>\r\n     <input type=\"password\" name=\"password\" />\r\n     <br>\r\n     <input type=\"submit\"></input>\r\n   </section>\r\n</div>";
},"useData":true});

return Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "  <!-- active user session -->\r\n  <a href=\"#\" class=\"logout\">Logout</a>\r\n";
},"3":function(depth0,helpers,partials,data) {
    return "  <!-- no user session -->\r\n  <a href=\"#\" class=\"login\">Login</a> |\r\n  <a href=\"#\" class=\"join\">Join</a>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.session : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

};