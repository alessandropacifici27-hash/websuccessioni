const LandlineIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Base body */}
    <rect x="3" y="12" width="18" height="9" rx="3" />
    {/* Handset resting on base */}
    <path d="M5 12V9c0-1 .5-2 1.5-2.5L9 5.5c.5-.2.5-.8.5-1.2V3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1.3c0 .4 0 1 .5 1.2l2.5 1C18.5 7 19 8 19 9v3" />
    {/* Rotary dial - outer ring */}
    <circle cx="12" cy="16.5" r="3.5" />
    {/* Rotary dial - center hole */}
    <circle cx="12" cy="16.5" r="1.2" />
    {/* Dial holes */}
    <circle cx="12" cy="13.8" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="14" cy="14.3" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="15.1" cy="16" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="18" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="12.8" cy="19.2" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="11.2" cy="19.2" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="9.5" cy="18" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="8.9" cy="16" r="0.4" fill="currentColor" stroke="none" />
    <circle cx="10" cy="14.3" r="0.4" fill="currentColor" stroke="none" />
    {/* Finger stop */}
    <line x1="14.8" y1="13.5" x2="15.8" y2="12.8" />
  </svg>
);

export default LandlineIcon;
