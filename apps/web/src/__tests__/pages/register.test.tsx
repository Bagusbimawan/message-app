import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '@/app/(auth)/register/page';

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

describe('RegisterPage', () => {
  beforeEach(() => {
    mockPush.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the create account heading', () => {
    render(<RegisterPage />);
    expect(screen.getByText('Create account')).toBeInTheDocument();
    expect(screen.getByText('Join and start messaging today')).toBeInTheDocument();
  });

  it('renders all three input fields', () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Min. 6 characters')).toBeInTheDocument();
  });

  it('renders the create account button', () => {
    render(<RegisterPage />);
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('renders a link back to login', () => {
    render(<RegisterPage />);
    const link = screen.getByRole('link', { name: /sign in/i });
    expect(link).toHaveAttribute('href', '/login');
  });

  it('updates all fields on type', async () => {
    render(<RegisterPage />);
    await userEvent.type(screen.getByPlaceholderText('Your name'),        'Alice');
    await userEvent.type(screen.getByPlaceholderText('you@example.com'),  'alice@example.com');
    await userEvent.type(screen.getByPlaceholderText('Min. 6 characters'),'secret123');

    expect(screen.getByPlaceholderText('Your name')).toHaveValue('Alice');
    expect(screen.getByPlaceholderText('you@example.com')).toHaveValue('alice@example.com');
    expect(screen.getByPlaceholderText('Min. 6 characters')).toHaveValue('secret123');
  });

  it('password field is of type password', () => {
    render(<RegisterPage />);
    const passwordInput = screen.getByPlaceholderText('Min. 6 characters');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('password field enforces minLength of 6', () => {
    render(<RegisterPage />);
    const passwordInput = screen.getByPlaceholderText('Min. 6 characters');
    expect(passwordInput).toHaveAttribute('minLength', '6');
  });

  it('shows loading state and navigates to /chat on submit', async () => {
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText('Your name'),        { target: { value: 'Alice' } });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'),  { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Min. 6 characters'),{ target: { value: 'secret123' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(screen.getByRole('button', { name: 'Creating account…' })).toBeDisabled();

    jest.runAllTimers();

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/chat');
    });
  });
});
