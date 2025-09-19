import React, { useEffect } from 'react';
import video1 from '../voiceofnominated/Cátia Arnaut video.mp4';
import video2 from '../voiceofnominated/speaker video.mp4';
import video3 from '../voiceofnominated/Dawn chen video.mp4';

const VideosPage = () => {
  const videoSources = [video1, video2, video3];

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .video-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        padding: 20px;
        background-color: #fff;
      }

      @media (max-width: 1024px) {
        .video-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .video-grid {
          grid-template-columns: 1fr;
        }
      }

      .video-item {
        width: 100%;
        height: 220px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        object-fit: contain;
        background: #000; /* to prevent white gaps around video */
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="video-grid">
      {videoSources.map((src, index) => (
        <video key={index} src={src} controls className="video-item" />
      ))}
    </div>
  );
};

export default VideosPage;
