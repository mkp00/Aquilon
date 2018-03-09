import * as moment from 'moment';
import angular = require('angular');
const template = require('./orderSearch.html');

export interface IOrderSearchControllerScope extends ng.IScope {
    orderSearchForm: IOrderSearchFormController;
    onSubmit: any;    
}
interface IOrderSearchFormController extends ng.IFormController {
    fromdate: any;
    datetype: any;
    customername: any;
    selecteddate: any;
}

export interface IOrderSearchData {
    customername: string;
    datetype: string;
    date: Date;
}

class OrderSearchController implements ng.IController, IOrderSearchData {
    static $inject: string[] = ["$scope"]    

    onSubmit: any;

    customername: string;
    datetype: string = "order";
    date: Date;
    
    selecteddate: string = 'No Date Selected...';

    constructor(public $scope: IOrderSearchControllerScope) { }

    $onInit() { }

    $onChanges(changes) { } 

    onDateChange() {
        this.selecteddate = moment(this.date).toString();
    }

    submitClicked() {
        this.onSubmit({ orderSearchData: { customername: this.customername, datetype: this.datetype, date: this.date } })
    }
}
export class OrderSearchComponent implements ng.IComponentOptions {
    controller: any = OrderSearchController;
    template: any = template;
    bindings: any = {
        onSubmit: '&'
    }
    constructor() {
    }
}
