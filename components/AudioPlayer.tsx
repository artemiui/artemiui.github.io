import React from 'react';

interface AudioPlayerProps {
  src: string;
  type?: string;
  caption?: string;
  className?: string;
}

export default function AudioPlayer({ 
  src, 
  type = "audio/mpeg", 
  caption,
  className = "" 
}: AudioPlayerProps) {
  return (
    <div className={`my-6 flex flex-col gap-2 ${className}`}>
      <audio controls className="w-full">
        <source src={src} type={type} />
        Your browser does not support the audio element.
      </audio>
      {caption && (
        <p className="text-sm text-zinc-500 text-center italic">
          {caption}
        </p>
      )}
    </div>
  );
}