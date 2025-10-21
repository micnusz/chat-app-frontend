"use server";

import AnimatedBalls from "@/components/AnimatedBalls";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
  return (
    <div>
      <AnimatedBalls />
      <HomePageClient />;
    </div>
  );
}
