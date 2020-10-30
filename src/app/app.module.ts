import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import { NavbarComponent } from './navbar/navbar.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatGridListModule} from "@angular/material/grid-list";
import { CategoryListComponent } from './category-list/category-list.component';
import { SnippetListComponent } from './snippet-list/snippet-list.component';
import { ShowSnippetComponent } from './show-snippet/show-snippet.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddSnippetComponent } from './add-snippet/add-snippet.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule} from "@angular/material/dialog";
import { AddCategoryComponent } from './add-category/add-category.component';
import { SnippetListItemComponent } from './snippet-list/snippet-list-item/snippet-list-item.component';
import {MatBadgeModule} from "@angular/material/badge";
import {HIGHLIGHT_OPTIONS, HighlightModule} from "ngx-highlightjs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ShareSnippetComponent } from './share-snippet/share-snippet.component';
import { ReCaptchaComponent } from './re-captcha/re-captcha.component';
import { AdminAppComponent } from './admin/admin-app/admin-app.component';
import { AdminNavigationComponent } from './admin/admin-navigation/admin-navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    SnippetListComponent,
    ShowSnippetComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AddSnippetComponent,
    AddCategoryComponent,
    SnippetListItemComponent,
    ShareSnippetComponent,
    ReCaptchaComponent,
    AdminAppComponent,
    AdminNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatTooltipModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    FormsModule,
    AngularEditorModule,
    MatExpansionModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatBadgeModule,
    HighlightModule,
    MatAutocompleteModule
  ],
  providers: [{
    provide: HIGHLIGHT_OPTIONS,
    useValue: {
      fullLibraryLoader: () => import('highlight.js'),
    }
  }],
  bootstrap: [AppComponent],
  entryComponents: [
    AddCategoryComponent
  ]
})
export class AppModule { }
