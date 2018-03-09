"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = require('./order.html');
var OrderController = /** @class */ (function () {
    function OrderController($http, $state, auth) {
        this.$http = $http;
        this.$state = $state;
        this.auth = auth;
        this.pagetitle = "Sales Order";
    }
    OrderController.prototype.getOrders = function (orderSearchData) {
        var _this = this;
        this.$http.get('services/v1/orders', { params: { customername: orderSearchData.customername, datetype: orderSearchData.datetype, date: orderSearchData.date } })
            .then(function (resp) {
            _this.orders = resp.data;
        }, function (err) { alert(err.data.Message); console.log(err.data.Message); });
    };
    OrderController.prototype.onLogoutClick = function () {
        this.$state.go('login');
    };
    OrderController.prototype.StopEvent = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };
    OrderController.$inject = ["$http", "$state", "AuthService"];
    return OrderController;
}());
var OrderComponent = /** @class */ (function () {
    function OrderComponent() {
        this.controller = OrderController;
        this.template = template;
    }
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map