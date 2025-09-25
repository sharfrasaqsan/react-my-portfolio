import React, { useState, useEffect } from "react";

const messages = ["Loading", "Please wait...", "Almost there!"];

const Loading = () => {
  const [displayText, setDisplayText] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    const interval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayText((prev) => prev + currentMessage[charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDisplayText("");
          setCharIndex(0);
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 1000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [charIndex, messageIndex]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 glass"
      style={{ zIndex: 1050 }}
    >
      <div
        className="spinner-border text-primary mb-3"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      />
      <p className="fw-semibold text-primary-emphasis fs-5 font-monospace">
        {displayText}
      </p>
    </div>
  );
};

export default Loading;
