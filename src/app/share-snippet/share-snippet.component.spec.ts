import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSnippetComponent } from './share-snippet.component';

describe('ShareSnippetComponent', () => {
  let component: ShareSnippetComponent;
  let fixture: ComponentFixture<ShareSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
