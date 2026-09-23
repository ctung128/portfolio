"use client";

const PLAYBACK_RATE = 1.25;

function setPlaybackRate(video: HTMLVideoElement | null) {
  if (video) video.playbackRate = PLAYBACK_RATE;
}

function StatusBarIcons() {
  return (
    <div className="flex items-center gap-[5px]">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
        <rect x="0" y="7" width="3" height="5" rx="0.75" fill="white" />
        <rect x="4.5" y="5" width="3" height="7" rx="0.75" fill="white" />
        <rect x="9" y="3" width="3" height="9" rx="0.75" fill="white" />
        <rect x="13.5" y="0" width="3" height="12" rx="0.75" fill="white" />
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
        <path
          d="M8 10.2a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z"
          fill="white"
        />
        <path
          d="M4.8 6.6a4.6 4.6 0 0 1 6.4 0"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M2.2 3.9a8.4 8.4 0 0 1 11.6 0"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
        <rect
          x="0.75"
          y="0.75"
          width="20.5"
          height="10.5"
          rx="2.5"
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <rect x="2.25" y="2.25" width="17.5" height="7.5" rx="1.5" fill="white" />
        <rect x="22.5" y="4" width="1.8" height="4" rx="0.9" fill="white" fillOpacity="0.5" />
      </svg>
    </div>
  );
}

type Variant = "13-pro" | "15-pro";

const VARIANT_STYLES: Record<
  Variant,
  { frameRadius: string; bezelRadius: string; screenRadius: string }
> = {
  "13-pro": {
    frameRadius: "rounded-[2.6rem]",
    bezelRadius: "rounded-[2.45rem]",
    screenRadius: "rounded-[1.9rem]",
  },
  "15-pro": {
    frameRadius: "rounded-[3.1rem]",
    bezelRadius: "rounded-[2.95rem]",
    screenRadius: "rounded-[2.35rem]",
  },
};

export function IPhoneMockup({
  videoSrc,
  poster,
  alt,
  className,
  sizeClassName = "w-[240px] sm:w-[270px] md:w-[300px]",
  showStatusBar = false,
  variant = "15-pro",
}: {
  videoSrc: string;
  poster?: string;
  alt: string;
  className?: string;
  sizeClassName?: string;
  /** Draw a synthetic status bar + notch/Dynamic Island over the video. Leave
   * off (default) when the source footage is a real device recording that
   * already shows its own status bar/notch. */
  showStatusBar?: boolean;
  /** Which device to render. iPhone 13 Pro has a notch; iPhone 15 Pro has a
   * Dynamic Island. Pick the one that matches the source recording. */
  variant?: Variant;
}) {
  const isThirteen = variant === "13-pro";
  const { frameRadius, bezelRadius, screenRadius } = VARIANT_STYLES[variant];

  return (
    <div className={`relative aspect-[9/19.5] ${sizeClassName} ${className ?? ""}`}>
      {/* Titanium frame */}
      <div
        className={`absolute inset-0 ${frameRadius} bg-gradient-to-b from-[#4a4a4d] via-[#2c2c2e] to-[#1c1c1e] p-[3px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] ring-1 ring-black/30`}
      >
        <div className={`h-full w-full ${bezelRadius} bg-black p-[10px]`}>
          {/* Screen */}
          <div className={`relative h-full w-full overflow-hidden ${screenRadius} bg-black`}>
            <video
              ref={setPlaybackRate}
              className="absolute inset-0 h-full w-full object-cover"
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={alt}
              onLoadedMetadata={(e) => setPlaybackRate(e.currentTarget)}
            />

            {showStatusBar && (
              <>
                {/* Status bar */}
                <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-[1.6rem] pt-[0.65rem]">
                  <span className="font-sans text-[13px] font-semibold tracking-tight text-white">
                    9:41
                  </span>
                  <StatusBarIcons />
                </div>

                {isThirteen ? (
                  /* Notch */
                  <div className="absolute inset-x-0 top-0 z-20 mx-auto h-[26px] w-[108px] rounded-b-[1.1rem] bg-black" />
                ) : (
                  /* Dynamic Island */
                  <div className="absolute left-1/2 top-[0.55rem] z-20 h-[26px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {isThirteen ? (
        <>
          {/* Mute switch */}
          <span className="absolute -left-[3px] top-[11%] h-[3.2%] w-[3px] rounded-l-sm bg-[#3a3a3c]" />
          {/* Volume buttons */}
          <span className="absolute -left-[3px] top-[17.5%] h-[6.5%] w-[3px] rounded-l-sm bg-[#3a3a3c]" />
          <span className="absolute -left-[3px] top-[25.5%] h-[6.5%] w-[3px] rounded-l-sm bg-[#3a3a3c]" />
          {/* Power button */}
          <span className="absolute -right-[3px] top-[19%] h-[9%] w-[3px] rounded-r-sm bg-[#3a3a3c]" />
        </>
      ) : (
        <>
          {/* Action button */}
          <span className="absolute -left-[3px] top-[13.2%] h-[3.7%] w-[3px] rounded-l-sm bg-[#3a3a3c]" />
          {/* Volume buttons */}
          <span className="absolute -left-[3px] top-[19.1%] h-[6.8%] w-[3px] rounded-l-sm bg-[#3a3a3c]" />
          <span className="absolute -left-[3px] top-[27.1%] h-[6.8%] w-[3px] rounded-l-sm bg-[#3a3a3c]" />
          {/* Power button */}
          <span className="absolute -right-[3px] top-[21.5%] h-[9.8%] w-[3px] rounded-r-sm bg-[#3a3a3c]" />
        </>
      )}
    </div>
  );
}
