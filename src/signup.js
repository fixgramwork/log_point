import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const Signin = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const userName = idRef.current.value;
    const userPassword = pwRef.current.value;

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

export default Signup;
