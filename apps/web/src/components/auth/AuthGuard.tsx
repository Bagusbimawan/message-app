'use client';

// For UI preview: AuthGuard is bypassed — always renders children.
// Wire up real auth check when Firebase / backend auth is ready.
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
