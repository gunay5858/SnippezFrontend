import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BasicListResponse} from "../models/basic-list-response";
import {Category} from "../models/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private icons: string[] = ["icon-alpinelinux", "icon-apache", "icon-archlinux", "icon-centos", "icon-debian", "icon-docker", "icon-exherbo", "icon-fedora", "icon-freebsd", "icon-gentoo", "icon-git", "icon-gnome", "icon-gradle", "icon-grunt", "icon-gulp", "icon-gulp-alt", "icon-jetty", "icon-kde", "icon-linux-mint", "icon-maven", "icon-netbsd", "icon-nginx", "icon-nginx-alt", "icon-nginx-alt2", "icon-npm", "icon-osx", "icon-raspberrypi", "icon-redhat", "icon-solaris", "icon-suse", "icon-tomcat", "icon-ubuntu", "icon-x11", "icon-aws", "icon-azure", "icon-codeigniter", "icon-codepen", "icon-dreamhost", "icon-freecodecamp", "icon-google", "icon-google-alt", "icon-google-code", "icon-google-developers", "icon-heroku", "icon-magento", "icon-openshift", "icon-sitefinity", "icon-wordpress", "icon-cassandra", "icon-database", "icon-database-alt", "icon-database-alt2", "icon-hadoop", "icon-mariadb", "icon-mongodb", "icon-mssql", "icon-mysql", "icon-mysql-alt", "icon-oracle", "icon-oracle-alt", "icon-postgres", "icon-postgres-alt", "icon-redis", "icon-svg", "icon-angular", "icon-angular-alt", "icon-backbone", "icon-bootstrap", "icon-d3", "icon-grails", "icon-grails-alt", "icon-jquery", "icon-laravel", "icon-phone-gap", "icon-playframework", "icon-playframework-alt", "icon-plone", "icon-reactjs", "icon-ruby-on-rails", "icon-ruby-on-rails-alt", "icon-spring", "icon-symfony", "icon-unity", "icon-c", "icon-clojure", "icon-cplusplus", "icon-csharp", "icon-css", "icon-css3", "icon-css3-alt", "icon-elixir", "icon-elm", "icon-erlang", "icon-go", "icon-go-alt", "icon-haskell", "icon-html", "icon-html5", "icon-html5-alt", "icon-java", "icon-java-bold", "icon-java-duke", "icon-javascript", "icon-javascript-alt", "icon-nodejs", "icon-objc", "icon-perl", "icon-php", "icon-php-alt", "icon-python", "icon-ruby", "icon-rust", "icon-sass", "icon-scala", "icon-scala-alt", "icon-script", "icon-script-alt", "icon-shell"]
  private API_BASE_URL: string = environment.API_BASE_URL;

  constructor(private http: HttpClient) {
  }

  public getAllIcons() {
    return this.icons;
  }

  /**
   * Find all categories of a user
   * TODO: use real jwt of user
   */
  public getUsersCategories() {
    return this.http.get(this.API_BASE_URL + "category", {headers: {'Authorization': environment.devToken}}).pipe(
      map((response: BasicListResponse) => {
        return response.data
      }),
      map((categories: Category[]) => {
        return categories
      })
    );
  }
}
