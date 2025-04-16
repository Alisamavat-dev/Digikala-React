import ReactPlayer from "react-player";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const Videoj = ({ videos, videosetter, videoUrl }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (videos && videoUrl) {
      setIsPlaying(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsPlaying(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      setIsPlaying(false);
    };
  }, [videos, videoUrl]);

  const handleClose = () => {
    setIsPlaying(false);
    videosetter(false);
    if (playerRef.current) {
      playerRef.current.seekTo(0);
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    videosetter(false);
  };

  if (!videoUrl || !videos) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 transition-all duration-300">
      <div className="relative w-[300px] h-[600px] mx-auto">
        <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black">
          <ReactPlayer
            ref={playerRef}
            url={videoUrl}
            width="100%"
            height="100%"
            playing={isPlaying}
            muted={isMuted}
            controls={true}
            light={false}
            className="absolute inset-0"
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            config={{
              file: {
                attributes: {
                  controlsList: "nodownload",
                  disablePictureInPicture: true,
                },
                forceVideo: true,
              },
            }}
            onError={(e) => {
              console.error("Video Error:", e);
              handleClose();
            }}
          />

          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videoj;
