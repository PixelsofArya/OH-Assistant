export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="px-5 py-5 border-b border-white/10">
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="text-white/60 text-sm sm:text-base mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}
