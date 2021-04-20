import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBestFriendComponent } from './new-best-friend.component';

describe('NewBestFriendComponent', () => {
  let component: NewBestFriendComponent;
  let fixture: ComponentFixture<NewBestFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBestFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBestFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
