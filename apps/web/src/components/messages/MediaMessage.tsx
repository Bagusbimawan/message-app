import Image from 'next/image';
import { Message } from '@messaging/types';

interface Props {
  message: Message;
}

export default function MediaMessage({ message }: Props) {
  if (message.type === 'image' && message.mediaURL) {
    return (
      <div className="relative rounded-lg overflow-hidden max-w-xs">
        <Image
          src={message.mediaURL}
          alt="Image"
          width={300}
          height={200}
          className="object-cover rounded-lg"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
    );
  }

  if (message.type === 'file' && message.mediaURL) {
    const sizeKB = message.fileSize ? Math.round(message.fileSize / 1024) : null;
    return (
      <a
        href={message.mediaURL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-2 rounded-lg bg-black/5 hover:bg-black/10 transition-colors"
      >
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-primary-100 rounded-lg">
          <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{message.fileName ?? 'File'}</p>
          {sizeKB && <p className="text-xs text-gray-400">{sizeKB} KB</p>}
        </div>
      </a>
    );
  }

  return null;
}
