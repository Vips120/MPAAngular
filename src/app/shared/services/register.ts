import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Iregister } from '../model/register';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class RegisterServices {
    private Register_Endpoint = "http://localhost:46000/api/user/createuser";
    public headers: HttpHeaders;
    constructor(private http: HttpClient) { 
        this.headers = new HttpHeaders({ "Content-Type": "application/json" });
    }
    
    public UserRegistration(item: Iregister):Observable<Iregister> {
        return this.http.post<Iregister>(this.Register_Endpoint, JSON.stringify(item), {headers: this.headers});
    }
}