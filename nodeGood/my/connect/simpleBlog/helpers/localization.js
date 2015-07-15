var Localization = function(lang, param) {
    if (typeof(languageExists) === 'function') {
        return this;
    }
    this.language = lang || 'en_gb';
    languageExists = this;
}

var en = {
    titleIndex: "Main page",
    titleAddUser: "Add user",
    titleProfile: "Profile",
    titleAddPost: "Add post"
}

var ua = {
    titleIndex: "Головна сторінка",
    titleAddUser: "Додати користувача",
    titleProfile: "Профіль",
    titleAddPost: "Додати пост"
}

Localization.prototype.get = function(param) {
    switch(this.language) {
        case 'en_gb':
            return en[param];
            break;
        case 'ua':
            return ua[param]
            break;
        default:
            return en[param];
    }
}

module.exports = Localization;
