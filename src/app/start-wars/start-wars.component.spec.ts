import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartWarsComponent } from './start-wars.component';

describe('StartWarsComponent', () => {
  let component: StartWarsComponent;
  let fixture: ComponentFixture<StartWarsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartWarsComponent]
    });
    fixture = TestBed.createComponent(StartWarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
