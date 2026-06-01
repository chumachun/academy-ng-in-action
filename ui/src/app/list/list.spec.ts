import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MockUserService } from '../user/mock-user-service';
import { UserService } from '../user/user-service';
import { FilterUserPipe } from './filter-user-pipe';
import { List } from './list';

describe(List.name, () => {
  let fixture: ComponentFixture<List>;
  let component: List;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [List, FilterUserPipe],
      providers: [provideRouter([]), { provide: UserService, useClass: MockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(List);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
