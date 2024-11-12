import React, { useRef, useState } from 'react';
import { Gift, Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import PrizeWheel from './components/PrizeWheel';
import WinningModal from './components/WinningModal';
import Confetti from './components/Confetti';
import Reviews from './components/Reviews';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const language = useLanguage();
  const spinRef = useRef<() => void>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentPrize, setCurrentPrize] = useState({ prize: '', description: '' });

  const handleWin = (prize: string, description: string, isFirstSpin: boolean) => {
    setCurrentPrize({ prize, description });
    setShowModal(true);
    if (!isFirstSpin && prize !== 'TRY AGAIN' && prize !== 'INTENTAR DE NUEVO') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  };

  const handleClaim = () => {
    window.open(language.modal.claimUrl, '_blank', 'noopener,noreferrer');
  };

  const handleTryAgain = () => {
    setShowModal(false);
    setTimeout(() => {
      if (spinRef.current) {
        spinRef.current();
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <main className="flex-1 max-w-[470px] w-full mx-auto pt-4 pb-8">
        <article className="bg-white border border-gray-200 mb-4">
          {/* Post Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm">{language.post.username}</p>
                <p className="text-xs text-gray-500">{language.post.sponsored}</p>
              </div>
            </div>
            <button className="text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Prize Wheel */}
          <div className="flex justify-center p-4">
            <PrizeWheel
              onWin={handleWin}
              spinRef={spinRef}
              language={language}
            />
          </div>

          {/* Post Actions */}
          <div className="px-4 py-2 flex justify-between">
            <div className="flex space-x-4">
              <button className="text-gray-800">
                <Heart className="w-6 h-6" />
              </button>
              <button className="text-gray-800">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="text-gray-800">
                <Send className="w-6 h-6" />
              </button>
            </div>
            <button className="text-gray-800">
              <Bookmark className="w-6 h-6" />
            </button>
          </div>

          {/* Post Info */}
          <div className="px-4 py-2">
            <p className="font-semibold text-sm">{language.post.likes}</p>
            <p className="text-sm mt-1">
              <span className="font-semibold">{language.post.username}</span>{' '}
              {language.post.caption}
            </p>
            <p className="text-xs text-gray-500 mt-1">{language.post.timeAgo}</p>
          </div>

          {/* Comment Input */}
          <div className="border-t border-gray-200 px-4 py-3 flex items-center">
            <input
              type="text"
              placeholder={language.post.commentPlaceholder}
              className="flex-1 text-sm outline-none"
            />
            <button className="text-[#0095F6] font-semibold text-sm">
              {language.post.postButton}
            </button>
          </div>

          {/* Reviews */}
          <Reviews language={language} />
        </article>
      </main>

      <WinningModal
        prize={currentPrize.prize}
        description={currentPrize.description}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onClaim={handleClaim}
        onTryAgain={handleTryAgain}
        language={language}
      />
      
      <Confetti isActive={showConfetti} />
    </div>
  );
}