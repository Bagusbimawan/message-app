import Link from 'next/link';

const features = [
  {
    icon: '⚡',
    title: 'Instant Delivery',
    desc:  'Messages sent and received in milliseconds. Zero delay, zero lag — always in sync.',
  },
  {
    icon: '👥',
    title: 'Group Chats',
    desc:  'Create groups with hundreds of members. Perfect for teams, communities, or family.',
  },
  {
    icon: '✓',
    title: 'Read Receipts',
    desc:  'Know when your message is delivered and read. Real-time status on every message.',
  },
  {
    icon: '🌐',
    title: 'Cross-Platform',
    desc:  'Available on web and mobile (iOS & Android). One account, all your devices.',
  },
];

const steps = [
  { number: '01', title: 'Create Account', desc: 'Sign up for free in 30 seconds. No credit card required.' },
  { number: '02', title: 'Find People',     desc: 'Search for friends or teammates by name.' },
  { number: '03', title: 'Start Chatting',  desc: 'Send messages, create groups, and stay connected anywhere.' },
];

const stats = [
  { value: '10K+',   label: 'Active Users' },
  { value: '1M+',    label: 'Messages Sent' },
  { value: '99.9%',  label: 'Uptime' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-sm">💬</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Messenger</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features"     className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium">How It Works</a>
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-3 sm:px-4 py-2">
              Sign In
            </Link>
            <Link href="/register" className="text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors px-4 sm:px-5 py-2.5 rounded-xl shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 bg-gradient-to-b from-blue-50/60 to-white">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
            Available on Web &amp; Mobile
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Message smarter,{' '}
            <span className="text-primary-600">connect faster.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            A modern messaging platform for teams and individuals. Real-time, lightweight, and accessible from anywhere — no install required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-primary-200 transition-all hover:-translate-y-0.5 text-base"
            >
              Start for Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-2xl border border-gray-200 transition-colors text-base"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>

        {/* Mock chat UI */}
        <div className="max-w-sm sm:max-w-lg mx-auto mt-12 sm:mt-16 bg-white rounded-3xl shadow-2xl shadow-gray-200/80 border border-gray-100 overflow-hidden animate-slide-up">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border-b border-gray-100 bg-white">
            <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold shrink-0">S</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Sarah Miller</p>
              <p className="text-xs text-green-500 font-medium">● Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-3 bg-gray-50/50">
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-gray-100 max-w-[75%]">
                <p className="text-sm text-gray-800">Hey! How&apos;s the project going? 🚀</p>
                <p className="text-[10px] text-gray-400 text-right mt-1">9:41 AM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-[#dcf8c6] rounded-2xl rounded-br-sm px-4 py-2.5 shadow-sm max-w-[75%]">
                <p className="text-sm text-gray-800">Almost done! Just wrapping up the UI 😄</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <p className="text-[10px] text-gray-400">9:42 AM</p>
                  <span className="text-[11px] text-[#53bdeb]">✓✓</span>
                </div>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm border border-gray-100 max-w-[75%]">
                <p className="text-sm text-gray-800">Awesome! Can&apos;t wait to see it 👍</p>
                <p className="text-[10px] text-gray-400 text-right mt-1">9:43 AM</p>
              </div>
            </div>
            {/* Typing indicator */}
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-typing-dot" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-typing-dot" style={{ animationDelay: '200ms' }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-typing-dot" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Input mock */}
          <div className="flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 border-t border-gray-100 bg-white">
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm text-gray-400">Type a message…</div>
            <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-white translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="py-12 px-4 sm:px-6 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6 sm:gap-8">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center ${i < stats.length - 1 ? 'border-r border-gray-200' : ''}`}>
                <p className="text-2xl sm:text-3xl font-extrabold text-primary-600 tracking-tight">{s.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Everything you need</h2>
            <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-xl mx-auto">Built for fast, comfortable, and intuitive communication.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-50 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center text-2xl mb-5 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-20 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Up and running in 3 steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            {steps.map((s, i) => (
              <div key={s.number} className="relative text-center">
                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-[-calc(50%-40px)] h-px bg-gradient-to-r from-primary-200 to-transparent" />
                )}
                <div className="inline-flex w-16 h-16 rounded-2xl bg-primary-600 text-white font-extrabold text-xl items-center justify-center mb-6 shadow-lg shadow-primary-200">
                  {s.number}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-12 text-center shadow-2xl shadow-primary-200">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-primary-100 text-base sm:text-lg mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed">
              Join thousands of users who already rely on Messenger to stay connected every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary-700 font-bold px-8 py-4 rounded-2xl transition-colors text-base shadow-lg"
              >
                Create Free Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-primary-400 hover:bg-primary-500/30 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary-600 flex items-center justify-center">
              <span className="text-white text-xs">💬</span>
            </div>
            <span className="font-bold text-gray-800 text-sm">Messenger</span>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Messenger. Made with ❤️</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/login"    className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Sign In</Link>
            <Link href="/register" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Sign Up</Link>
            <Link href="/chat"     className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Open App</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
