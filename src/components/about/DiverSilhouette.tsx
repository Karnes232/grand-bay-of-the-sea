/** Decorative scuba-diver silhouette (horizontal swim pose, bubbles rising).
 *  Single currentColor fill/stroke so the parent's text-* class sets the color.
 *  No icon library ships a real diver silhouette, hence the hand-drawn SVG. */
const DiverSilhouette = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 240 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* bubbles */}
    <circle cx="214" cy="36" r="4.5" fill="currentColor" opacity="0.55" />
    <circle cx="223" cy="23" r="3.5" fill="currentColor" opacity="0.4" />
    <circle cx="230" cy="12" r="2.5" fill="currentColor" opacity="0.3" />

    {/* head */}
    <circle cx="200" cy="60" r="13" fill="currentColor" />

    {/* tank, laid along the back (round-capped stroke = pill, no transform
        so every SVG renderer places it identically) */}
    <path
      d="M142 56 L 183 47"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
    />

    {/* torso */}
    <path
      d="M194 66 Q 152 78 118 82"
      stroke="currentColor"
      strokeWidth="20"
      strokeLinecap="round"
    />

    {/* arm, bent down toward the chest */}
    <path
      d="M184 74 Q 166 94 148 99"
      stroke="currentColor"
      strokeWidth="9"
      strokeLinecap="round"
    />

    {/* legs in a scissor kick */}
    <path
      d="M118 82 Q 90 72 66 62"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />
    <path
      d="M118 82 Q 92 96 68 105"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="round"
    />

    {/* fins */}
    <path
      d="M68 64 Q 52 62 34 50 Q 28 46 26 50 Q 24 55 32 61 Q 48 72 64 72 Q 70 71 68 64 Z"
      fill="currentColor"
    />
    <path
      d="M70 102 Q 54 108 36 108 Q 29 108 30 113 Q 31 118 40 119 Q 58 120 72 112 Q 77 108 70 102 Z"
      fill="currentColor"
    />
  </svg>
)

export default DiverSilhouette
