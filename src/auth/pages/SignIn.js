import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SignIn(props) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function handleSignIn() {
    await new Promise((r) => setTimeout(r, 1000)); // ждёт 1000 мс
    // здесь должен быть запрос на сервер
    props.onSignIn({ login });
    history.push("/main");
  }

  return (
    <div className="col-8 mx-auto w-80 p-5 text-center">
      <h1 className="mb-4">Sign in</h1>

      <div className="mb-3">
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>

      <button className="btn btn-primary form__button" onClick={handleSignIn}>
        Sign in
      </button>
      {/* { login: login, password: password } */}
    </div>
  );
}

export default SignIn;
