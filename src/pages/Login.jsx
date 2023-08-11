import React from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { loginUser } from "../../api";

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = React.useState("idle");
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/host";

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    loginUser(formData)
      .then((data) => {
        setError(null);
        localStorage.setItem("loggedin", true);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setStatus("idle"));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="login-container">
      {location.state?.message && <p>{location.state.message}</p>}
      <h2>Sign into your Account</h2>
      {error?.message && <p>{error.message}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={formData.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
        />
        <button disabled={status === "submitting"}>Login</button>
      </form>
    </div>
  );
}
