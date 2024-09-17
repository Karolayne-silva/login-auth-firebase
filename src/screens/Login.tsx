import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ilustracao4 from "../img/ilustracao4.png";
import firebase from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  //se caso o usuario tiver autenticado e ela for pra page de login ele é redirecionado para o home
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        navigate("/home");
      }
      else{
        navigate("/");
      }
    });
  }, []);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(firebase);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("entrou na conta");
          navigate("/home");
        })
        .catch((e) => {
          alert(e);
        });
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  return (
    <div className="login-register">
      <div className="container-img">
        <img src={ilustracao4} alt="" />
      </div>
      <div className="container-form">
        <div className="container-form-content">
          <h1 className="title">Account Login</h1>
          <p className="login-message">
            If you are already a member you can login with your email address
            and password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="label-input">
              <label> Email address</label>
              <input
                className="input"
                type="text"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>

            <div className="label-input">
              <label> Password</label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <input className="btn" type="submit" value="Login" />
          </form>

          <p className="signup-message">
            Dont have an account ?{" "}
            <Link to="/register" className="link-register">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
