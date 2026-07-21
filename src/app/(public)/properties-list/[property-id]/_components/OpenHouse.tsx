"use client";
import { CalendarIcon } from "lucide-react";


interface OpenHouseProps {
  date?: string;
  time?: string;
  onRsvp?: () => void;
}

export function OpenHouse({
  date = "July 15",
  time = "2PM - 5PM",
  onRsvp,
}: OpenHouseProps) {
  return (
    <div className="rounded-2xl bg-primary-color p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.05)]">
      <div className="mb-6 flex items-center gap-2">
        <CalendarIcon className="text-white" />
        <h2 className="text-2xl font-bold text-white">Open House</h2>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-gray-300">Date</span>
        <span className="text-xl text-white">{date}</span>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <span className="text-gray-300">Time</span>
        <span className="text-xl text-white">{time}</span>
      </div>

      <button
        onClick={onRsvp}
        className="w-full rounded-full bg-white py-4 text-base font-medium text-primary-blue transition-opacity hover:opacity-90"
      >
        I'll Be There
      </button>
    </div>
  );
}