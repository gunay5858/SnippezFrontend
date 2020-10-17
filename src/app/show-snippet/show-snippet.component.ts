import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {CodeSnippetService} from "../_services/code-snippet.service";
import {Subscription} from "rxjs";
import {Snippet} from "../_models/snippet";
import {FormGroup} from "@angular/forms";
import {CodeLanguage} from "../_models/code-language";
import {User} from "../_models/user";
import {ShareSnippetComponent} from "../share-snippet/share-snippet.component";

@Component({
  selector: 'app-show-snippet',
  templateUrl: './show-snippet.component.html',
  styleUrls: ['./show-snippet.component.scss']
})
export class ShowSnippetComponent implements OnInit, OnDestroy {
  @ViewChild("sharedUserSettings", {read: ViewContainerRef}) private vcr: ViewContainerRef;

  public public: boolean = false;
  public currentCodeSnippet: Snippet;
  public codeLanguage: CodeLanguage;

  // subscriptions
  private subCurrentCodeSnippet: Subscription = new Subscription();
  private subSharedUsers: Subscription = new Subscription();
  private subTags: Subscription = new Subscription();
  private subPublic: Subscription = new Subscription();

  fgSettings: FormGroup;
  private tags: string[];

  constructor(private codeSnippetService: CodeSnippetService, private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit(): void {
    this.subCurrentCodeSnippet = this.codeSnippetService.observeCurrentCodeSnippet().subscribe((codeSnippet: Snippet) => {
      this.currentCodeSnippet = codeSnippet;
      this.tags = this.currentCodeSnippet.tags.split(',');
      this.public = this.currentCodeSnippet.public;

      this.codeLanguage = this.codeSnippetService.getCodeLanguageByShortcut(this.currentCodeSnippet.codeLanguage);

      this.injectSettingsComponent();
    });
  }

  ngOnDestroy(): void {
    this.subCurrentCodeSnippet.unsubscribe();
    this.subSharedUsers.unsubscribe();
    this.subTags.unsubscribe();
    this.subPublic.unsubscribe();
  }

  /**
   * create the settings component
   */
  injectSettingsComponent() {
    let resolver = this.componentFactoryResolver.resolveComponentFactory(ShareSnippetComponent);
    let componentFactory = this.vcr.createComponent(resolver);
    componentFactory.instance.public = this.currentCodeSnippet.public;
    componentFactory.instance.selectedUsers = this.currentCodeSnippet.sharedUsers;
    componentFactory.instance.tags = this.currentCodeSnippet.tags.split(",");

    // subscribe to output
    this.subSharedUsers = componentFactory.instance.onSharedUsersChanged.subscribe((sharedUsers: User[]) => {
      this.currentCodeSnippet.sharedUsers = sharedUsers;
    });

    this.subTags = componentFactory.instance.onTagsChanged.subscribe((tags: string) => {
      this.currentCodeSnippet.tags = tags;
    });

    this.subPublic = componentFactory.instance.onPublicStatusChange.subscribe((isPublic: boolean) => {
      this.currentCodeSnippet.public = isPublic;
    })
  }

  /**
   * Save snippet to database
   */
  saveSnippet() {
    // TODO: save to DB
    console.log(this.currentCodeSnippet)
  }
}
