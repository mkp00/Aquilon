"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var template = require('./orderSearch.html');
var OrderSearchController = /** @class */ (function () {
    function OrderSearchController($scope) {
        this.$scope = $scope;
        this.datetype = "order";
        this.selecteddate = 'No Date Selected...';
    }
    OrderSearchController.prototype.$onInit = function () { };
    OrderSearchController.prototype.$onChanges = function (changes) { };
    OrderSearchController.prototype.onDateChange = function () {
        this.selecteddate = moment(this.date).toString();
    };
    OrderSearchController.prototype.submitClicked = function () {
        this.onSubmit({ orderSearchData: { customername: this.customername, datetype: this.datetype, date: this.date } });
    };
    OrderSearchController.$inject = ["$scope"];
    return OrderSearchController;
}());
var OrderSearchComponent = /** @class */ (function () {
    function OrderSearchComponent() {
        this.controller = OrderSearchController;
        this.template = template;
        this.bindings = {
            onSubmit: '&'
        };
    }
    return OrderSearchComponent;
}());
exports.OrderSearchComponent = OrderSearchComponent;
//# sourceMappingURL=orderSearch.component.js.map