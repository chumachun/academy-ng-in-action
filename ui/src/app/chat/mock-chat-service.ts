import { BehaviorSubject, of } from 'rxjs';
import { vi } from 'vitest';
import { MessageModel } from './message-model';
import { mockUser } from '../user/mock-user-service';

export const mockMessages: MessageModel[] = [
  {
    text: 'test1',
    sender: mockUser.name,
    receiver: 'test2',
    date: new Date('2024-07-21'),
  },
  {
    text: 'test2',
    sender: 'test2',
    receiver: mockUser.name,
    date: new Date('2024-07-20'),
  },
];

export const mockReceivedMessages: MessageModel[] = [
  {
    text: 'test3',
    sender: 'test3',
    receiver: mockUser.name,
    date: new Date('2024-07-19'),
  },
];
export const mockReceivedMessagesSubject$ = new BehaviorSubject(mockReceivedMessages);

export class MockChatService {
  receivedMessages$ = mockReceivedMessagesSubject$.asObservable();
  openHub = vi.fn();
  closeHub = vi.fn();
  messages = vi.fn(() => of(mockMessages));
}
