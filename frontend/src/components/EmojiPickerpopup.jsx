
import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'; 
import { LuImage, LuX } from 'react-icons/lu'; 

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-5">
      <div
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
          {icon ? (
            <img src={icon} alt="Icon" className="w-full h-full object-cover" />
          ) : (
            <LuImage className="text-xl text-gray-500" />
          )}
        </div>
        <p className="text-sm mt-1 text-gray-600">
          {icon ? 'Change Icon' : 'Pick Icon'}
        </p>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 bg-white border rounded-lg shadow-lg z-50 p-2">
          <button
            className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emojiData) => {
              onSelect(emojiData?.imageUrl || emojiData?.emoji);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
