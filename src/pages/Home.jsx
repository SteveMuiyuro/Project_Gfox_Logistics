import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../api";

export default function Home() {
  const [register, setRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function clearForm() {
    setRegister((prev) => ({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    }));
  }

  const [passwordCheckOkay, setPasswordCheckOk] = useState(true);

  function signUp(e) {
    e.preventDefault();
    if (register.password !== register.confirmPassword) {
      setPasswordCheckOk(false);
    } else {
      createUserWithEmailAndPassword(auth, register.email, register.password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((error) => console.log(error));
      console.log(register);
      clearForm();
    }
  }

  function handleChange(e) {
    const { value, name } = e.target;
    setRegister((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="main-container">
      <div className="details">
        <p>
          Scale your products with Gfox Logistics. Hire our Trucks, and Trailers
          today!
        </p>
        <div className="form-register">
          <p>Don't Have an Account?</p>
          <form action="" method="post" onSubmit={signUp} className="form">
            <input
              type="text"
              placeholder="Firstname"
              value={register.firstname}
              name="firstname"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              value={register.lastname}
              name="lastname"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={register.email}
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={register.password}
              name="password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={register.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
              required
            />
            {!passwordCheckOkay ? (
              <p className="password-check">Password does not Much</p>
            ) : (
              ""
            )}
            <button className="register">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}
