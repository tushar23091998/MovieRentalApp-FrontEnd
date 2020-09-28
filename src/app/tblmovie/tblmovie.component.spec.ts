/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TblmovieComponent } from './tblmovie.component';

describe('TblmovieComponent', () => {
  let component: TblmovieComponent;
  let fixture: ComponentFixture<TblmovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblmovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
