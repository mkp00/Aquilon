import { IOrder } from "./order.component";
const template = require('./orderList.html');

interface IOrderListComponentBindings {
    orders: Array<IOrder>
}

class OrderListController implements ng.IController, IOrderListComponentBindings {
    //static $inject: string[] = []
    orders: IOrder[];
    constructor() { }    
}
export class OrderListComponent implements ng.IComponentOptions {
    controller: any = OrderListController;
    template: any = template;
    bindings: any = {
        orders: '<'
    }
    constructor() { }
}