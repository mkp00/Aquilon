"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = require('./orderDetail.html');
var OrderDetailController = /** @class */ (function () {
    function OrderDetailController() {
    }
    OrderDetailController.prototype.$onInit = function () { };
    OrderDetailController.prototype.$onChanges = function (changes) {
        alert("Detail Changes");
        //this.modalInstance = this.$uibModal.open({ component: "orderSearch", backdrop: "static", animation: true });
    };
    OrderDetailController.$inject = ["$scope"];
    return OrderDetailController;
}());
var OrderDetailComponent = /** @class */ (function () {
    function OrderDetailComponent() {
        this.controller = OrderDetailController;
        this.template = template;
    }
    return OrderDetailComponent;
}());
exports.OrderDetailComponent = OrderDetailComponent;
//# sourceMappingURL=orderDetail.component.js.map