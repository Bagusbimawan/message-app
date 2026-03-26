'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '@/components/common/Avatar';
import { Chat } from '@messaging/types';

interface Props {
  readonly chat: Chat;
  readonly currentUid: string;
  readonly active: boolean;
}

export default function ChatListItem({ chat, currentUid, active }: Props) {
  const { id, type, groupName, groupPhotoURL, memberDetails, lastMessage, unreadCount } = chat;

  const otherUid = type === 'direct' ? chat.members.find((m) => m !== currentUid) : null;

  const name = (type === 'group' || type === 'community')
    ? (groupName ?? 'Group')
    : (memberDetails[otherUid!]?.displayName ?? 'Unknown');

  const photo = (type === 'group' || type === 'community')
    ? groupPhotoURL
    : memberDetails[otherUid!]?.photoURL;

  const unread = unreadCount[currentUid] ?? 0;

  const lastMsgText = () => {
    if (!lastMessage) return 'No messages yet';
    if (lastMessage.type === 'image') return '📷 Photo';
    if (lastMessage.type === 'file') return '📎 File';
    return lastMessage.text ?? '';
  };

  // Compute relative time only on client to prevent hydration mismatch
  const [timeAgo, setTimeAgo] = useState('');
  useEffect(() => {
    if (!lastMessage?.timestamp) return;
    setTimeAgo(formatDistanceToNowStrict(lastMessage.timestamp, { addSuffix: false }));
  }, [lastMessage?.timestamp]);

  return (
    <Link
      href={`/chat/${id}`}
      className={clsx(
        'flex items-center gap-3 px-3 py-3 rounded-xl mx-1 mb-1 transition-all duration-150 group',
        active ? 'bg-wa-primary/10' : 'hover:bg-wa-hover'
      )}
    >
      <div className="relative flex-shrink-0">
        <Avatar src={photo} name={name} size={44} />
        {type === 'direct' && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-wa-panel" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={clsx(
            'text-[14px] font-semibold truncate',
            active ? 'text-wa-primary' : 'text-wa-text'
          )}>
            {name}
          </span>
          {timeAgo && (
            <span className="text-[11px] text-wa-textMuted flex-shrink-0">{timeAgo}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-[13px] text-wa-textMuted truncate">{lastMsgText()}</p>
          {unread > 0 && (
            <span className="flex-shrink-0 bg-wa-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {unread > 99 ? '99+' : unread}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
