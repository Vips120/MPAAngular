import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Iregister, Ilogin } from '../model/register';
import { Observable, BehaviorSubject} from 'rxjs';
import { map } from "rxjs/operators";
@Injectable({ providedIn: "root" })
export class RegisterServices {
    private Register_Endpoint = "http://localhost:46000/api/user/createuser";
    private Login_Endpoint = "http://localhost:46000/api/user/login/auth";
    private LoggedIN_Endpoint = "http://localhost:46000/api/user/login/me";
    private SENDMAIL_ENDPOINT = "http://localhost:46000/api/nodemailer";
    private FORGOT_PASSWORD_ENDPOINT = "http://localhost:46000/password/forgotpassword/";
    public headers: HttpHeaders;
    public user = new BehaviorSubject(JSON.parse(localStorage.getItem("loggedUser")));
    public userLog = this.user.asObservable();
    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders({ "Content-Type": "application/json" });
    }
    
    public UserRegistration(item: Iregister):Observable<Iregister> {
        return this.http.post<Iregister>(this.Register_Endpoint, JSON.stringify(item), {headers: this.headers});
    };
    public UserLogin(item: Ilogin):Observable<any> {
        return this.http.
            post<any>(this.Login_Endpoint, JSON.stringify(item), { headers: this.headers })
            .pipe(map((data: any) => {
                if (data && data.token) {
                    localStorage.setItem("currentuser", JSON.stringify(data));
                } else {
                    return data;
                }
            }))
    };

    public LoggedInUser() {
        let token = JSON.parse(localStorage.getItem("currentuser"));
        console.log(token);
        this.headers = new HttpHeaders({ "Content-Type": "application/json", "x-auth-token": token.token });
        return this.http
            .get(this.LoggedIN_Endpoint, { headers: this.headers })
            .pipe(map((data: any) => {
                localStorage.setItem("loggedUser", JSON.stringify(data));
                this.user.next(data);
            }))
            ;
    };
    public LogOut() {
        localStorage.removeItem("currentuser");
        localStorage.removeItem("loggedUser");
        this.user.next(null);
    };

    public Sendmail(item) {
      return  this.http.post(this.SENDMAIL_ENDPOINT, JSON.stringify(item),{ headers: this.headers });
    };

    public forgotPassword(id, data) {
        return this.http.post(this.FORGOT_PASSWORD_ENDPOINT + id, JSON.stringify(data), { headers: this.headers });
    }
}