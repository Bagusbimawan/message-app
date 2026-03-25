import Image from 'next/image';
import clsx from 'clsx';

interface AvatarProps {
  src?:      string | null;
  name:      string;
  size?:     number;
  isOnline?: boolean;
  className?: string;
}

export default function Avatar({ src, name, size = 40, isOnline, className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className={clsx('relative flex-shrink-0', className)} style={{ width: size, height: size }}>
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="rounded-full object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <div
          className="w-full h-full rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold select-none"
          style={{ fontSize: size * 0.38 }}
        >
          {initials}
        </div>
      )}
      {isOnline !== undefined && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          )}
          style={{ width: size * 0.28, height: size * 0.28 }}
        />
      )}
    </div>
  );
}
