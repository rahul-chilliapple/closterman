import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesUseComponent } from './cookies-use.component';

describe('CookiesUseComponent', () => {
  let component: CookiesUseComponent;
  let fixture: ComponentFixture<CookiesUseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiesUseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
