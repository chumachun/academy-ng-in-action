import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { List } from './list';
import { FilterUserPipe } from './filter-user-pipe';
import { UserService } from '../user/user-service';
import { MockUserService } from '../user/mock-user-service';

describe(List.name, () => {
  let fixture: ComponentFixture<List>;
  let component: List;

  beforeEach(async () => {
    // We need to await for lazy/deferred chunks to be loaded.
    await TestBed.configureTestingModule({
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
