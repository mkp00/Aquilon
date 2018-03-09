"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthService = /** @class */ (function () {
    function AuthService($http, $state, jwtHelper) {
        this.$http = $http;
        this.$state = $state;
        this.jwtHelper = jwtHelper;
        this.tokenName = 'id_token';
    }
    AuthService.prototype.login = function (credentials) {
        var _this = this;
        this.$http.post('services/v1/login', credentials)
            .then(function (resp) {
            localStorage.currentUser = { username: credentials.username, token: resp.data };
            _this.$http.defaults.headers.common.Authorization = 'Bearer ' + resp.data;
            _this.$state.go('order');
        }, function (err) { alert(err.data.Message); console.log(err.data.Message); });
    };
    AuthService.prototype.loggedIn = function () {
        return this.jwtHelper.isTokenExpired(localStorage.getItem(this.tokenName));
    };
    AuthService.prototype.logout = function () {
        delete localStorage.currentUser;
        this.$state.go('login');
        this.$http.defaults.headers.common.Authorization = '';
    };
    AuthService.serviceId = "AuthService";
    AuthService.$inject = ["$http", "$state", "jwtHelper"];
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map