export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-white text-slate-950 hover:bg-white/90 shadow-glow',
    ghost: 'bg-white/8 text-white hover:bg-white/14 border border-white/10',
    soft: 'bg-white/12 text-white hover:bg-white/18',
  };
  return (
    <button
      className={`rounded-2xl px-5 py-3 font-semibold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
