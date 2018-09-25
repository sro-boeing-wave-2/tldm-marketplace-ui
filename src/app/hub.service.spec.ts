import { TestBed, inject } from '@angular/core/testing';

import { HubService } from './hub.service';

describe('HubService', () => {
  let hubservice: HubService
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HubService]
    });

    hubservice = TestBed.get(HubService);
  });

  it('should be created', inject([HubService], (service: HubService) => {
    expect(service).toBeTruthy();
  }));

  // it('should invoke hub method', () => {
  //   hubservice.addBotToParticularChannel('emailId').then(data => {
  //     expect().nothing;
  //   })
  // });
});
