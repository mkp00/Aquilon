"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var template = require('./orderList.html');
var OrderListController = /** @class */ (function () {
    function OrderListController() {
    }
    return OrderListController;
}());
var OrderListComponent = /** @class */ (function () {
    function OrderListComponent() {
        this.controller = OrderListController;
        this.template = template;
        this.bindings = {
            orders: '<'
        };
    }
    return OrderListComponent;
}());
exports.OrderListComponent = OrderListComponent;
//# sourceMappingURL=orderList.component.js.map