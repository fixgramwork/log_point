import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css"; // CSS 파일이 존재하는지 확인

const Signup = () => { // 이름을 Signin에서 Signup으로 변경
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const userName = idRef.current.value;
    const userPassword = pwRef.current.value;

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userName)) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }

    // 비밀번호 길이 검증
    if (userPassword.length < 6) {
      alert("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    // 회원가입 성공 시 구현하기
    navigate("/");
  };

  return (
    <div className="signup-wrapper">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} id="signup-form">
        <input
          type="text"
          name="userName"
          placeholder="이메일"
          ref={idRef}
        />
        <input
          type="password"
          name="userPassword"
          placeholder="비밀번호"
          ref={pwRef}
        />
        <input type="submit" value="회원가입" />
      </form>
      <hr />
    </div>
  );
};

export default Signup; // 내보내는 이름을 Signup으로 변경
