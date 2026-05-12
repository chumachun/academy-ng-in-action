import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { messageLoggingInterceptor } from './message-logging-interceptor';

describe(messageLoggingInterceptor.name, () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => messageLoggingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  const pathToIntercept = '/messages';

  it(`should log messages when URL includes "${pathToIntercept}"`, () => {
    const req = new HttpRequest('GET', pathToIntercept);
    const next = vi.fn().mockReturnValue(of({}));
    const spy = vi.spyOn(console, 'debug');

    interceptor(req, next);

    expect(next).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it(`should not log when URL does not include "${pathToIntercept}"`, () => {
    const req = new HttpRequest('GET', '/random-url');
    const next = vi.fn().mockReturnValue(of({}));
    const spy = vi.spyOn(console, 'debug');

    interceptor(req, next);

    expect(next).toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });
});
