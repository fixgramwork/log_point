import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/home.css";
import LOGO from "../img/LOGO.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="Home-Home">
      <div className="Home-container">
        <div className="Home-greet">
          <img src={LOGO} className="Home-Log_point" /> {/*로고*/}
          <p>
            당신이 원하던 그리고 <br />
            원했던 <strong>"감도"</strong>를 찾아드립니다.
          </p>
        </div>

        <div className="Home-contents">
          <p className="Home-text">
            감도를 측정하여 <br/> 게임별 감도를 추천드립니다.
          </p>
          <div
            className="Home-button"
            onClick={() => {
              navigate("/function");
            }}
          >
            지금 시작하기
          </div>
          <p className="Home-text">프로들의 감도 확인해보기</p>
          <div
            className="Home-button"
            onClick={() => {
              navigate("/ranking");
            }}
          >
            확인하러 가기
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
