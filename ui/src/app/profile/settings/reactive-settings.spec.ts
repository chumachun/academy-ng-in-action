import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { ReactiveSettings } from './reactive-settings';

describe(ReactiveSettings.name, () => {
  let component: ReactiveSettings;
  let fixture: ComponentFixture<ReactiveSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveSettings],
      providers: [provideRouter([]), provideNativeDateAdapter(), provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
