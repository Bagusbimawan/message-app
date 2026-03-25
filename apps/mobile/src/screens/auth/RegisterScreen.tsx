import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, KeyboardAvoidingView, Platform, ScrollView,
  StatusBar, Animated, Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { registerWithEmail } from '@/services/firebase/auth';
import { AuthStackParamList } from '@/navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

const { height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }: Props) {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [focused,  setFocused]  = useState<'name' | 'email' | 'password' | null>(null);

  // Entrance animation
  const cardY  = useRef(new Animated.Value(40)).current;
  const cardOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(cardY,  { toValue: 0, tension: 55, friction: 8, useNativeDriver: true }),
      Animated.timing(cardOp, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  async function handleRegister() {
    if (!name || !email || !password) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await registerWithEmail(email.trim(), password, name.trim());
      // TODO: save token → navigate to AppNavigator
    } catch (e: any) {
      Alert.alert('Registration Failed', e.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor="#07080D" />

      {/* Background glow */}
      <View style={styles.bgGlow} pointerEvents="none" />

      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoEmoji}>💬</Text>
          </View>
        </View>

        {/* Headline */}
        <Text style={styles.headline}>Create account</Text>
        <Text style={styles.sub}>Join and start messaging today</Text>

        {/* Glass card */}
        <Animated.View style={[styles.card, { transform: [{ translateY: cardY }], opacity: cardOp }]}>

          {/* Full name */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={[styles.input, focused === 'name' && styles.inputFocused]}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor="rgba(255,255,255,0.2)"
              autoCapitalize="words"
              autoComplete="name"
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
            />
          </View>

          {/* Email */}
          <View style={styles.fieldWrap}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, focused === 'email' && styles.inputFocused]}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="rgba(255,255,255,0.2)"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
            />
          </View>

          {/* Password */}
          <View style={[styles.fieldWrap, { marginBottom: 0 }]}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, focused === 'password' && styles.inputFocused]}
              value={password}
              onChangeText={setPassword}
              placeholder="Min. 6 characters"
              placeholderTextColor="rgba(255,255,255,0.2)"
              secureTextEntry
              autoComplete="password-new"
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
            />
          </View>
        </Animated.View>

        {/* Sign up button */}
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnLoading]}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <View style={styles.dotsRow}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          ) : (
            <Text style={styles.btnText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Login link */}
        <TouchableOpacity
          style={styles.ghostBtn}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Text style={styles.ghostBtnText}>Already have an account? Sign in</Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const CARD_RADIUS = 20;

const styles = StyleSheet.create({
  root:        { flex: 1, backgroundColor: '#07080D' },
  bgGlow:      { position: 'absolute', top: -80, left: '50%', marginLeft: -150, width: 300, height: 300, borderRadius: 150, backgroundColor: '#3B7FFF', opacity: 0.08 },
  inner:       { flexGrow: 1, paddingHorizontal: 24, paddingTop: height * 0.08, paddingBottom: 48 },

  // Logo
  logoRow:     { alignItems: 'center', marginBottom: 28 },
  logoBox:     { width: 64, height: 64, borderRadius: 20, backgroundColor: '#3B7FFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#3B7FFF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.45, shadowRadius: 16, elevation: 10 },
  logoEmoji:   { fontSize: 30 },

  // Headline
  headline:    { fontSize: 30, fontWeight: '800', color: '#FFFFFF', textAlign: 'center', letterSpacing: -0.6 },
  sub:         { fontSize: 15, color: 'rgba(255,255,255,0.38)', textAlign: 'center', marginTop: 6, marginBottom: 28 },

  // Glass card
  card:        { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: CARD_RADIUS, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', padding: 20, marginBottom: 16 },
  fieldWrap:   { marginBottom: 16 },
  label:       { fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5, marginBottom: 8, textTransform: 'uppercase' },
  input:       { backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#FFFFFF' },
  inputFocused:{ borderColor: '#3B7FFF', backgroundColor: 'rgba(59,127,255,0.07)' },

  // Primary button
  btn:         { backgroundColor: '#3B7FFF', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 20, shadowColor: '#3B7FFF', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 14, elevation: 8 },
  btnLoading:  { opacity: 0.7 },
  btnText:     { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.2 },
  dotsRow:     { flexDirection: 'row', gap: 6, alignItems: 'center' },
  dot:         { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },

  // Divider
  divider:     { flexDirection: 'row', alignItems: 'center', marginBottom: 20, gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
  dividerText: { color: 'rgba(255,255,255,0.25)', fontSize: 12, fontWeight: '500' },

  // Ghost button
  ghostBtn:    { borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)', borderRadius: 14, paddingVertical: 15, alignItems: 'center' },
  ghostBtnText:{ color: 'rgba(255,255,255,0.65)', fontSize: 15, fontWeight: '600' },
});
