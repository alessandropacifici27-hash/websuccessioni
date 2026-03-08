const LandlineIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Handset cord curve */}
    <path d="M6.5 3C5 5 4 7.5 4 10" />
    <path d="M17.5 3C19 5 20 7.5 20 10" />
    {/* Handset */}
    <path d="M4.5 2.5C4.5 1.7 5.2 1 6 1h1.5c.8 0 1.5.7 1.5 1.5V5c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V2.5z" />
    <path d="M15 2.5c0-.8.7-1.5 1.5-1.5H18c.8 0 1.5.7 1.5 1.5V5c0 .8-.7 1.5-1.5 1.5h-1.5C15.7 6.5 15 5.8 15 5V2.5z" />
    {/* Base */}
    <path d="M3 14c0-2.2 1.8-4 4-4h10c2.2 0 4 1.8 4 4v3c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4v-3z" />
    {/* Rotary dial */}
    <circle cx="12" cy="15.5" r="4" />
    <circle cx="12" cy="15.5" r="1.8" />
    {/* Dial finger stop */}
    <line x1="14.5" y1="12.5" x2="15.5" y2="11.8" />
  </svg>
);

export default LandlineIcon;