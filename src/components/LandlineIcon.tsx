const LandlineIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Rotary dial base */}
    <ellipse cx="12" cy="16" rx="10" ry="5" />
    {/* Dial circle */}
    <circle cx="12" cy="15" r="4" />
    {/* Finger holes on dial */}
    <circle cx="12" cy="12.2" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="14.2" cy="13" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="14.2" cy="17" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17.8" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="9.8" cy="17" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="9" cy="15" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="9.8" cy="13" r="0.6" fill="currentColor" stroke="none" />
    {/* Handset resting on top */}
    <path d="M4 11.5c0-2.5 1.5-5 3.5-6.5C9 3.8 10.5 3 12 3s3 .8 4.5 2c2 1.5 3.5 4 3.5 6.5" strokeWidth="2.2" />
    {/* Earpiece & mouthpiece */}
    <rect x="2.5" y="10" width="3.5" height="4" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
    <rect x="18" y="10" width="3.5" height="4" rx="1.5" fill="currentColor" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

export default LandlineIcon;