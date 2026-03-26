import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/(auth)/login/page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    mockPush.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the sign-in heading', () => {
    render(<LoginPage />);
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to continue messaging')).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('renders the sign-in button', () => {
    render(<LoginPage />);
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders a link to the register page', () => {
    render(<LoginPage />);
    const link = screen.getByRole('link', { name: /create one/i });
    expect(link).toHaveAttribute('href', '/register');
  });

  it('updates email field on type', async () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('you@example.com');
    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('updates password field on type', async () => {
    render(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText('••••••••');
    await userEvent.type(passwordInput, 'secret123');
    expect(passwordInput).toHaveValue('secret123');
  });

  it('shows loading state and navigates to /chat on submit', async () => {
    render(<LoginPage />);
    const emailInput    = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    const submitBtn     = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(emailInput,    { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitBtn);

    expect(screen.getByRole('button', { name: 'Signing in…' })).toBeDisabled();

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/chat');
    });
  });
});
