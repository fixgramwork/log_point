import React, { useState, useRef, useEffect } from "react";
import "./function.css";
import { Form } from "react-router-dom";

const Function = () => {
  const [sizeClass, setSizeClass] = useState("Function-small");
  const [squarePosition, setSquarePosition] = useState({ top: 0, left: 0 });
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [squareVisible, setSquareVisible] = useState(false);
  const containerRef = useRef(null);

  const changeFunction = () => {
    let parts = sizeClass.split("-");
    let size = parts[1];
    size = size === "small" ? "big" : "small";
    parts[1] = size;
    setSizeClass(parts.join("-"));
    setSquareVisible(size === "big");
  };

  const getRandomPosition = () => {
    const container = containerRef.current;
    if (!container) return { top: 0, left: 0 };

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const squareSize = 50;

    const left = Math.random() * (containerWidth - squareSize);
    const top = Math.random() * (containerHeight - squareSize);

    return { left, top };
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) return; // Already in fullscreen

    document.documentElement.requestFullscreen().catch((err) => {
      console.error("Failed to enter fullscreen mode:", err);
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        changeFunction();
        setButtonVisible(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [sizeClass]);

  const handleStartClick = () => {
    handleFullscreen();
    setSquarePosition(getRandomPosition());
    setButtonVisible(false);
    changeFunction();
  };

  const handleSquareClick = () => {
    setSquarePosition(getRandomPosition());
    setSquareVisible(true);
  };

  const handleMouseMove = (event) => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;

    const relativeX = mouseX - centerX;
    const relativeY = mouseY - centerY;

    setMousePosition({ top: relativeY, left: relativeX });
  };

  const handleClick = (event) => {
    console.log(`클릭한 위치: (${mousePosition.left}, ${mousePosition.top})`);
    const data = {
      x: mousePosition.left,
      y: mousePosition.top,
    };
  };

  return (
    <div className="Function-body">
      <div
        className={sizeClass}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {buttonVisible && (
          <button onClick={handleStartClick} className="Fuction-start">
            시작
          </button>
        )}
        {squareVisible && (
          <div
            className="Function-square"
            onClick={handleSquareClick}
            style={{
              display: "block",
              cursor: "pointer",
              position: "absolute",
              borderRadius: "80px",
              width: "50px",
              height: "50px",
              backgroundColor: "red",
              top: `${squarePosition.top}px`,
              left: `${squarePosition.left}px`,
            }}
          ></div>
        )}
        {!buttonVisible && (
          <div className="Mouse-position">
            마우스 위치: ({mousePosition.left},{Math.round(mousePosition.top)})
          </div>
        )}
      </div>
    </div>
  );
};

export default Function;
