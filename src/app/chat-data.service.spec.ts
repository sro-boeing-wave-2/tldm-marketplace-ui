import { TestBed, inject } from '@angular/core/testing';

import { ChatDataService } from './chat-data.service';
import { HttpModule } from '@angular/http';

describe('ChatDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatDataService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([ChatDataService], (service: ChatDataService) => {
    expect(service).toBeTruthy();
  }));
});
