"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = require('./login.html');
var LoginController = /** @class */ (function () {
    /*@ngInject*/
    function LoginController(auth) {
        this.auth = auth;
        this.welcome = 'hello ng';
    }
    LoginController.prototype.onLogin = function () {
        this.auth.login({ username: this.username, password: this.password });
    };
    LoginController.$inject = ["AuthService"];
    return LoginController;
}());
var LoginManager = /** @class */ (function () {
    function LoginManager() {
        this.controller = LoginController;
        this.template = template;
    }
    return LoginManager;
}());
exports.LoginManager = LoginManager;
//# sourceMappingURL=login-manager.component.js.map