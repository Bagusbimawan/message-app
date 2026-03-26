import clsx from 'clsx';
import { format } from 'date-fns';
import { Message } from '@messaging/types';
import MediaMessage from './MediaMessage';

interface Props {
  readonly message: Message;
  readonly isSender: boolean;
  readonly showAvatar?: boolean;
  readonly senderName?: string;
}

function StatusTicks({ status, isSender }: { readonly status: Message['status'], readonly isSender: boolean }) {
  const color = status === 'read' ? (isSender ? '#ffffff' : '#53bdeb') : (isSender ? 'rgba(255,255,255,0.7)' : '#8696a0');
  if (status === 'sending') return <span className="text-xs opacity-70">⏳</span>;
  if (status === 'sent') return <span style={{ color }} className="text-xs">✓</span>;
  return (
    <span style={{ color }} className="text-xs tracking-tighter font-bold">✓✓</span>
  );
}

export default function MessageBubble({ message, isSender, senderName }: Props) {
  const time = message.timestamp ? format(message.timestamp, 'HH:mm') : '';

  return (
    <div className={clsx('flex items-end gap-2 group mb-3', isSender ? 'flex-row-reverse' : 'flex-row')}>
      <div
        className={clsx(
          'max-w-[75%] px-4 py-3 shadow-sm relative text-[15px] leading-relaxed',
          isSender
            ? 'bg-wa-bubbleOut text-white rounded-[20px] rounded-br-[4px]'
            : 'bg-wa-bubbleIn text-wa-text rounded-[20px] rounded-bl-[4px] border border-wa-border'
        )}
      >
        {!isSender && senderName && (
          <p className="text-[13px] font-semibold text-wa-primary mb-1">{senderName}</p>
        )}

        <div className="flex flex-col">
          <div className="whitespace-pre-wrap break-words">
            {message.type === 'text' && message.text}
            {(message.type === 'image' || message.type === 'file') && (
              <MediaMessage message={message} />
            )}
          </div>

          <div className={clsx("flex items-center gap-1.5 self-end mt-1.5", isSender ? "text-white/90" : "text-wa-textMuted")}>
            <span className="text-[11px] font-medium">{time}</span>
            {isSender && <StatusTicks status={message.status} isSender={isSender} />}
          </div>
        </div>
      </div>
    </div>
  );
}
