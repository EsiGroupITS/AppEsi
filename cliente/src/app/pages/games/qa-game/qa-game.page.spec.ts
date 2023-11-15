import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QaGamePage } from './qa-game.page';

describe('QaGamePage', () => {
  let component: QaGamePage;
  let fixture: ComponentFixture<QaGamePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QaGamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
