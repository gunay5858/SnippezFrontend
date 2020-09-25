import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSnippetComponent } from './show-snippet.component';

describe('ShowSnippetComponent', () => {
  let component: ShowSnippetComponent;
  let fixture: ComponentFixture<ShowSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
