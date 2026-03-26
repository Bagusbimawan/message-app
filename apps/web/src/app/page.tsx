import Link from 'next/link';

const features = [
  { icon: '⚡', title: 'Real-time Messaging', desc: 'Instant delivery in milliseconds. Zero lag, always in sync.' },
  { icon: '👥', title: 'Groups & Communities', desc: 'Create sub-rooms just like Discord inside every community.' },
  { icon: '✓✓', title: 'Read Receipts', desc: 'Know exactly when your message is delivered and read.' },
  { icon: '🌐', title: 'Multi-Platform', desc: 'Web + mobile (iOS & Android). One account, all devices.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#00d097] flex items-center justify-center shadow-md shadow-emerald-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">Messenger</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">How It Works</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors px-4 py-2">Sign In</Link>
            <Link href="/register" className="text-sm font-bold text-white bg-[#00d097] hover:bg-[#00b07f] px-5 py-2.5 rounded-xl shadow-md shadow-emerald-200/60 transition-all hover:shadow-lg hover:-translate-y-0.5">Get Started</Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-80px] left-[-120px] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute top-[100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-purple-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[30%] w-[350px] h-[350px] rounded-full bg-emerald-300/20 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Web &amp; Mobile · Real-time · No Bots
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            <span className="text-[#00d097]">One Click.</span>{' '}
            <span className="text-gray-900">Zero Friction.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
            Messenger connects people directly — no bots, no friction. Real-time messaging, group rooms, and community channels.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00d097] hover:bg-[#00b07f] text-white font-bold px-9 py-4 rounded-2xl shadow-lg shadow-emerald-200/70 transition-all hover:-translate-y-0.5 text-base"
            >
              Start for Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-9 py-4 rounded-2xl border border-gray-200 transition-colors text-base shadow-sm"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>

        {/* Floating chat UI mockup */}
        <div className="relative max-w-4xl mx-auto z-10 animate-slide-up">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* App shell header */}
            <div className="flex items-center gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white rounded-md px-4 py-1 text-xs text-gray-400 border border-gray-200 font-mono">
                  messenger.app/chat
                </div>
              </div>
            </div>

            {/* App layout mockup */}
            <div className="flex h-[380px]">
              {/* Left nav strip */}
              <div className="w-14 bg-[#1a1c23] flex flex-col items-center py-4 gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#00d097] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded-lg flex items-center justify-center ${i === 0 ? 'bg-white/10' : ''}`}>
                    <div className="w-4 h-[2px] bg-white/30 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="w-56 bg-white border-r border-gray-100 flex flex-col p-3 gap-2">
                <div className="h-8 bg-gray-100 rounded-lg" />
                {[{ name: 'Alfonso George', active: true, unread: 0 }, { name: 'Gustavo L.', active: false, unread: 0 }, { name: 'Dulce George', active: false, unread: 2 }, { name: 'Carter Vaccaro', active: false, unread: 0 }, { name: 'Alena Saris', active: false, unread: 1 }].map((c, i) => (
                  <div key={i} className={`flex items-center gap-2 p-2 rounded-xl ${c.active ? 'bg-emerald-50' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 ${['bg-blue-400', 'bg-purple-400', 'bg-orange-400', 'bg-pink-400', 'bg-teal-400'][i]} flex items-center justify-center text-white text-[10px] font-bold`}>
                      {c.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`h-2 rounded-full mb-1 ${c.active ? 'bg-emerald-400' : 'bg-gray-200'}`} style={{ width: `${50 + i * 10}%` }} />
                      <div className="h-1.5 bg-gray-100 rounded-full w-3/4" />
                    </div>
                    {c.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#00d097] text-white text-[9px] flex items-center justify-center font-bold flex-shrink-0">{c.unread}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat area */}
              <div className="flex-1 flex flex-col bg-gray-50">
                <div className="h-12 bg-white border-b border-gray-100 flex items-center px-4 gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-400" />
                  <div>
                    <div className="h-2 bg-gray-200 rounded-full w-24 mb-1" />
                    <div className="h-1.5 bg-gray-100 rounded-full w-16" />
                  </div>
                </div>
                <div className="flex-1 px-4 py-3 flex flex-col gap-3 overflow-hidden">
                  {[false, false, true, false, true, true].map((isSelf, i) => (
                    <div key={i} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                      <div className={`px-3 py-2 rounded-xl text-white text-[11px] max-w-[60%] ${isSelf ? 'bg-[#00d097] rounded-br-sm' : 'bg-white text-gray-700 border border-gray-100 rounded-bl-sm'}`}>
                        <div className={`h-2 rounded-full mb-1 ${isSelf ? 'bg-white/40' : 'bg-gray-200'}`} style={{ width: `${40 + (i % 3) * 20}%` }} />
                        {i % 2 === 0 && <div className={`h-1.5 rounded-full ${isSelf ? 'bg-white/30' : 'bg-gray-100'}`} style={{ width: '60%' }} />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-14 bg-white border-t border-gray-100 flex items-center gap-3 px-4">
                  <div className="flex-1 h-8 bg-gray-100 rounded-xl" />
                  <div className="w-8 h-8 rounded-xl bg-[#00d097] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute -left-8 top-12 bg-[#00d097] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-emerald-300/40 animate-float">
            Henry is typing...
          </div>
          <div className="absolute -right-6 top-20 bg-white border border-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-xl shadow-lg animate-float-delayed">
            📬 3 new messages
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 px-6 border-y border-gray-100 bg-gray-50/60">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
          {[{ v: '50K+', l: 'Active Users' }, { v: '5M+', l: 'Messages Sent' }, { v: '99.9%', l: 'Uptime SLA' }].map((s, i) => (
            <div key={i} className={`text-center ${i < 2 ? 'border-r border-gray-200' : ''}`}>
              <p className="text-3xl font-extrabold text-[#00d097] tracking-tight">{s.v}</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#00d097] font-bold text-sm uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Everything you need</h2>
            <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">Built for fast, comfortable, and intuitive communication.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50 transition-all duration-300 cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center text-2xl mb-5 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#00d097] to-[#00b07f] rounded-3xl p-12 text-center shadow-2xl shadow-emerald-200/50">
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready to get started?</h2>
            <p className="text-emerald-100 text-lg mb-10 max-w-md mx-auto">Join thousands who rely on Messenger to stay connected every day.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-emerald-700 font-bold px-8 py-4 rounded-2xl transition-colors text-base shadow-lg">
                Create Free Account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/chat" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-emerald-400 hover:bg-emerald-600/20 text-white font-semibold px-8 py-4 rounded-2xl transition-colors text-base">
                Open Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#00d097] flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-sm">Messenger</span>
          </div>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Messenger. Made with ❤️</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Sign In</Link>
            <Link href="/register" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Sign Up</Link>
            <Link href="/chat" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Open App</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
