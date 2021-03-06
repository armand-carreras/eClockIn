import { getModuleFactory } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndTaskComponent } from './end-task.component';
describe('EndTaskComponent', () => {
  let component: EndTaskComponent;
  let fixture: ComponentFixture<EndTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndTaskComponent ]
    })
    .compileComponents();
  });
  
  beforeEach(() => {
    fixture = TestBed.createComponent(EndTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
