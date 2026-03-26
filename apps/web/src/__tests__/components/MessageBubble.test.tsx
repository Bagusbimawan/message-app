import { render, screen } from '@testing-library/react';
import MessageBubble from '@/components/messages/MessageBubble';
import { Message } from '@messaging/types';

// MediaMessage not relevant to text tests
jest.mock('@/components/messages/MediaMessage', () => ({
  __esModule: true,
  default: () => <div data-testid="media-message" />,
}));

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
      expect(screen.getByText('Hello there!')).toBeInTheDocument();
    });

    it('renders formatted timestamp', () => {
      render(<MessageBubble message={baseMessage} isSender={false} />);
      expect(screen.getByText('09:41')).toBeInTheDocument();
    });

    it('renders empty time when timestamp is missing', () => {
      const msg = { ...baseMessage, timestamp: undefined };
      render(<MessageBubble message={msg} isSender={false} />);
      // time span should be present but empty
      expect(screen.queryByText(/\d{2}:\d{2}/)).not.toBeInTheDocument();
    });
  });

  describe('sender vs receiver layout', () => {
    it('applies sender (right-aligned) classes when isSender is true', () => {
      const { container } = render(
        <MessageBubble message={baseMessage} isSender />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('flex-row-reverse');
    });

    it('applies receiver (left-aligned) classes when isSender is false', () => {
      const { container } = render(
        <MessageBubble message={baseMessage} isSender={false} />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('flex-row');
      expect(wrapper.className).not.toContain('flex-row-reverse');
    });
  });

  describe('sender name', () => {
    it('shows senderName for non-sender group messages', () => {
      render(
        <MessageBubble message={baseMessage} isSender={false} senderName="Alice" />
      );
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('does NOT show senderName when isSender is true', () => {
      render(
        <MessageBubble message={baseMessage} isSender senderName="Alice" />
      );
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });

    it('does NOT show senderName when senderName is undefined', () => {
      render(<MessageBubble message={baseMessage} isSender={false} />);
      // no extra name paragraph
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  describe('status ticks', () => {
    it('shows ⏳ for sending status', () => {
      const msg = { ...baseMessage, status: 'sending' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByText('⏳')).toBeInTheDocument();
    });

    it('shows ✓ for sent status', () => {
      render(<MessageBubble message={baseMessage} isSender />);
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('shows ✓✓ for delivered status', () => {
      const msg = { ...baseMessage, status: 'delivered' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByText('✓✓')).toBeInTheDocument();
    });

    it('shows ✓✓ for read status', () => {
      const msg = { ...baseMessage, status: 'read' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByText('✓✓')).toBeInTheDocument();
    });

    it('does NOT show status ticks for receiver messages', () => {
      render(<MessageBubble message={baseMessage} isSender={false} />);
      expect(screen.queryByText('✓')).not.toBeInTheDocument();
    });
  });

  describe('media messages', () => {
    it('renders MediaMessage for image type', () => {
      const msg = { ...baseMessage, type: 'image' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByTestId('media-message')).toBeInTheDocument();
    });

    it('renders MediaMessage for file type', () => {
      const msg = { ...baseMessage, type: 'file' as const };
      render(<MessageBubble message={msg} isSender />);
      expect(screen.getByTestId('media-message')).toBeInTheDocument();
    });
  });
});
