import { ICredentials } from '../Login/login.component';
import { StateService } from '@uirouter/angularjs';

export class AuthService {
    static serviceId = "AuthService";
    static $inject: string[] = ["$http", "$state", "jwtHelper"];
    tokenName: string = 'id_token';

    constructor(private $http: ng.IHttpService, private $state: StateService, private jwtHelper: ng.jwt.IJwtHelper) { }

    login(credentials: ICredentials) {
        this.$http.post<string>('services/v1/login', credentials)
            .then(resp => {
                localStorage.currentUser = { username: credentials.username, token: resp.data };
                this.$http.defaults.headers.common.Authorization = 'Bearer ' + resp.data;
                this.$state.go('order');
            },
            (err) => { alert(err.data.Message); console.log(err.data.Message); });
    }

    loggedIn() {
        return this.jwtHelper.isTokenExpired(localStorage.getItem(this.tokenName));
    }

    logout() {
        delete localStorage.currentUser;
        this.$state.go('login');
        this.$http.defaults.headers.common.Authorization = '';
    }
}