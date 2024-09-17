import { useEffect} from "react";
import { useNavigate  } from "react-router-dom";
import firebase from "../firebaseConfig";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default function Home() {

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        navigate("/home");
      } else {
        navigate("/");
      }
    });
  }, []);


  const handleLogout = () => {
    const auth = getAuth(firebase);
    signOut(auth)
      .then(() => {
        window.location.pathname = "/";
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div>
      <div className="home">
        <h1>Parabéns, você está logado</h1>
        <button className="home-btn" onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  );
}
