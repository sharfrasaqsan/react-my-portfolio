import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = ({ size = 50, color = "#f97316" }) => {
  return (
    <div className="loading-wrapper" style={styles.wrapper}>
      <ClipLoader size={size} color={color} />
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10rem",
  },
};

export default Loading;
