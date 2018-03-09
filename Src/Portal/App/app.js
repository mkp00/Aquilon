"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css");
require("../node_modules/ui-select/dist/select.css");
require("../node_modules/font-awesome/css/font-awesome.css");
require("../node_modules/bootstrap/dist/css/bootstrap.css");
require("../Content/Site.css");
var angular = require("angular");
var app_component_1 = require("./app.component");
var login_component_1 = require("./Login/login.component");
var order_component_1 = require("./Orders/order.component");
var orderSearch_component_1 = require("./Orders/orderSearch.component");
var orderList_component_1 = require("./Orders/orderList.component");
var auth_service_1 = require("./Services/auth.service");
exports.app = angular.module('app', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'angular-jwt',
    'ui.select'
])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state({
            name: 'app',
            url: '/',
            component: 'app'
        }).state({
            name: 'login',
            url: '/login',
            component: "login"
        }).state({
            name: 'order',
            url: '/order',
            component: "order"
        });
        $urlRouterProvider.otherwise('/');
    }])
    .factory('$exceptionHandler', ["$log", function ($log) {
        return function (err, cause) {
            $log.error(err.message + err.stack);
            alert("Unhandled exception");
        };
    }])
    .service(auth_service_1.AuthService.serviceId, ["$http", "$state", "jwtHelper", function ($http, $state, jwtHelper) { return new auth_service_1.AuthService($http, $state, jwtHelper); }])
    .component("app", new app_component_1.AppComponent())
    .component("login", new login_component_1.LoginComponent())
    .component("order", new order_component_1.OrderComponent())
    .component("orderSearch", new orderSearch_component_1.OrderSearchComponent())
    .component("orderList", new orderList_component_1.OrderListComponent())
    .run(["$rootScope", "$http", "$state", "$transitions", function ($rootScope, $http, $state, $transitions) {
        //keep user logged in after page refresh
        if (localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.currentUser.token;
        }
        // redirect to login page if not logged in and trying to access a restricted page
        $transitions.onStart({}, function (transition) {
            var publicStates = ['login'];
            var restrictedState = publicStates.indexOf(transition.to().name) === -1;
            if (restrictedState && !localStorage.currentUser) {
                $state.go("login");
            }
        });
    }]);
angular.element(document).ready(function () { angular.bootstrap(document, ['app']); });
//# sourceMappingURL=app.js.map