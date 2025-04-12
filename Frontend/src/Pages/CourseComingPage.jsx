import React, { useEffect, useState } from "react";

const CourseComingPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  // Set your course launch date here
  const launchDate = new Date("2025-04-30T12:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((difference / 1000 / 60) % 60);
        const secs = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, mins, secs });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-white px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">🚀 New Course Launching Soon!</h1>
      <p className="text-lg md:text-xl mb-8 max-w-xl">
        We're working hard to bring you an amazing learning experience. Stay tuned!
      </p>

      <div className="flex gap-6 text-center text-2xl font-semibold">
        <div>
          <div>{timeLeft.days}</div>
          <div className="text-sm">Days</div>
        </div>
        <div>
          <div>{timeLeft.hours}</div>
          <div className="text-sm">Hours</div>
        </div>
        <div>
          <div>{timeLeft.mins}</div>
          <div className="text-sm">Minutes</div>
        </div>
        <div>
          <div>{timeLeft.secs}</div>
          <div className="text-sm">Seconds</div>
        </div>
      </div>

      <button className="mt-10 px-6 py-3 bg-white text-indigo-700 font-semibold rounded-2xl hover:bg-indigo-100 transition duration-300">
        Notify Me
      </button>
    </div>
  );
};

export default CourseComingPage;

