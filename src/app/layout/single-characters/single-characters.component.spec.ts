import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCharactersComponent } from './single-characters.component';

describe('SingleCharactersComponent', () => {
  let component: SingleCharactersComponent;
  let fixture: ComponentFixture<SingleCharactersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleCharactersComponent]
    });
    fixture = TestBed.createComponent(SingleCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
