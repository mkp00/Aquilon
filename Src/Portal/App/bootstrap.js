//import * as angular from 'angular';
//import { AppComponent } from './app.component';
//import { LoginManager } from './Login/login-manager.component';
//import { UrlRouterProvider, UrlService, StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';
////import { platformBrowserDynamic, NgModule } from 'angular-ts-decorators';
////import { AppModule } from './app';
////platformBrowserDynamic().bootstrapModule((AppModule as NgModule).module.name, { strictDi: true });
//export let app = angular.module('app', ['ui.router'])
//    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) => {
//        $stateProvider.state({
//            name: 'app',
//            url: '/',
//            component: 'app'
//        }).state(
//            {
//                name: 'login',
//                url: '/login',
//                component: "loginManager"
//            });
//        $urlRouterProvider.otherwise('/');
//    }])
//    .component("app", AppComponent)
//    .component("login", LoginManager);
//angular.element(document).ready(() => { angular.bootstrap(document, ['app']);});
//# sourceMappingURL=bootstrap.js.map