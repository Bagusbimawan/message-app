// Auth service — UI preview mode (mock)
// TODO: Replace mock functions with real API calls when backend is ready

export async function registerWithEmail(
  email:       string,
  password:    string,
  displayName: string
): Promise<{ uid: string; displayName: string; email: string }> {
  // TODO: POST /auth/register
  return { uid: 'me', displayName, email };
}

export async function loginWithEmail(
  email:    string,
  password: string
): Promise<{ uid: string; email: string }> {
  // TODO: POST /auth/login
  return { uid: 'me', email };
}

export async function logout(): Promise<void> {
  // TODO: POST /auth/logout or clear token
}
