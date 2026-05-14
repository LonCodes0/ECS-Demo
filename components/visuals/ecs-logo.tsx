export function EcsLogo() {
  return (
    <div className="relative h-12 w-12 rounded-[1.35rem] bg-[radial-gradient(circle_at_top,#173a28_0%,#07130e_68%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 39.6C18 26 26.6 15 40.2 10c2.1 8.7 0 18.4-6.2 25.4-5.8 6.5-14.1 10.4-22.3 10 1.2-2.6 3.2-4.4 6.3-5.8Z"
          fill="url(#leaf-main)"
        />
        <path
          d="M31 46.8c-.1-8.2 5.7-16.2 14.8-20.4 4.3 8.2 3.8 16.5-.6 22.7-4.2 5.7-11.6 8.8-18.8 7.6 2-3.8 2.8-6.1 4.6-9.9Z"
          fill="url(#leaf-secondary)"
        />
        <defs>
          <linearGradient id="leaf-main" x1="11.7" y1="12.2" x2="44.6" y2="45.3">
            <stop stopColor="#58D968" />
            <stop offset="1" stopColor="#169247" />
          </linearGradient>
          <linearGradient id="leaf-secondary" x1="28.6" y1="28.6" x2="48.7" y2="57.8">
            <stop stopColor="#A9F37E" />
            <stop offset="1" stopColor="#34B46B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
