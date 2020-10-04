import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BasicListResponse} from "../models/basic-list-response";
import {Snippet} from "../models/snippet";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CodeSnippetService {
  private API_BASE_URL: string = environment.API_BASE_URL;
  public refreshCodeSnippetsSubject: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {
  }

  public setCodeSnippetCategoryId(categoryId: number) {
    this.refreshCodeSnippetsSubject.next(categoryId);
  }

  public getCodeSnippetCategoryId() {
    return this.refreshCodeSnippetsSubject.asObservable();
  }

  /**
   * Find all Code snippets of a category by category Id
   * @param categoryId: Id of the categories where the snippets belong to
   */
  public getCodeSnippetsOfCategory(categoryId: number) {
    return this.http.get(this.API_BASE_URL + 'snippet/category/' + categoryId, {headers: {'Authorization': environment.devToken}}).pipe(
      map((response: BasicListResponse) => {
        return response.data
      }),
      map((codeSnippets: Snippet[]) => {
        return codeSnippets
      })
    );
  }
}
