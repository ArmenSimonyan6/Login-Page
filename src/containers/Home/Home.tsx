import { useEffect } from "react";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext/AuthContex";

const Home = () => {
  const navigate = useNavigate();
  const { session, signOut } = useAuth();

  useEffect(() => {
    localStorage.setItem("visitedHome", "true");
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      localStorage.removeItem("visitedHome");
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={handleSignOut}>Sign Up</button>
      <h3>Welcome {session?.user?.email}</h3>
    </div>
  );
};

export default Home;
