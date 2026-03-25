import { Chat } from '@messaging/types';
import Avatar from '@/components/common/Avatar';

interface Props {
  chat:       Chat;
  currentUid: string;
}

export default function ChatHeader({ chat, currentUid }: Props) {
  const otherUid = chat.type === 'direct'
    ? chat.members.find((m) => m !== currentUid) ?? null
    : null;

  const name = chat.type === 'group'
    ? (chat.groupName ?? 'Group')
    : (chat.memberDetails[otherUid!]?.displayName ?? 'Unknown');

  const photo = chat.type === 'group'
    ? chat.groupPhotoURL
    : chat.memberDetails[otherUid!]?.photoURL;

  const subtitle = chat.type === 'group'
    ? `${chat.members.length} anggota`
    : 'Terakhir dilihat baru-baru ini';

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 bg-white">
      <Avatar src={photo} name={name} size={40} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900 truncate">{name}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}
