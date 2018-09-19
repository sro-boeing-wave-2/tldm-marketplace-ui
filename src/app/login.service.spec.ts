import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports: [HttpClientModule]
    });
  });

  // it('should be created', inject([LoginService], (service: LoginService) => {
  //   expect(service).toBeTruthy();
  // }));
});
