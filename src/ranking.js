import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ranking.css";

const Ranking = () => {
  const [rankings, setRankings] = useState([
    { rank: 1, dpi: 800 },
    { rank: 2, dpi: 1600 },
    { rank: 3, dpi: 3200 }
  ]);

  const navigate = useNavigate();

  return (
    <div className="Ranking-wrapper">
      <h1 className="Ranking-ranking">랭킹</h1>
      <p className="Ranking-recommend">사람들이 많이 쓰는 감도를 추천해 드릴게요.</p>
      <div className="Ranking-box">
        <div className="Ranking-dpi">
          {rankings.map((rank) => (
            <div key={rank.rank} className="dpi">
              {rank.rank}. {rank.dpi} dpi
            </div>
          ))}
        </div>
      </div>

      <span className="Ranking-view" >
        내가 쓰는 코드 랭킹 보기
      </span>
    </div>
  );
};

export default Ranking;
