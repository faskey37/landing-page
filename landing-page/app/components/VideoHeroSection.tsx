'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHeadset, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

interface VideoHeroSectionProps {
  videoSrc?: string;
  posterSrc?: string;
  onButton1Click?: () => void;
  onButton2Click?: () => void;
}

const VideoHeroSection: React.FC<VideoHeroSectionProps> = ({
  videoSrc = "/videos/hero-video.mp4",
  posterSrc = "/images/poster.jpg",
  onButton1Click,
  onButton2Click
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="relative w-full h-[90vh] min-h-[600px]">

      {/* 🎬 VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {!videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover select-none"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            onError={handleVideoError}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${posterSrc})` }}
          />
        )}

        {/* 🔥 DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60 z-10" />
      </div>

      {/* 🧾 CONTENT */}
      <div className="relative z-20 flex items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <span className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm mb-6 border border-white/20 text-white">
            Career Launcher Pune (Undri)
          </span>

          {/* 🔥 UPDATED HIGH-CONVERSION HEADING */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            Crack CAT, CLAT & IPMAT with
            <span className="block text-orange-500">
              Expert Coaching in Pune
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-200 text-lg mb-8">
            Free Demo • Personal Mentorship • Proven Results
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.button
              onClick={onButton1Click}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Free Demo Class
            </motion.button>

            <motion.button
              onClick={onButton2Click}
              className="bg-white/10 border border-white/30 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHeadset /> Talk to Expert
            </motion.button>
          </div>

          {/* Trust */}
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-sm text-gray-200">
              ⭐ Trusted by 10,000+ Students
            </span>
          </div>
        </motion.div>
      </div>

      {/* 🔊 Volume Toggle */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-30 bg-black/50 p-3 rounded-full hover:bg-black/70 transition"
      >
        {isMuted ? (
          <FaVolumeMute className="text-white" />
        ) : (
          <FaVolumeUp className="text-white" />
        )}
      </button>
    </div>
  );
};

export default VideoHeroSection;