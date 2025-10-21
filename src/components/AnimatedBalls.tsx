"use client";

export default function AnimatedBalls() {
  return (
    <div className="background">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="ball" />
      ))}
    </div>
  );
}
