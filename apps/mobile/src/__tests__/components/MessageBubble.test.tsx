import React from 'react';
import { render, screen } from '@testing-library/react-native';
import MessageBubble from '@/components/messages/MessageBubble';
import { Message } from '@messaging/types';

const baseMessage: Message = {
  id:        'm1',
  chatId:    'chat1',
  senderId:  'user2',
  type:      'text',
  text:      'Hello there!',
  status:    'sent',
  readBy:    {},
  timestamp: new Date('2024-06-01T09:41:00'),
};

describe('MessageBubble', () => {
  describe('text content', () => {
    it('renders the message text', () => {
      render(<MessageBubble message={baseMessage} isSender={false} />);
      expect(screen.getByText('Hello there!')).toBeTruthy();
    });

    it('renders formatted timestamp (HH:mm)', () => {
      render(<MessageBubble message={baseMessage} isSender={false} />);
      expect(screen.getByText('09:41')).toBeTruthy();
    });

    it('renders empty time when timestamp is undefined', () => {
      const msg = { ...baseMessage, timestamp: undefined };
      render(<MessageBubble message={msg} isSender={false} />);
      expect(screen.queryByText(/\d{2}:\d{2}/)).toBeNull();
    });
  });

  describe('sender name', () => {
    it('shows senderName for non-sender messages', () => {
      render(
        <MessageBubble message={baseMessage} isSender={false} senderName="Alice" />
      );
      expect(screen.getByText('Alice')).toBeTruthy();
    });

    it('does NOT show senderName when isSender is true', () => {
      render(
        <MessageBubble message={baseMessage} isSender senderName="Alice" />
      );
      expect(screen.queryByText('Alice')).toBeNull();
    });

    it('does NOT show senderName when senderName is undefined', () => {
      render(<MessageBubble message={baseMessage} isSender={false} />);
      expect(screen.queryByText('Alice')).toBeNull();
    });
  });

  describe('status ticks', () => {
    it('shows ⏳ for sending status', () => {
      const msg = { ...baseMessage, status: 'sending' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByText('⏳')).toBeTruthy();
    });

    it('shows ✓ for sent status', () => {
      render(<MessageBubble message={baseMessage} isSender />);
      expect(screen.getByText('✓')).toBeTruthy();
    });

    it('shows ✓✓ for delivered status', () => {
      const msg = { ...baseMessage, status: 'delivered' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByText('✓✓')).toBeTruthy();
    });

    it('shows ✓✓ for read status', () => {
      const msg = { ...baseMessage, status: 'read' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByText('✓✓')).toBeTruthy();
    });

    it('does NOT show status ticks for receiver messages', () => {
      render(<MessageBubble message={baseMessage} isSender={false} />);
      expect(screen.queryByText('✓')).toBeNull();
      expect(screen.queryByText('⏳')).toBeNull();
    });
  });
});
