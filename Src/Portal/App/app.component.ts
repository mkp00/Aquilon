import { StateService } from '@uirouter/angularjs';

class AppController implements ng.IController {
    static $inject: string[] = ["$state"];
    constructor(public $state: StateService) {
        $state.go('login');
    }
}

export class AppComponent implements ng.IComponentOptions {
    controller?: any = AppController;
    template: any = '<div class="container-fluid"><ui-view></ui-view></div>';
    constructor() {}
}