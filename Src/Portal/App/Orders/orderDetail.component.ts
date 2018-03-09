import { IProductInfo } from "./order.component";

const template = require('./orderDetail.html');

//export interface IOrderSearchControllerScope extends ng.IScope {
//    orderSearchForm: IOrderSearchFormController;
//}
//interface IOrderSearchFormController extends ng.IFormController {
//    fromdate: any;
//    datetype: any;
//    customername: any;
//    selecteddate: any;
//}

//export interface IOrderSearchData {
//    customername: string;
//    datetype: string;
//    date: Date;
//}

interface IOrderDetailComponentBindings {
    details: IProductInfo;
}

class OrderDetailController implements ng.IController {

    static $inject: string[] = ["$scope"]

    constructor() { }

    $onInit() { }

    $onChanges(changes: ng.IOnChangesObject) {
        alert("Detail Changes");
        //this.modalInstance = this.$uibModal.open({ component: "orderSearch", backdrop: "static", animation: true });
    }
    
}
export class OrderDetailComponent implements ng.IComponentOptions {
    controller: any = OrderDetailController;
    template: any = template;
    bindings: {
        details: '<'

    }
    constructor() { }
}