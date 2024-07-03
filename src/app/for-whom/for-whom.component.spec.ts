import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForWhomComponent } from './for-whom.component';

describe('ForWhomComponent', () => {
  let component: ForWhomComponent;
  let fixture: ComponentFixture<ForWhomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForWhomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForWhomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
