import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ilustracao4 from "../img/ilustracao4.png";
import firebase from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Cadastro() {
  interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
  }

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const validate = () => {
    let formErrors: { [key: string]: string } = {};

    if (values.name.length === 0) {
      formErrors.name = "Name is required";
    }
    if (!values.email) formErrors.email = "Email is required";

    if (!values.password) formErrors.password = "Password is required";

    if (!values.passwordConfirm) {
      formErrors.passwordConfirm = "Please confirm your passsword";
    } else if (values.password !== values.passwordConfirm) {
      formErrors.passwordConfirm = "Password must be same";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { passwordConfirm, ...dataToSend } = values;
    if (validate()) {
      try {
        const auth = getAuth(firebase);
        createUserWithEmailAndPassword(
          auth,
          dataToSend.email,
          dataToSend.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            alert(`Usuário ${user.email} criado com sucesso`)
            navigate("/");
          })
          .catch((error) => {
            console.log("Erro na criação de usuário:", error.message);
            alert(error);
          });
      } catch (error) {
        console.log("Erro no try-catch:", error);
        alert(error);
      }
    }
  };

  return (
    <div className="login-register">
      <div className="container-img">
        <img src={ilustracao4} />
      </div>
      <div className="container-form">
        <div className="container-form-content">
          <h1 className="title">Account Signup</h1>
          <p className="login-message">
            Become a member and enjoy exclusive promotions.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="label-input">
              <label>Full Name</label>
              <input
                className="input"
                type="text"
                name="name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            {errors.name && <p className="erro-input">{errors.name}</p>}
            <div className="label-input">
              <label>Email Address</label>
              <input
                className="input"
                type="text"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            {errors.email && <p className="erro-input">{errors.email}</p>}
            <div className="label-input">
              <label>Password</label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            {errors.password && <p className="erro-input">{errors.password}</p>}
            <div className="label-input">
              <label>Confirm Password</label>
              <input
                className="input"
                type="password"
                name="passwordConfirm"
                onChange={(e) =>
                  setValues({ ...values, passwordConfirm: e.target.value })
                }
              />
            </div>
            {errors.passwordConfirm && (
              <p className="erro-input">{errors.passwordConfirm}</p>
            )}

            <input className="btn" type="submit" value="Register" />
          </form>
        </div>
      </div>
    </div>
  );
}
