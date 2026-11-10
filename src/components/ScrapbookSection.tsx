import React, { useState } from 'react';
import { Camera, Plus, Heart, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { getDefaultMemories } from '../utils/birthdayLogic.ts';
import { MemoryPhoto } from '../types/index.ts';
import { soundEngine } from '../utils/audio.ts';

export const ScrapbookSection: React.FC = () => {
  const [memories, setMemories] = useState<MemoryPhoto[]>(getDefaultMemories());
  const [selectedMemory, setSelectedMemory] = useState<MemoryPhoto | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding custom memory
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newPhoto: MemoryPhoto = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      date: newDate.trim() || 'Our Memory',
      caption: newCaption.trim() || 'Another unforgettable memory of BB and Talha.',
      imageUrl:
        newImageUrl.trim() ||
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      tag: 'Cherished',
    };

    setMemories([newPhoto, ...memories]);
    soundEngine.playSparkleSound();
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewCaption('');
    setNewImageUrl('');
  };

  return (
    <section id="scrapbook" className="py-20 px-4 max-w-7xl mx-auto relative z-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5 text-rose-400" />
            <span>Memories in Polaroid</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-white">
            Our Sweet <span className="text-rose-gradient">Love Scrapbook</span>
          </h2>
          <p className="text-rose-200/80 text-xs sm:text-sm mt-1">
            Golden chapters of BB & Talha’s journey together.
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playPopSound();
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white text-xs font-medium shadow-lg shadow-rose-950/60 flex items-center gap-2 transition cursor-pointer border border-rose-400/30"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Love Moment</span>
        </button>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {memories.map((photo, index) => {
          // Slight playful rotation for realistic Polaroid look
          const rotationClass =
            index % 3 === 0 ? '-rotate-1 hover:rotate-0' : index % 3 === 1 ? 'rotate-1 hover:rotate-0' : '-rotate-2 hover:rotate-0';

          return (
            <div
              key={photo.id}
              onClick={() => {
                soundEngine.playPopSound();
                setSelectedMemory(photo);
              }}
              className={`bg-[#fdfaf5] text-stone-900 p-4 pb-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-amber-900/10 ${rotationClass} relative group`}
            >
              {/* Little Red Push Pin */}
              <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-white mx-auto mb-3 shadow-md" />

              {/* Photo Image Frame */}
              <div className="w-full h-56 sm:h-64 rounded-lg overflow-hidden bg-stone-200 relative mb-4">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] text-white font-medium">
                  {photo.tag}
                </span>
              </div>

              {/* Polaroid Caption */}
              <div className="px-1 text-center">
                <h3 className="font-serif font-bold text-base text-stone-800">
                  {photo.title}
                </h3>
                <p className="text-[11px] text-amber-800 font-semibold tracking-wider uppercase mt-0.5">
                  {photo.date}
                </p>
                <p className="text-xs text-stone-600 font-serif italic mt-2 line-clamp-2">
                  “{photo.caption}”
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-200 flex items-center justify-center gap-1 text-[11px] text-rose-600">
                <Heart className="w-3 h-3 fill-rose-600" />
                <span>BB & Talha Forever</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Detail Memory Modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#180a22] border border-rose-500/40 rounded-2xl max-w-xl w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedMemory(null)}
              aria-label="Close photo preview"
              className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-rose-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-xl overflow-hidden max-h-80 w-full mb-4 bg-stone-950">
              <img
                src={selectedMemory.imageUrl}
                alt={selectedMemory.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold">
                {selectedMemory.date}
              </span>
              <h3 className="font-serif text-2xl font-bold text-rose-100 mt-1">
                {selectedMemory.title}
              </h3>
              <p className="text-sm text-rose-200/90 font-serif italic mt-3 max-w-md mx-auto">
                “{selectedMemory.caption}”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-900/40 flex items-center justify-between text-xs text-rose-400">
              <span>Dedicated with love by Talha</span>
              <button
                onClick={() => setSelectedMemory(null)}
                className="px-4 py-1.5 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-500 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Memory Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-[#180a22] border border-amber-500/40 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              aria-label="Cancel adding memory"
              className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-rose-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-amber-200 mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Add a Love Memory
            </h3>
            <p className="text-xs text-rose-300/80 mb-4">
              Add a sweet title, date, or photo URL to cherish forever.
            </p>

            <form onSubmit={handleAddMemory} className="space-y-3">
              <div>
                <label className="text-xs text-rose-200 font-medium block mb-1">
                  Memory Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Under the Paris Stars"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#240d32] border border-rose-700/50 rounded-xl px-3 py-2 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-rose-200 font-medium block mb-1">
                  Date / Occasion
                </label>
                <input
                  type="text"
                  placeholder="e.g. Our Anniversary, The 13th"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-[#240d32] border border-rose-700/50 rounded-xl px-3 py-2 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-rose-200 font-medium block mb-1">
                  Sweet Caption
                </label>
                <textarea
                  rows={2}
                  placeholder="What makes this moment special..."
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full bg-[#240d32] border border-rose-700/50 rounded-xl px-3 py-2 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs text-rose-200 font-medium block mb-1">
                  Photo URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-[#240d32] border border-rose-700/50 rounded-xl px-3 py-2 text-xs text-white placeholder-rose-400/40 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-stone-800 text-stone-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-medium shadow transition cursor-pointer"
                >
                  Save to Scrapbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
