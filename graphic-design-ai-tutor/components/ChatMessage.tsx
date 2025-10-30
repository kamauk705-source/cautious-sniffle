
import React from 'react';
import { Message } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex w-full items-start gap-4 ${!isBot && 'justify-end'}`}>
        {isBot && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                <BotIcon className="w-5 h-5" />
            </div>
        )}
        <div
            className={`max-w-2xl px-4 py-3 rounded-2xl ${
                isBot
                    ? 'bg-gray-700/50 text-gray-200 rounded-tl-none'
                    : 'bg-indigo-600 text-white rounded-br-none'
            }`}
        >
            {/* 
            For a real application, we would use a library like 'react-markdown' to render the markdown response from Gemini.
            Since we cannot add dependencies, we'll render the text directly and use CSS to preserve line breaks.
            */}
            <div className="prose prose-invert max-w-none" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                {message.text}
            </div>
        </div>
        {!isBot && (
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
                <UserIcon className="w-5 h-5" />
            </div>
        )}
    </div>
  );
};
