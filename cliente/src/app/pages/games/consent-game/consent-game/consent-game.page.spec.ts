import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsentGamePage } from './consent-game.page';

describe('ConsentGamePage', () => {
  let component: ConsentGamePage;
  let fixture: ComponentFixture<ConsentGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ConsentGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
