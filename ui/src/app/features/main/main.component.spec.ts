import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainComponent } from './main.component';
import { ChatService, UserService } from 'src/app/services';

describe(MainComponent.name, () => {
  let fixture: ComponentFixture<MainComponent>;
  let component: MainComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [MainComponent],
    providers: [
        { provide: ChatService, useValue: {} },
        { provide: UserService, useValue: {} },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
