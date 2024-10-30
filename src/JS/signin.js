import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/signin.css";

const Signin = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const userName = idRef.current.value;
    const userPassword = pwRef.current.value;

    // 로그인 성공 시 구현하기
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} id="login-form">
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
        <label htmlFor="remember-check">
          <input type="checkbox" id="remember-check" /> 아이디 저장하기
        </label>
        <input type="submit" value="로그인" />
      </form>
      <hr />
      <div className="signup-link">
        <p>계정이 없으신가요?<a href="/signup"> 회원가입</a></p>

      </div>
    </div>
  );
};

export default Signin;
