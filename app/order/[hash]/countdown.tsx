"use client";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";

export default function ({ endTime, children }) {
  return (
    <FlipClockCountdown to={endTime} renderMap={[false, true, true, true]}>
      {children}
    </FlipClockCountdown>
  );
}
