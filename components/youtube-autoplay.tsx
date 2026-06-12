
'use client'; 

import React from 'react';

/**
 * Interface defining the props for the YouTubeAutoplay component.
 */
interface YouTubeAutoplayProps {
  /** The YouTube video ID (e.g., 'dQw4w9WgXcQ'). */
  videoId: string;
  /** Optional CSS class for styling the container div. */
  className?: string;
}

/**
 * Renders an autoplaying, muted, loopable YouTube video without controls.
 * Uses specific URL parameters to enforce desired behavior.
 */
export default function YouTubeAutoplay({ videoId, className = '' }: YouTubeAutoplayProps) {
  
  // Construct the YouTube embed URL with necessary parameters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?`;
  
  // URLSearchParams is used to cleanly manage and encode the parameters
  const params = new URLSearchParams({
    // 1. **autoplay**: Starts the video automatically
    autoplay: '1',
    // 2. **mute**: Required for autoplay in most modern browsers
    mute: '1',
    // 3. **controls**: Removes all video controls
    controls: '0',
    // 4. **showinfo**: Hides video title and uploader info
    showinfo: '0',
    // 5. **loop**: Loops the video continuously
    loop: '1',
    // 6. **playlist**: Required for the 'loop' parameter to work correctly
    playlist: videoId,
    // 7. **modestbranding**: Shows only a minimal YouTube logo
    modestbranding: '1',
    // 8. **disablekb**: Disables keyboard controls
    disablekb: '1',
    // 9. **iv_load_policy**: Don't show video annotations
    iv_load_policy: '3',
    // 10. **rel**: Prevents showing related videos at the end
    rel: '0',
  });

  return (
    <div className={`w-full h-full overflow-hidden ${className}`}>
      <iframe
        className="w-full h-full"
        src={`${embedUrl}${params.toString()}`}
        title="YouTube video player"
        frameBorder="0"
        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="eager" // Load video quickly
      />
    </div>
  );
}