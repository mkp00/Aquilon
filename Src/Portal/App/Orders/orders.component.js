"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var template = require('./orders.html');
var OrdersController = /** @class */ (function () {
    function OrdersController($scope, $http, auth) {
        this.$scope = $scope;
        this.$http = $http;
        this.auth = auth;
        this.selecteddate = 'No Date Selected...';
        this.datetype = 'Order';
        this.isDateSelected = false;
        this.showorders = false;
        this.showsearch = true;
        this.orders = [{
                FirstName: "Marcus",
                LastName: "Patterson",
                AccountNumber: "11111111",
                ShipToAddress: "116 Johnson Woods Drive",
                ShipMethod: "Ground",
                SubTotal: 100.00,
                Tax: 10.00,
                Freight: 25.00,
                Total: 135.00,
                ProductInfo: {
                    Name: "Shoes",
                    ProductNumber: "AF567",
                    Quantity: 1,
                    UnitPrice: 100.00,
                    Discount: "None",
                    LineTotal: 100.00
                }
            }];
        //DatePicker Control
        this.isFromDateOpened = false;
        this.minDate = moment(new Date()).add(-6, "m").toDate(); //Min date from DateDim Table
        this.maxDate = new Date();
    }
    OrdersController.prototype.onSubmit = function () {
        alert(this.datetype + " " + this.customername + " " + this.fromdate);
        this.showorders = true;
    };
    OrdersController.prototype.onDetailsClick = function (index) {
        alert(this.datetype + " " + this.customername + " " + this.fromdate);
        this.productinfo = this.orders[index].ProductInfo;
        this.showsearch = false;
    };
    OrdersController.prototype.backToSearch = function () {
        this.showsearch = true;
    };
    OrdersController.prototype.FromChanged = function () {
        this.selecteddate = moment(this.fromdate).toString();
        this.isDateSelected = true;
    };
    OrdersController.prototype.OpenDatePicker = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var target = event.target;
        this.isFromDateOpened = true;
    };
    OrdersController.prototype.StopEvent = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };
    OrdersController.$inject = ["$scope", "$http", "AuthService"]; //OrderService
    return OrdersController;
}());
var OrdersComponent = /** @class */ (function () {
    function OrdersComponent() {
        this.controller = OrdersController;
        this.template = template;
    }
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;
//# sourceMappingURL=orders.component.js.map