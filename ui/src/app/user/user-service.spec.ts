import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { mockUser } from './mock-user-service';
import { userActions } from './state/user-actions';
import { UserService } from './user-service';

describe(UserService.name, () => {
  let service: UserService;
  let store: Store;

  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn(),
    removeItem: vi.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    });
    mockLocalStorage.getItem.mockReturnValue(null);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideMockStore(),
      ],
    });
    vi.clearAllMocks();

    service = TestBed.inject(UserService);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should call localstorage.getItem init`, () => {
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('currentUser');
  });

  describe('set()', () => {
    it('should save user to localStorage and dispatch action', () => {
      const spy = vi.spyOn(store, 'dispatch');
      service.set(mockUser);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'currentUser',
        JSON.stringify(mockUser),
      );
      expect(spy).toHaveBeenCalledWith(userActions.set({ user: mockUser }));
    });

    it('should handle undefined user', () => {
      const spy = vi.spyOn(store, 'dispatch');
      service.set(undefined);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'currentUser',
        JSON.stringify(undefined),
      );
      expect(spy).toHaveBeenCalledWith(userActions.set({ user: undefined }));
    });
  });
});
