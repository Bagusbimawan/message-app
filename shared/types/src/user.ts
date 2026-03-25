export interface User {
  uid: string;
  displayName: string;
  photoURL: string | null;
  email: string | null;
  phone: string | null;
  fcmTokens: string[];
  presence: {
    isOnline: boolean;
    lastSeen: Date;
  };
  createdAt: Date;
}

export interface UserPreview {
  uid: string;
  displayName: string;
  photoURL: string | null;
}
