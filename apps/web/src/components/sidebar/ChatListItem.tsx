'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '@/components/common/Avatar';
import { Chat } from '@messaging/types';

interface Props {
  chat:       Chat;
  currentUid: string;
  active:     boolean;
}

export default function ChatListItem({ chat, currentUid, active }: Props) {
  const otherUid = chat.type === 'direct'
    ? chat.members.find((m) => m !== currentUid)
    : null;

  const name = chat.type === 'group'
    ? (chat.groupName ?? 'Group')
    : (chat.memberDetails[otherUid!]?.displayName ?? 'Unknown');

  const photo = chat.type === 'group'
    ? chat.groupPhotoURL
    : chat.memberDetails[otherUid!]?.photoURL;

  const unread = chat.unreadCount[currentUid] ?? 0;

  const lastMsgText = () => {
    if (!chat.lastMessage) return 'No messages yet';
    if (chat.lastMessage.type === 'image') return '📷 Photo';
    if (chat.lastMessage.type === 'file')  return '📎 File';
    return chat.lastMessage.text ?? '';
  };

  const timeAgo = chat.lastMessage?.timestamp
    ? formatDistanceToNowStrict(chat.lastMessage.timestamp, { addSuffix: false })
    : '';

  return (
    <Link
      href={`/chat/${chat.id}`}
      className={clsx(
        'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer',
        active && 'bg-primary-50 border-r-2 border-primary-600'
      )}
    >
      <Avatar src={photo} name={name} size={48} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm text-gray-900 truncate">{name}</span>
          {timeAgo && (
            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{timeAgo}</span>
          )}
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-gray-500 truncate">{lastMsgText()}</p>
          {unread > 0 && (
            <span className="ml-2 flex-shrink-0 bg-primary-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {unread > 99 ? '99+' : unread}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
