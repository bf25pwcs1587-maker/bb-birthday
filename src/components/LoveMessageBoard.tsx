import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, Calendar, Clock } from 'lucide-react';
import { calculateThailandCountdown, ThailandCountdown } from '../utils/thaiTime.ts';
import { soundEngine } from '../utils/audio.ts';

interface MessagePost {
  id: string;
  sender: string;
  text: string;
  time: string;
}

export const LoveMessageBoard: React.FC = () => {
  const [messages, setMessages] = useState<MessagePost[]>([
    {
      id: 'p1',
      sender: 'Talha ♥ (ตัลฮา)',
      text: 'Happy Birthday my sweet wifey BB! สุขสันต์วันเกิดนะคนดี You are the light in every room you enter and the beat of my heart. I adore you beyond words.',
      time: 'Just now',
    },
    {
      id: 'p2',
      sender: 'Talha ♥ (ตัลฮา)',
      text: 'รักบีบีที่สุดในโลก! Wishing my gorgeous queen the happiest 13th celebration on Thailand time! Here is to a lifetime of adventures, laughter, and endless cuddles.',
      time: 'Earlier today',
    },
  ]);

  const [authorName, setAuthorName] = useState('BB (Birthday Queen)');
  const [newText, setNewText] = useState('');
  const [countdown, setCountdown] = useState<ThailandCountdown>(calculateThailandCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateThailandCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const post: MessagePost = {
      id: `msg-${Date.now()}`,
      sender: authorName.trim() || 'BB ♥',
      text: newText.trim(),
      time: 'A moment ago',
    };

    setMessages([post, ...messages]);
    setNewText('');
    soundEngine.playSparkleSound();
  };

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto relative z-20">
      {/* Countdown / Milestone Card */}
      <div className="bg-gradient-to-r from-[#24082c] via-[#3a0a34] to-[#200628] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-3 border border-amber-500/30">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>🇹🇭 วันเกิดวันที่ 13 ตามเวลาประเทศไทย (Thailand ICT)</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Celebrating BB & Talha’s Special 13th
        </h3>
        <p className="text-xs sm:text-sm text-rose-200/80 max-w-lg mx-auto mb-6">
          คำนวณตามเวลาประเทศไทย (Bangkok Time, UTC+7) • สุขสันต์วันเกิดนะที่รัก
        </p>

        {countdown.isUnlocked ? (
          <div className="inline-block px-6 py-3 rounded-2xl bg-rose-600/30 border border-rose-400 text-rose-100 font-serif font-bold text-lg sm:text-xl shadow-lg">
            🎉 สุขสันต์วันเกิด! Today is BB’s 13th Celebration Day in Thailand! รักที่สุดในโลก! 🎉
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <div className="bg-[#120419] border border-rose-800/50 rounded-2xl p-3 min-w-[70px] sm:min-w-[85px]">
              <span className="font-serif text-2xl sm:text-3xl font-black text-amber-300 block">
                {countdown.days}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider font-semibold">
                วัน (Days)
              </span>
            </div>

            <div className="bg-[#120419] border border-rose-800/50 rounded-2xl p-3 min-w-[70px] sm:min-w-[85px]">
              <span className="font-serif text-2xl sm:text-3xl font-black text-amber-300 block">
                {countdown.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider font-semibold">
                ชม. (Hours)
              </span>
            </div>

            <div className="bg-[#120419] border border-rose-800/50 rounded-2xl p-3 min-w-[70px] sm:min-w-[85px]">
              <span className="font-serif text-2xl sm:text-3xl font-black text-amber-300 block">
                {countdown.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider font-semibold">
                นาที (Mins)
              </span>
            </div>

            <div className="bg-[#120419] border border-rose-800/50 rounded-2xl p-3 min-w-[70px] sm:min-w-[85px]">
              <span className="font-serif text-2xl sm:text-3xl font-black text-rose-400 block animate-pulse">
                {countdown.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-rose-300 uppercase tracking-wider font-semibold">
                วินาที (Secs)
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Love Message Board */}
      <div className="bg-[#15061d] border border-rose-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-500/40 flex items-center justify-center">
            <MessageSquareHeart className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Love Messages & Birthday Notes
            </h3>
            <p className="text-xs text-rose-300/80">
              Leave a sweet note for each other on this celebration board.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handlePostMessage} className="mb-8 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your Name (e.g. BB / Talha)"
              className="sm:w-1/3 bg-[#220a2e] border border-rose-700/40 rounded-xl px-3 py-2 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
            />
            <input
              type="text"
              required
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="Write a sweet love note, wish, or reply..."
              className="flex-1 bg-[#220a2e] border border-rose-700/40 rounded-xl px-4 py-2 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Note</span>
            </button>
          </div>
        </form>

        {/* Message Feed */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-2xl bg-[#1e0a29]/80 border border-rose-900/40 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-rose-600/30 border border-rose-500/40 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-xs text-amber-300">
                    {m.sender}
                  </span>
                  <span className="text-[10px] text-stone-400">{m.time}</span>
                </div>
                <p className="text-xs text-rose-100/90 leading-relaxed font-light">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Romantic Footer */}
      <footer className="mt-16 text-center text-xs text-rose-300/60 pb-16">
        <p className="font-serif text-sm text-rose-200 font-medium mb-1">
          Made with all the love in the universe by Talha for his forever queen BB ♥
        </p>
        <p className="text-[11px] text-rose-400/50">
          Happy Birthday • The 13th Celebration • You and Me Forever
        </p>
      </footer>
    </section>
  );
};
