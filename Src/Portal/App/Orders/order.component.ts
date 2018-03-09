import { AuthService } from '../Services/auth.service';
import { StateService } from '@uirouter/angularjs';
import * as moment from 'moment';
import { IOrderSearchData } from './orderSearch.component';
const template = require('./order.html');

export interface IProductInfo {
    ProductName: string;
    ProductNumber: string;
    OrderQty: number;
    UnitPrice: number;
    UnitPriceDiscount: number;
    LineTotal: number;
}
export interface IOrder {
    SalesOrderID: number;
    FirstName: string;
    MiddleName: string;
    LastName: string,
    AccountNumber: string,
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    StateProvinceCode: string;
    PostalCode: string;
    ShipMethod: string;
    SubTotal: number;
    TaxAmt: number;
    Freight: number;
    TotalDue: number;
    Products: Array<IProductInfo>;
}

class OrderController implements ng.IController {
    static $inject: string[] = ["$http", "$state", "AuthService"];
    public pagetitle: string = "Sales Order";
    public orders: Array<IOrder>;
    public productinfo: IProductInfo;

    constructor(public $http: ng.IHttpService, public $state: StateService, private auth: AuthService) { }

    getOrders(orderSearchData: IOrderSearchData) {
        this.$http.get<Array<IOrder>>('services/v1/orders', { params: { customername: orderSearchData.customername, datetype: orderSearchData.datetype, date: orderSearchData.date } })
            .then(resp => {
                this.orders = resp.data;
            },
                (err) => { alert(err.data.Message); console.log(err.data.Message); });
    }

    onLogoutClick() {
        this.$state.go('login');
    }
    public StopEvent($event: ng.IAngularEvent) {
        $event.preventDefault();
        $event.stopPropagation();
    }    
}

export class OrderComponent implements ng.IComponentOptions {
    controller: any = OrderController;
    template: any = template;

    constructor() { }
}