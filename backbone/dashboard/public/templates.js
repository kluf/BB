this["JST"] = this["JST"] || {};

this["JST"]["controls"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li><a href="/create">Create event</a></li>';

}
return __p
};

this["JST"]["event"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<td>' +
((__t = (id)) == null ? '' : __t) +
'</td>\r\n<td>' +
((__t = (title)) == null ? '' : __t) +
'</td>\r\n<td>' +
((__t = (details)) == null ? '' : __t) +
'</td>\r\n<td>' +
((__t = (date)) == null ? '' : __t) +
'</td>\r\n<td>' +
((__t = (createdOn)) == null ? '' : __t) +
'</td>\r\n<td>\r\n  <button class="edit btn btn-inverse">\r\n    <span class="glyphicon glyphicon-edit glyphicon-white"></span>\r\n  </button>\r\n  <button class="delete btn btn-danger">\r\n    <span class="glyphicon glyphicon-trash"></span>\r\n  </button>\r\n</td>';

}
return __p
};

this["JST"]["events"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<thead>\r\n  <tr>\r\n    <th data-field="id">ID</th>\r\n    <th data-field="title">Title</th>\r\n    <th data-field="details">Details</th>\r\n    <th data-field="date">Date</th>\r\n    <th data-field="createdOn">Created On</th>\r\n    <th> Actions </th>\r\n  </tr>\r\n</thead>\r\n<tbody></tbody>';

}
return __p
};

this["JST"]["modifyEvents"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="modal-dialog">\r\n<div class="modal-content">\r\n  <div class="modal-header">\r\n    <button class="close">&times;</button>\r\n    <h4 class="modal-title"> ' +
((__t = ( heading )) == null ? '' : __t) +
' </h4>\r\n  </div>\r\n  <div class="modal-body">\r\n  <form>\r\n      <label>Title</label>\r\n      <input type="text" class="form-control" id="title"\r\nvalue="' +
((__t = (title)) == null ? '' : __t) +
'" />\r\n      <label>Details</label>\r\n      <textarea id="details"  class="form-control">' +
((__t = (details)) == null ? '' : __t) +
'</textarea>\r\n      <label>Date</label>\r\n      <input type="datetime-local" class="form-control" id="date"\r\nvalue="' +
((__t = (date)) == null ? '' : __t) +
'" />\r\n    </form>\r\n  </div>\r\n  <div class="modal-footer">\r\n    <a href="#" class="modify btn btn-primary"> ' +
((__t = (btnText)) == null ? '' : __t) +
' </a>\r\n  </div>\r\n</div>\r\n</div>';

}
return __p
};