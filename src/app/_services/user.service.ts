import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BasicListResponse} from "../_models/basic-list-response";
import {Category} from "../_models/category";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_BASE_URL: string = environment.API_BASE_URL + "user";

  constructor(private http: HttpClient) { }

  public loadAllUsers() {
    return this.http.get(this.API_BASE_URL , {headers: {'Authorization': environment.devToken}}).pipe(
      map((response: BasicListResponse) => {
        return response.data
      }),
      map((users: User[]) => {
        return users
      })
    );
  }

  public getApiUrl() {
    return this.API_BASE_URL;
  }
}
