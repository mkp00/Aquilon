"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppController = /** @class */ (function () {
    function AppController($state) {
        this.$state = $state;
        $state.go('login');
    }
    AppController.$inject = ["$state"];
    return AppController;
}());
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.controller = AppController;
        this.template = '<div class="container-fluid"><ui-view></ui-view></div>';
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map