import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios"; // Axios import 추가
import "../function/function.css";

const Function = () => {
  const [sizeClass, setSizeClass] = useState("Function-small");
  const [squarePosition, setSquarePosition] = useState({ top: 0, left: 0 });
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [cursorHidden, setCursorHidden] = useState(false); // 기본적으로 커서를 보이게 설정
  const [squareVisible, setSquareVisible] = useState(false);
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

    const randomOffsetX = Math.random() * (containerWidth - squareSize);
    const randomOffsetY = Math.random() * (containerHeight - squareSize);

    return { left: randomOffsetX, top: randomOffsetY };
  };

  const setInitialPosition = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const squareSize = 50;

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
    setInitialPosition();
  }, []);

  const handleStartClick = () => {
    handleFullscreen();
    setButtonVisible(false);
    changeFunction();
    setCursorHidden(true); // 시작 후 커서 숨김
  };

  const handleSquareClick = async () => {
    const newPosition = getRandomPosition();
    setSquarePosition(newPosition);
    setSquareVisible(true);

    console.log(`클릭한 위치: (${mousePosition.left}, ${mousePosition.top})`);
    console.log(`생성된 원의 위치: (${newPosition.left}, ${newPosition.top})`);

    // Axios를 사용하여 백엔드로 데이터 전송
    try {
      const response = await axios.post('http://10.150.151.143:8080/your-endpoint', {
        clickPosition: { left: mousePosition.left, top: mousePosition.top },
        squarePosition: newPosition
      });
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('데이터 전송 오류:', error);
    }

    // 커서를 잠시 보이게 함
    setCursorHidden(false);
    setTimeout(() => {
      setCursorHidden(true); // 100ms 후에 커서를 다시 숨김
    }, 100);
  };

  const handleMouseMove = (event) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setMousePosition({ left: mouseX, top: mouseY });
  };

  return (
    <div className="Function-body">
      <div
        className={sizeClass}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={handleSquareClick}
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
