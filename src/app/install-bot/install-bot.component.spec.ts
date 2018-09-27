import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallBotComponent } from './install-bot.component';

describe('InstallBotComponent', () => {
  let component: InstallBotComponent;
  let fixture: ComponentFixture<InstallBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
