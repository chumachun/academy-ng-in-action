import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { List } from './list';
import { FilterUserPipe } from './filter-user-pipe';
import { UserService } from '../user';
import { UserServiceMock } from '../user/user-service-mock';

describe(List.name, () => {
  let fixture: ComponentFixture<List>;
  let component: List;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [List, FilterUserPipe],
      providers: [provideRouter([]), { provide: UserService, useClass: UserServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
