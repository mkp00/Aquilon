"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = require('./login.html');
var LoginController = /** @class */ (function () {
    function LoginController($scope, auth) {
        this.$scope = $scope;
        this.auth = auth;
    }
    LoginController.prototype.onSubmit = function () {
        this.auth.login({ username: this.username, password: this.password });
    };
    LoginController.$inject = ["$scope", "AuthService"];
    return LoginController;
}());
var LoginComponent = /** @class */ (function () {
    function LoginComponent() {
        this.controller = LoginController;
        this.template = template;
    }
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map