import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {BasicListResponse} from "../models/basic-list-response";
import {Snippet} from "../models/snippet";
import {Subject} from "rxjs";
import {CodeLanguage} from "../models/code-language";

@Injectable({
  providedIn: 'root'
})
export class CodeSnippetService {
  private API_BASE_URL: string = environment.API_BASE_URL;
  public refreshCodeSnippetsSubject: Subject<number> = new Subject<number>();
  public currentCodeSnippet: Subject<Snippet> = new Subject<Snippet>();
  private codeLanguages: CodeLanguage[] = [
    new CodeLanguage('Markup', 'markup'),
    new CodeLanguage('HTML', 'html'),
    new CodeLanguage('XML', 'xml'),
    new CodeLanguage('SVG', 'svg'),
    new CodeLanguage('Atom', 'atom'),
    new CodeLanguage('RSS', 'rss'),
    new CodeLanguage('CSS', 'css'),
    new CodeLanguage('JavaScript', 'js'),
    new CodeLanguage('Apache Configuration', 'apacheconf'),
    new CodeLanguage('AppleScript', 'applescript'),
    new CodeLanguage('Arduino', 'arduino'),
    new CodeLanguage('AutoIt', 'autoit'),
    new CodeLanguage('Bash', 'bash'),
    new CodeLanguage('Batch', 'batch'),
    new CodeLanguage('BBcode', 'bbcode'),
    new CodeLanguage('C', 'c'),
    new CodeLanguage('C#', 'cs'),
    new CodeLanguage('C++', 'cpp'),
    new CodeLanguage('CoffeeScript', 'coffeescript'),
    new CodeLanguage('D', 'd'),
    new CodeLanguage('Dart', 'dart'),
    new CodeLanguage('Dhall', 'dhall'),
    new CodeLanguage('Django', 'django'),
    new CodeLanguage('DNS zone file', 'dns-zone-file'),
    new CodeLanguage('Docker', 'docker'),
    new CodeLanguage('EJS', 'ejs'),
    new CodeLanguage('Erlang', 'erlang'),
    new CodeLanguage('Excel Formula', 'excel-formula'),
    new CodeLanguage('F#', 'fsharp'),
    new CodeLanguage('Flow', 'flow'),
    new CodeLanguage('Fortran', 'fortran'),
    new CodeLanguage('Git', 'git'),
    new CodeLanguage('Go', 'go'),
    new CodeLanguage('GLSL', 'glsl'),
    new CodeLanguage('GraphQL', 'graphql'),
    new CodeLanguage('Groovy', 'groovy'),
    new CodeLanguage('Handlebars', 'handlebars'),
    new CodeLanguage('Haskell', 'haskell'),
    new CodeLanguage('.ignore', 'gitignore'),
    new CodeLanguage('Java', 'java'),
    new CodeLanguage('JSON', 'json'),
    new CodeLanguage('JSONP', 'jsonp'),
    new CodeLanguage('Kotlin', 'kt'),
    new CodeLanguage('LaTeX', 'tex'),
    new CodeLanguage('Less', 'less'),
    new CodeLanguage('Lisp', 'lisp'),
    new CodeLanguage('Lua', 'lua'),
    new CodeLanguage('MATLAB', 'matlab'),
    new CodeLanguage('MongoDB', 'mongodb'),
    new CodeLanguage('nginx', 'nginx'),
    new CodeLanguage('Pascal', 'pascal'),
    new CodeLanguage('Perl', 'perl'),
    new CodeLanguage('PHP', 'php'),
    new CodeLanguage('Prolog', 'prolog'),
    new CodeLanguage('Python', 'py'),
    new CodeLanguage('R', 'r'),
    new CodeLanguage('React JSX', 'jsx'),
    new CodeLanguage('React TSX', 'tsx'),
    new CodeLanguage('Regex', 'regex'),
    new CodeLanguage('Ruby', 'rb'),
    new CodeLanguage('Rust', 'rust'),
    new CodeLanguage('Sass (Sass)', 'sass'),
    new CodeLanguage('Sass (Scss)', 'scss'),
    new CodeLanguage('Scala', 'scala'),
    new CodeLanguage('Smarty', 'smarty'),
    new CodeLanguage('SQL', 'sql'),
    new CodeLanguage('Stylus', 'stylus'),
    new CodeLanguage('Swift', 'swift'),
    new CodeLanguage('TypeScript', 'ts'),
    new CodeLanguage('VB.Net', 'vbnet'),
    new CodeLanguage('Velocity', 'velocity'),
    new CodeLanguage('vim', 'vim'),
    new CodeLanguage('Visual Basic', 'vb'),
    new CodeLanguage('YAML', 'yml'),
  ];

  constructor(private http: HttpClient) {
  }

  /**
   * Set next value for category Id from whom the code snippets should be loaded
   * @param categoryId from whom the code snippets should be loaded
   */
  public setCodeSnippetCategoryId(categoryId: number) {
    this.refreshCodeSnippetsSubject.next(categoryId);
  }

  /**
   * Observer for tracking the current category Id
   */
  public observeCodeSnippetCategoryId() {
    return this.refreshCodeSnippetsSubject.asObservable();
  }

  /**
   * Set next value for currently displayed Code snippet
   * @param codeSnippet to set as currently displayed
   */
  public setCurrentCodeSnippet(codeSnippet: Snippet) {
    this.currentCodeSnippet.next(codeSnippet);
  }

  /**
   * Observer for tracking the currently displayed code snippet
   */
  public observeCurrentCodeSnippet() {
    return this.currentCodeSnippet.asObservable();
  }

  /**
   * Get a code language by shortcut
   * @param shortcut of language
   */
  public getCodeLanguageByShortcut(shortcut: string) {
    return this.codeLanguages.filter((language: CodeLanguage) => {
      return language.shortcut === shortcut
    })[0];
  }

  /**
   * returns all code languages, that are available
   */
  public getAllCodeLanguages() {
    return this.codeLanguages;
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
