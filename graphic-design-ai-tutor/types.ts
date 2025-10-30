
export type MessageSender = 'user' | 'bot';

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
}

export type Software = 'photoshop' | 'illustrator' | 'indesign' | 'general';

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  software: Software;
}
