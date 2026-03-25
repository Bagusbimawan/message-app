import clsx from 'clsx';
import { format } from 'date-fns';
import { Message } from '@messaging/types';
import MediaMessage from './MediaMessage';

interface Props {
  message:    Message;
  isSender:   boolean;
  showAvatar: boolean;
  senderName?: string;
  avatarSrc?:  string | null;
}

function StatusTicks({ status }: { status: Message['status'] }) {
  const color = status === 'read' ? '#53bdeb' : '#8696a0';
  if (status === 'sending') return <span className="text-gray-300 text-xs">⏳</span>;
  if (status === 'sent')    return <span style={{ color }} className="text-xs">✓</span>;
  return (
    <span style={{ color }} className="text-xs tracking-tighter">✓✓</span>
  );
}

export default function MessageBubble({ message, isSender, showAvatar, senderName }: Props) {
  const time = message.timestamp ? format(message.timestamp, 'HH:mm') : '';

  return (
    <div className={clsx('flex items-end gap-1.5 group', isSender ? 'flex-row-reverse' : 'flex-row')}>
      {/* Spacer to preserve layout when avatar is hidden */}
      <div className="w-7 flex-shrink-0" />

      <div
        className={clsx(
          'max-w-[70%] rounded-2xl px-3 py-2 shadow-sm',
          isSender
            ? 'bg-bubble-sent rounded-br-sm'
            : 'bg-bubble-received rounded-bl-sm border border-gray-100'
        )}
      >
        {/* Group chat: show sender name */}
        {!isSender && senderName && (
          <p className="text-xs font-semibold text-primary-600 mb-1">{senderName}</p>
        )}

        {message.type === 'text' && (
          <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">{message.text}</p>
        )}

        {(message.type === 'image' || message.type === 'file') && (
          <MediaMessage message={message} />
        )}

        {/* Time + status */}
        <div className={clsx('flex items-center gap-1 mt-1', isSender ? 'justify-end' : 'justify-start')}>
          <span className="text-[10px] text-gray-400">{time}</span>
          {isSender && <StatusTicks status={message.status} />}
        </div>
      </div>
    </div>
  );
}
