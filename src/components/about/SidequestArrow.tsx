/**
 * Hand-drawn matcha arrow from the empty photo slot to the first sidequest.
 * The tail rises from the slot's top centre (the svg's right edge sits on the
 * slot's centre line), doodles a little loop, then runs left to a head beside
 * the first line. Hovering the slot (its `group`) redraws it, tail to head.
 */
export function SidequestArrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 122 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute -top-[36px] right-[calc(50%-2px)] h-10 w-[122px] text-matcha"
    >
      <path
        pathLength={1}
        strokeDasharray="1"
        className="group-hover:animate-[arrow-draw_650ms_cubic-bezier(0.5,0,0.3,1)_both] motion-reduce:!animate-none"
        d="M120 36.5 C120 29 116.5 22.5 110.5 22.5 C104.5 22.5 104.5 30.5 109.5 29 C115 27.5 111.5 15 97 11.5 C80 7.5 32 9.4 6.5 10.4"
      />
      <path
        pathLength={1}
        strokeDasharray="1"
        className="group-hover:animate-[arrow-draw_250ms_ease-out_550ms_both] motion-reduce:!animate-none"
        d="M13.5 4.6 C10.8 6.6 8.4 8.6 5.6 10.5 C8.9 12 11.4 13.8 13.8 16.2"
      />
    </svg>
  );
}
