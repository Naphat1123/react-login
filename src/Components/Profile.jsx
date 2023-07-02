import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

function Profile() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [isLoaded, setLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const option = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setTimeout(() => {
      axios
        .get("http://localhost:3000/users/profile", option)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            setUser(response.data);
          }
          setLoaded(false);
        })
        .catch((error) => {
          MySwal.fire({
            html: <i>Access denied</i>,
            icon: "error",
          }).then(() => {
            navigate("/login");
          });
          console.log(error);
        });
    }, 10000);
  }, []);

  if (isLoaded) return <div>is loading</div>;

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div>
        <ul>
          <li>{user.username}</li>
          <li>{user.firstName}</li>
          <li>{user.lastName}</li>
          <li>{user.email}</li>
        </ul>
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
}

export default Profile;
