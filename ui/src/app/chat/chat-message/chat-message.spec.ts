import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ChatMessage } from './chat-message';

const getSentCssClass = <T>(fixture: ComponentFixture<T>): DebugElement | null =>
  fixture.debugElement.query(By.css('.sent'));

describe(ChatMessage.name, () => {
  let fixture: ComponentFixture<ChatMessage>;
  let component: ChatMessage;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ChatMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessage);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('current', undefined);
    fixture.componentRef.setInput('message', {
      text: 'TEST',
      sender: 'ABC',
      receiver: undefined,
      date: new Date(),
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a sent class when current user is sender', () => {
    fixture.componentRef.setInput('current', { name: component.message().sender });
    fixture.detectChanges();

    const sent = getSentCssClass(fixture);

    expect(sent).not.toBe(null);
  });

  it('should have a not sent class when current user is not sender', () => {
    fixture.componentRef.setInput('current', { name: 'NOT_ABC' });
    fixture.detectChanges();

    const sent = getSentCssClass(fixture);

    expect(sent).toBe(null);
  });
});
