import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ListComponent } from './list.component';
import { FilterUserPipe } from 'src/app/pipes';
import { UserService } from 'src/app/services';
import { MockUserService } from 'src/app/components/user/user.component.spec';

describe(ListComponent.name, () => {
  let fixture: ComponentFixture<ListComponent>;
  let component: ListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListComponent, FilterUserPipe],
      providers: [{ provide: UserService, useClass: MockUserService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
