export default function Hero({ greeting }) {
  return (
    <div className="hero">
      <div>
        <h1>{greeting}, <span>Melissa</span> 👋</h1>
        <p>Here’s what’s happening with your tasks today.</p>
      </div>
      <svg className="blob" viewBox="0 0 380 150">
        <path d="M40 150C20 90 80 40 150 60S260 0 320 30s70 70 40 120z" fill="#CFDAFF" opacity=".7" />
        <path d="M200 150c10-60 70-90 130-60s40 60 20 60z" fill="#4C7DFF" opacity=".75" />
        <rect x="130" y="30" width="110" height="120" rx="10" fill="#fff" stroke="#3B63E8" strokeWidth="5" />
        <rect x="164" y="20" width="42" height="20" rx="8" fill="#1F4FE0" />
        <path d="M150 62l8 8 14-16M150 92l8 8 14-16M150 122l8 8 14-16" stroke="#3B63E8" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M184 62h40M184 92h40M184 122h30" stroke="#9DB4FF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="235" cy="115" r="30" fill="#fff" stroke="#1F3CB5" strokeWidth="6" />
        <path d="M235 98v18l12 8" stroke="#1F3CB5" strokeWidth="5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}