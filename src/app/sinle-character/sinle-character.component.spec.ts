import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinleCharacterComponent } from './sinle-character.component';

describe('SinleCharacterComponent', () => {
  let component: SinleCharacterComponent;
  let fixture: ComponentFixture<SinleCharacterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinleCharacterComponent]
    });
    fixture = TestBed.createComponent(SinleCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
