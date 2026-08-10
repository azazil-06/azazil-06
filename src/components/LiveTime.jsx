import { useState, useEffect } from "react";

export default function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Update time on the client side only to prevent SSR hydration mismatch
    const updateTime = () => {
      const now = new Date();
      // Use local timezone of the user viewing the site
      setTime(
        now.toLocaleTimeString(undefined, {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="w-[85px]" />; // Placeholder to prevent layout shift

  return (
    <div className="hidden font-mono text-[10px] tracking-[0.1em] text-foreground/60 md:block">
      {time}
    </div>
  );
}
