/**
 * Flat, hand-cut doodles in the spirit of a folk picture book: our own shapes in a warm
 * gouache palette, not traced from Cai Gao's illustrations.
 */
export const INK = {
  vermilion: "#cf4a2f",
  ochre: "#e2a63b",
  leaf: "#5f8a3c",
  indigo: "#3f5f8f",
  blush: "#eaa08f",
  cream: "#fdf8ee",
};

export function Flower({ color = INK.vermilion, center = INK.ochre }: { color?: string; center?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="20" cy="10.5" rx="6" ry="9" fill={color} transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="5.5" fill={center} />
      <circle cx="18.5" cy="18.5" r="1.4" fill={INK.cream} opacity="0.7" />
    </svg>
  );
}

export function Leaf({ color = INK.leaf }: { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M5 33 C 9 15, 24 6, 36 5 C 34 19, 22 33, 5 33 Z" fill={color} />
      <path d="M8 31 C 16 23, 25 14, 33 8" fill="none" stroke={INK.cream} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function Bird() {
  return (
    <svg viewBox="0 0 48 40" aria-hidden="true">
      <path d="M6 22 L0 15 L3 26 Z" fill={INK.indigo} />
      <ellipse cx="22" cy="23" rx="16" ry="11" fill={INK.indigo} />
      <path d="M14 21 C 20 13, 30 15, 31 22 C 25 25, 18 25, 14 21 Z" fill="#2f4870" />
      <circle cx="35" cy="15" r="7.5" fill={INK.indigo} />
      <path d="M41.5 14 L48 16.5 L41.5 18 Z" fill={INK.ochre} />
      <circle cx="36.5" cy="13.5" r="1.6" fill={INK.cream} />
      <circle cx="36.8" cy="13.6" r="0.8" fill="#1d1d1d" />
      <ellipse cx="27" cy="27" rx="6" ry="3" fill={INK.blush} opacity="0.85" />
      <path d="M20 33 L19 38 M25 33 L25 38" stroke={INK.ochre} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Dots({ color = INK.ochre }: { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="10" cy="12" r="3" fill={color} />
      <circle cx="26" cy="8" r="2.2" fill={color} />
      <circle cx="20" cy="24" r="2.6" fill={color} />
      <circle cx="32" cy="22" r="1.8" fill={color} />
    </svg>
  );
}
