import '../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css';
import '../node_modules/ui-select/dist/select.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../Content/Site.css';
import * as angular from 'angular';
import { UrlRouterProvider, StateProvider, TransitionService, StateService } from '@uirouter/angularjs';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { OrderComponent } from './Orders/order.component';
import { OrderSearchComponent } from './Orders/orderSearch.component';
import { OrderListComponent } from './Orders/orderList.component';
import { AuthService } from './Services/auth.service';

export let app = angular.module('app',
    [
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',
        'angular-jwt',
        'ui.select'
    ])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider) => {
        $stateProvider.state({
            name: 'app',
            url: '/',
            component: 'app'
        }).state(
            {
                name: 'login',
                url: '/login',
                component: "login"
            }).state(
                {
                    name: 'order',
                    url: '/order',
                    component: "order"
                });
        $urlRouterProvider.otherwise('/');
    }])
    .factory('$exceptionHandler', ["$log", ($log: any) => {
        return (err, cause) => {
            $log.error(err.message + err.stack);
            alert("Unhandled exception");
        }
    }])
    .service(AuthService.serviceId, ["$http", "$state", "jwtHelper", ($http, $state, jwtHelper) => new AuthService($http, $state, jwtHelper)])
    .component("app", new AppComponent())
    .component("login", new LoginComponent())
    .component("order", new OrderComponent())
    .component("orderSearch", new OrderSearchComponent())
    .component("orderList", new OrderListComponent())
    .run(["$rootScope", "$http", "$state", "$transitions", ($rootScope: ng.IRootScopeService, $http: ng.IHttpService, $state: StateService, $transitions: TransitionService) => {
        //keep user logged in after page refresh
        if (localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
        $transitions.onStart({}, (transition) => {
            var publicStates = ['login'];
            var restrictedState = publicStates.indexOf(transition.to().name) === -1;
            if (restrictedState && !localStorage.currentUser) {
                $state.go("login");
            }
        });
    }]);

angular.element(document).ready(() => { angular.bootstrap(document, ['app']); });