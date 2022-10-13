import { useState } from "react";
import "./Login.css";

import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form onSubmit={handleSubmit} className='auth-form'>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input
          required
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      <button
        className='btn'
        disabled={isPending ? true : false}
      >
        {isPending ? "loading..." : "Log in"}
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default Login;
