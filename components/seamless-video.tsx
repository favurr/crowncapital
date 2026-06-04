// components/seamless-video.tsx
"use client";

import { useEffect, useRef, useState } from "react";

export function SeamlessVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration - video.currentTime < 0.05) {
        video.currentTime = 0;
        video.play();
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border bg-background">
      {!ready && <VideoSkeleton />}

      <video
        ref={videoRef}
        src="/video/hero-vid.mp4"
        autoPlay
        muted
        loop={false}
        playsInline
        onCanPlay={() => setReady(true)}
        className="relative z-10 aspect-[15/8] w-full object-cover rounded-2xl"
      />
    </div>
  );
}

export function VideoSkeleton() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="h-full w-full animate-pulse bg-muted" />
    </div>
  );
}
