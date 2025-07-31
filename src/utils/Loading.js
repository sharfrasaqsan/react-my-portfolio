import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const messages = ["Loading", "Please wait...", "Almost there!"];

const Loading = ({ size = 50, color = "#f97316" }) => {
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
    <div className="loading-wrapper" style={styles.wrapper}>
      <ClipLoader size={size} color={color} />
      <p style={styles.text}>{displayText}</p>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
  },
  text: {
    marginTop: "1rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#f97316",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
  },
};

export default Loading;
