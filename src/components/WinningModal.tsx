import React from 'react';
import { Trophy, AlertCircle } from 'lucide-react';
import type { Language } from '../config/language';

interface WinningModalProps {
  prize: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  onTryAgain: () => void;
  language: Language;
}

export default function WinningModal({ 
  prize, 
  description, 
  isOpen, 
  onClose, 
  onClaim, 
  onTryAgain,
  language 
}: WinningModalProps) {
  if (!isOpen) return null;

  const isTryAgain = prize === 'TRY AGAIN' || prize === 'INTENTAR DE NUEVO';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden animate-slide-up sm:animate-scale-up">
        <div className="p-6 text-center space-y-4">
          <div className="flex justify-center">
            <div className={`${isTryAgain ? 'bg-gradient-to-tr from-[#833AB4] to-[#E1306C]' : 'bg-gradient-to-tr from-yellow-400 to-pink-500'} p-4 rounded-full`}>
              {isTryAgain ? (
                <AlertCircle className="w-12 h-12 text-white" />
              ) : (
                <Trophy className="w-12 h-12 text-white" />
              )}
            </div>
          </div>
          
          {isTryAgain ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900">{language.modal.notThisTime}</h2>
              <div className="bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white py-4 px-6 rounded-xl">
                <p className="text-lg">{description}</p>
              </div>
              <button
                onClick={onTryAgain}
                className="w-full bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white py-3 px-4 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {language.modal.tryAgainButton}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-gray-900">{language.modal.congratsTitle}</h2>
              <p className="text-gray-600">{language.modal.stepCloser}</p>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl">
                <p className="text-3xl font-bold">{prize}</p>
                <p className="text-sm mt-1 opacity-90">{description}</p>
              </div>
              <a
                href={language.modal.claimUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-[#0095F6] text-white py-3 px-4 rounded-lg font-bold text-sm hover:bg-[#1877F2] transition-colors text-center uppercase tracking-wide"
              >
                {language.modal.claimNowButton}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}