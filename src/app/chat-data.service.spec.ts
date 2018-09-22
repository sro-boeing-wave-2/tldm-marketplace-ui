import { TestBed, inject } from '@angular/core/testing';

import { ChatDataService } from './chat-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('ChatDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatDataService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ChatDataService], (service: ChatDataService) => {
    expect(service).toBeTruthy();
  }));
});
