import { StateService } from '@uirouter/angularjs';
import { AuthService } from '../Services/auth.service';
const template = require('./login.html');

export interface ICredentials {
    username: string,
    password: string
}

export interface ILoginControllerScope extends ng.IScope {
    loginForm: IloginFormFormController;
}

export interface IloginFormFormController extends ng.IFormController {
    username: any;
    password: any;
}

class LoginController implements ng.IController {
    static $inject: string[] = ["$scope", "AuthService"];
    public username: string;
    public password: string;
    
    constructor(public $scope: ILoginControllerScope, private auth: AuthService) { }

    public onSubmit() {
        this.auth.login({ username: this.username, password: this.password });
    }
}

export class LoginComponent implements ng.IComponentOptions {
    controller: any = LoginController;
    template: any = template;
    
    constructor() { }
}