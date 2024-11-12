import React from 'react';
import { Heart, BadgeCheck } from 'lucide-react';
import type { Language } from '../config/language';

interface ReviewsProps {
  language: Language;
}

export default function Reviews({ language }: ReviewsProps) {
  return (
    <div className="border-t border-gray-200">
      <div className="p-4 space-y-4">
        <h3 className="font-semibold text-sm text-gray-900">
          {language.reviews.title}
        </h3>
        {language.reviews.items.map((review, index) => (
          <div key={index} className="flex space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
              {review.username[0].toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm">{review.username}</span>
                {review.verified && (
                  <BadgeCheck className="w-4 h-4 text-blue-500" />
                )}
              </div>
              <p className="text-sm mt-0.5">{review.content}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                <button className="flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{review.likes}</span>
                </button>
                <span>{review.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}