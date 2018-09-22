import { TestBed, inject } from '@angular/core/testing';

import { ApplicationDataService } from './application-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApplicationDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationDataService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ApplicationDataService], (service: ApplicationDataService) => {
    expect(service).toBeTruthy();
  }));
});
