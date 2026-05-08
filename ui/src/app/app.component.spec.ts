import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from './services/user/user.service';
import { MockUserService } from './components/user/user.component.spec';

describe(AppComponent.name, () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
      providers: [{ provide: UserService, useClass: MockUserService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call ${UserService.name}.user() on init`, inject([UserService], (userService: UserService) => {
    const spy = spyOn(userService, 'user').and.callThrough();

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  }));
});
