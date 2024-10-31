import React, { useState, useRef, useEffect, useCallback } from "react";
import "../function/function.css";

const Function = () => {
  const [sizeClass, setSizeClass] = useState("Function-small");
  const [squarePosition, setSquarePosition] = useState({ top: 0, left: 0 });
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [squareVisible, setSquareVisible] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const containerRef = useRef(null);

  const changeFunction = useCallback(() => {
    let parts = sizeClass.split("-");
    let size = parts[1];
    size = size === "small" ? "big" : "small";
    parts[1] = size;
    setSizeClass(parts.join("-"));
    setSquareVisible(size === "big");
  }, [sizeClass]);

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

  const setInitialPosition = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const squareSize = 50;

    // 중앙 위치 계산
    const left = (containerWidth - squareSize) / 2;
    const top = (containerHeight - squareSize) / 2;

    setSquarePosition({ left, top });
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) return;

    document.documentElement.requestFullscreen().catch((err) => {
      console.error("Failed to enter fullscreen mode:", err);
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setInitialPosition();
      if (!document.fullscreenElement) {
        changeFunction();
        setButtonVisible(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [changeFunction]);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 중앙 위치 설정
    setInitialPosition();
  }, []);

  const handleStartClick = () => {
    handleFullscreen();
    setButtonVisible(false);
    changeFunction();
  };

  const handleSquareClick = () => {
    setCursorHidden(true); // 원 클릭 시 커서 숨기기
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
    console.log(data);
  };

  return (
    <div className="Function-body">
      <div
        className={sizeClass}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{ cursor: cursorHidden ? "none" : "default" }} // 커서 숨기기
      >
        {buttonVisible && (
          <button onClick={handleStartClick} className="Function-start">
            시작
          </button>
        )}
        {squareVisible && (
          <div
            className="Function-square"
            onClick={handleSquareClick}
            style={{
              display: "block",
              cursor: "none",
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
