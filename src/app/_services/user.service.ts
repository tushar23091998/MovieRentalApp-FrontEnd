import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';




@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl =  environment.apiUrl;
constructor(private http: HttpClient) { }
 httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer '+ sessionStorage.getItem('token')
  })
};

getUsers(userParams?) : Observable<User[]>{
  let params = new HttpParams();
  if(userParams!=null){
    params = params.append('orderBy',userParams.orderBy);
  }
  return this.http.get<User[]>(this.baseUrl + 'users',{params});
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseUrl + 'users/' +id);
}

updateUser(id: number, user: User){
  return this.http.put(this.baseUrl + 'users/' + id, user, this.httpOptions);
}

}
