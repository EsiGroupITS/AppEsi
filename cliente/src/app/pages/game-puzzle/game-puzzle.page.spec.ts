import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamePuzzlePage } from './game-puzzle.page';

describe('GamePuzzlePage', () => {
  let component: GamePuzzlePage;
  let fixture: ComponentFixture<GamePuzzlePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GamePuzzlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
