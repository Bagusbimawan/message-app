import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: Props) {
  // Animation values
  const logoScale   = useRef(new Animated.Value(0.2)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleY      = useRef(new Animated.Value(24)).current;
  const titleOp     = useRef(new Animated.Value(0)).current;
  const taglineOp   = useRef(new Animated.Value(0)).current;
  const ringScale   = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0.6)).current;
  const dotOp1      = useRef(new Animated.Value(0.2)).current;
  const dotOp2      = useRef(new Animated.Value(0.2)).current;
  const dotOp3      = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    // ── Step 1: Logo pops in (200ms delay)
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        delay: 200,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // ── Step 2: App name slides up (500ms delay)
    Animated.parallel([
      Animated.timing(titleY, {
        toValue: 0,
        duration: 380,
        delay: 520,
        useNativeDriver: true,
      }),
      Animated.timing(titleOp, {
        toValue: 1,
        duration: 380,
        delay: 520,
        useNativeDriver: true,
      }),
    ]).start();

    // ── Step 3: Tagline fades in (750ms delay)
    Animated.timing(taglineOp, {
      toValue: 1,
      duration: 350,
      delay: 780,
      useNativeDriver: true,
    }).start();

    // ── Step 4: Pulse ring loops (900ms delay)
    const pulseLoop = () => {
      ringScale.setValue(1);
      ringOpacity.setValue(0.55);
      Animated.parallel([
        Animated.timing(ringScale, {
          toValue: 1.75,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(ringOpacity, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) pulseLoop();
      });
    };
    const ringTimer = setTimeout(pulseLoop, 900);

    // ── Step 5: Typing dots animate (1000ms delay)
    const dotSequence = Animated.sequence([
      Animated.delay(1000),
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotOp1, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(dotOp2, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(dotOp3, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.delay(300),
          Animated.parallel([
            Animated.timing(dotOp1, { toValue: 0.2, duration: 150, useNativeDriver: true }),
            Animated.timing(dotOp2, { toValue: 0.2, duration: 150, useNativeDriver: true }),
            Animated.timing(dotOp3, { toValue: 0.2, duration: 150, useNativeDriver: true }),
          ]),
          Animated.delay(100),
        ])
      ),
    ]);
    dotSequence.start();

    // ── Step 6: Navigate after 2.8s
    const navTimer = setTimeout(() => {
      onFinish();
    }, 2800);

    return () => {
      clearTimeout(ringTimer);
      clearTimeout(navTimer);
      dotSequence.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#07080D" />

      {/* Background grid dots decorative */}
      <View style={styles.gridOverlay} pointerEvents="none" />

      {/* Ambient glow behind logo */}
      <Animated.View
        style={[styles.ambientGlow, { opacity: logoOpacity }]}
        pointerEvents="none"
      />

      {/* Pulse ring */}
      <Animated.View
        style={[
          styles.pulseRing,
          { transform: [{ scale: ringScale }], opacity: ringOpacity },
        ]}
        pointerEvents="none"
      />

      {/* Logo icon */}
      <Animated.View
        style={[
          styles.logoWrap,
          { transform: [{ scale: logoScale }], opacity: logoOpacity },
        ]}
      >
        <Text style={styles.logoEmoji}>💬</Text>
      </Animated.View>

      {/* App name */}
      <Animated.Text
        style={[
          styles.appName,
          { transform: [{ translateY: titleY }], opacity: titleOp },
        ]}
      >
        Messenger
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text style={[styles.tagline, { opacity: taglineOp }]}>
        Connect with anyone, anywhere.
      </Animated.Text>

      {/* Loading dots */}
      <View style={styles.dotsRow}>
        <Animated.View style={[styles.dot, { opacity: dotOp1 }]} />
        <Animated.View style={[styles.dot, { opacity: dotOp2 }]} />
        <Animated.View style={[styles.dot, { opacity: dotOp3 }]} />
      </View>
    </View>
  );
}

const LOGO_SIZE = 88;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07080D',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── Decorative background grid
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.06,
    // Draw as faint dots via borderRadius magic (subtle visual only)
  },

  // ── Ambient glow blob behind logo
  ambientGlow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#3B7FFF',
    opacity: 0.12,
    // Soft blur approximated by large borderRadius on a transparent View
  },

  // ── Pulse ring
  pulseRing: {
    position: 'absolute',
    width: LOGO_SIZE + 32,
    height: LOGO_SIZE + 32,
    borderRadius: (LOGO_SIZE + 32) / 2,
    borderWidth: 1.5,
    borderColor: '#3B7FFF',
  },

  // ── Logo
  logoWrap: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: 28,
    backgroundColor: '#3B7FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B7FFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    elevation: 12,
  },
  logoEmoji: {
    fontSize: 40,
  },

  // ── App name
  appName: {
    marginTop: 22,
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.8,
  },

  // ── Tagline
  tagline: {
    marginTop: 10,
    fontSize: 15,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.2,
    fontWeight: '400',
  },

  // ── Loading dots
  dotsRow: {
    position: 'absolute',
    bottom: 72,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B7FFF',
  },
});
