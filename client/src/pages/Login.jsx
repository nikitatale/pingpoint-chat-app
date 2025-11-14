import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";
import { Bell } from "lucide-react";
import notificationBell from "../assets/NotificationBell.mp3"

const Stars = ({ count = 5 }) => (
  <div className="flex">
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className="size-4 md:size-4.5 text-transparent fill-amber-500"
        />
      ))}
  </div>
);

const Login = () => {

  const [showTip, setShowTip] = useState(false);

  const playSound = () => {
  const audio = new Audio(notificationBell);
  audio.volume = 0.25;
  audio.play();
};

  const handleBellClick = () => {
    playSound();
    setShowTip(true);
    setTimeout(() => setShowTip(false), 1500); 
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative overflow-hidden">
      {/* Background */}
      <img
        src={assets.bgImage}
        alt="Background"
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      />

      {/* Left Section */}
      <div className="flex-1 flex flex-col items-start justify-between p-6 md:p-10 lg:pl-40">
        <h3 className="text-purple-400 font-semibold text-2xl">
          <img src={assets.logo} alt="" width={170} />
        </h3>

        <div className="mt-4">
          <h1
            className="text-4xl md:text-6xl font-bold text-[#ffffff] "
            style={{ lineHeight: "1.2" }}
          >
            Talk Smarter <br /> Respond{" "}
            <span className="text-[#9eabd1] bg-gradient-to-r from-[#111B3D] to-[#394b88] rounded-2xl">
              Faster
            </span>{" "}
            <br />{" "}
            <span className="text-[#9eabd1] bg-gradient-to-r from-[#394b88] to-[#111B3D] rounded-2xl">
              Connect
            </span>{" "}
            Deeper
          </h1>

          <p className="text-base text-[#CBD5E1] max-w-72 md:max-w-md mt-2">
            Real-time, seamless communication that brings your friends & family
            closer - Visually and instantly.
          </p>

          <div className="mt-2">
            <Stars />
          </div>
        </div>

      <button
      type="button"
      className="md:px-7 px-8 py-4 mt-7 text-white 
      bg-gradient-to-r from-[#111B3D] to-[#394b88] 
      hover:from-[#394b88] hover:to-[#111B3D]
      transition-all cursor-pointer rounded-md rounded-l-none
      inline-flex items-center gap-2"
    >
      <span className="text-lg font-medium">Stay Tuned</span>

      <div className="relative">
        <Bell
          size={18}
          strokeWidth={2}
          className="opacity-90 hover:opacity-100 transition cursor-pointer hover:text-amber-400"
          onClick={handleBellClick}
        />

        {showTip && (
          <span
            className="absolute left-1/2 -translate-x-1/2 top-full mt-1
            px-2 py-1 text-xs rounded-md
            bg-black/70 text-white whitespace-nowrap
            opacity-100 scale-100 transition-all"
          >
            New Features Launching Soon
          </span>
        )}
      </div>
    </button>

        <span className="md:h-10"></span>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <SignIn
          appearance={{
            elements: {
              rootBox: "p-6 rounded-xl shadow-md  text-white",
              card: "bg-gray-900 shadow-xl rounded-2xl",
              headerTitle: "text-2xl font-bold bg-clip-text text-transparent",
              headerSubtitle: "text-gray-400",
              formFieldInput:
                "border  text-white rounded-lg focus:ring-2 focus:ring-blue-500",
              formButtonPrimary:
                " text-[#4BC1C8] font-semibold py-2 rounded-lg hover:opacity-90 transition-all",
              socialButtonsBlockButton: " text-white border hover:bg-gray-700",
              footerActionLink: "text-blue-400 hover:underline",
            },
            variables: {
              colorPrimary: "#111B3D ",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Login;


