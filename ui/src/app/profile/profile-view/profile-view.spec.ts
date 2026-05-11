import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileView } from './profile-view';
import { mockUser } from '../../user/mock-user-service';

describe(ProfileView.name, () => {
  let component: ProfileView;
  let fixture: ComponentFixture<ProfileView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileView],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileView);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
