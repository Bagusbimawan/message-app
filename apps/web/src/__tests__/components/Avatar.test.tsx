import { render, screen } from '@testing-library/react';
import Avatar from '@/components/common/Avatar';

// next/image requires a real server in tests — swap it for a plain <img>
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

describe('Avatar', () => {
  describe('initials fallback', () => {
    it('renders single-word name as one initial', () => {
      render(<Avatar name="Alice" />);
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('renders two-word name as two initials', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('takes only first two words for a long name', () => {
      render(<Avatar name="Alice Bob Charlie" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });

    it('renders initials in uppercase', () => {
      render(<Avatar name="alice doe" />);
      expect(screen.getByText('AD')).toBeInTheDocument();
    });
  });

  describe('image', () => {
    it('renders an <img> when src is provided', () => {
      render(<Avatar name="Alice" src="https://example.com/photo.jpg" />);
      const img = screen.getByRole('img', { name: 'Alice' });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    it('renders initials fallback when src is null', () => {
      render(<Avatar name="Bob Smith" src={null} />);
      expect(screen.getByText('BS')).toBeInTheDocument();
    });
  });

  describe('online indicator', () => {
    it('renders no indicator when isOnline is undefined', () => {
      const { container } = render(<Avatar name="Alice" />);
      // indicator is a <span> sibling to the initials div — no span expected
      expect(container.querySelectorAll('span')).toHaveLength(0);
    });

    it('renders a green indicator when isOnline is true', () => {
      const { container } = render(<Avatar name="Alice" isOnline />);
      const dot = container.querySelector('span');
      expect(dot).toBeInTheDocument();
      expect(dot?.className).toContain('bg-green-500');
    });

    it('renders a gray indicator when isOnline is false', () => {
      const { container } = render(<Avatar name="Alice" isOnline={false} />);
      const dot = container.querySelector('span');
      expect(dot).toBeInTheDocument();
      expect(dot?.className).toContain('bg-gray-400');
    });
  });

  describe('size', () => {
    it('defaults to 40px', () => {
      const { container } = render(<Avatar name="Alice" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.width).toBe('40px');
      expect(wrapper.style.height).toBe('40px');
    });

    it('accepts a custom size', () => {
      const { container } = render(<Avatar name="Alice" size={64} />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.style.width).toBe('64px');
      expect(wrapper.style.height).toBe('64px');
    });
  });
});
