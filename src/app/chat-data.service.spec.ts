import { TestBed, inject } from '@angular/core/testing';

import { ChatDataService } from './chat-data.service';
import { HttpClientModule } from '@angular/common/http';
import { Channel } from './channel';
import { User } from './user';

describe('ChatDataService', () => {
  let chatservice: ChatDataService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatDataService],
      imports: [HttpClientModule]
    });
    chatservice = TestBed.get(ChatDataService);
  });

  it('should be created', inject([ChatDataService], (service: ChatDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to retrieve channels based on workspace and email', () => {
    let channels: Channel [];
    chatservice.getChannels('workspace','test@test.com').subscribe(data => {
      expect(data).toBe(channels);
    });
  });

  it('should be able to add bot to workspace', () => {
    let botUser: User;
    chatservice.addBotToWorkspace('workspacename',botUser).subscribe(data => {
      expect().nothing;
    })
  });

  it('should be able to add bot to channel', () => {
    let botUser: User;
    chatservice.addBot("channelId", botUser).subscribe(data => expect().nothing);
  });
});
