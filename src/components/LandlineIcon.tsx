const LandlineIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Handset */}
    <path d="M5 4c0-1 .8-2 2-2h2c.5 0 1 .3 1.2.7L11.5 6c.2.5 0 1-.3 1.3L9.5 9c.7 1.5 2 3 3.5 3.5l1.7-1.7c.3-.3.8-.5 1.3-.3l3.3 1.3c.4.2.7.7.7 1.2v2c0 1.2-1 2-2 2C10 17 4 11 4 5c0-.3 0-.7.1-1z" />
    {/* Base/cradle */}
    <rect x="3" y="19" width="18" height="3" rx="1.5" />
    <path d="M7 19v-1.5c0-.8.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5V19" />
  </svg>
);

export default LandlineIcon;
