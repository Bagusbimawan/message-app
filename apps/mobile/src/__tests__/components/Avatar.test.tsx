import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Avatar from '@/components/common/Avatar';

describe('Avatar', () => {
  describe('initials fallback', () => {
    it('renders single-word name as one initial', () => {
      render(<Avatar name="Alice" />);
      expect(screen.getByText('A')).toBeTruthy();
    });

    it('renders two-word name as two initials', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeTruthy();
    });

    it('takes only the first two words for long names', () => {
      render(<Avatar name="Alice Bob Charlie" />);
      expect(screen.getByText('AB')).toBeTruthy();
    });

    it('renders initials in uppercase', () => {
      render(<Avatar name="alice smith" />);
      expect(screen.getByText('AS')).toBeTruthy();
    });
  });

  describe('image', () => {
    it('renders an Image when src is provided', () => {
      const { UNSAFE_getByType } = render(
        <Avatar name="Alice" src="https://example.com/photo.jpg" />
      );
      // react-native Image is imported as Image from 'react-native'
      const { Image } = require('react-native');
      expect(UNSAFE_getByType(Image)).toBeTruthy();
    });

    it('shows initials fallback when src is null', () => {
      render(<Avatar name="Bob Smith" src={null} />);
      expect(screen.getByText('BS')).toBeTruthy();
    });
  });

  describe('online indicator', () => {
    it('renders no dot view when isOnline is undefined', () => {
      const { UNSAFE_queryAllByType } = render(<Avatar name="Alice" />);
      const { View } = require('react-native');
      // Only the outer wrapper View and the fallback View — no dot
      expect(UNSAFE_queryAllByType(View)).toHaveLength(2);
    });

    it('renders an extra dot view when isOnline is true', () => {
      const { UNSAFE_queryAllByType } = render(<Avatar name="Alice" isOnline />);
      const { View } = require('react-native');
      expect(UNSAFE_queryAllByType(View)).toHaveLength(3);
    });

    it('renders dot view when isOnline is false', () => {
      const { UNSAFE_queryAllByType } = render(<Avatar name="Alice" isOnline={false} />);
      const { View } = require('react-native');
      expect(UNSAFE_queryAllByType(View)).toHaveLength(3);
    });
  });

  describe('size', () => {
    it('defaults to 44px', () => {
      const { UNSAFE_getByType } = render(<Avatar name="Alice" />);
      const { View } = require('react-native');
      const wrapper = UNSAFE_getByType(View);
      expect(wrapper.props.style).toMatchObject({ width: 44, height: 44 });
    });

    it('accepts a custom size', () => {
      const { UNSAFE_getByType } = render(<Avatar name="Alice" size={80} />);
      const { View } = require('react-native');
      const wrapper = UNSAFE_getByType(View);
      expect(wrapper.props.style).toMatchObject({ width: 80, height: 80 });
    });
  });
});
