export default function Marquee({ items, reverse = false, separator = "•" }) {
  const track = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="marquee relative z-10 overflow-hidden border-y border-rule py-4"
    >
      <div className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}>
        {track.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-6 font-display text-xl uppercase tracking-[0.08em] text-foreground md:text-3xl"
          >
            <span>{item}</span>
            <span className="text-accent text-sm">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
