export interface MessageDto {
  id: string;
  text: string;
  sender: string;
  receiver?: string;
  date: string;
}

export interface MessageModel extends Omit<MessageDto, 'id' | 'date'> {
  id?: string;
  date: Date;
}

export const mapMessages = (messages: MessageDto[]): MessageModel[] => messages.map(mapMessage);

export const mapMessage = (message: MessageDto): MessageModel => ({
  ...message,
  date: new Date(message.date),
});
