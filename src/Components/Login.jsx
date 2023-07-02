import { React, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const raw = {
      username: inputs.username,
      password: inputs.password,
    };

    axios
      .post("http://localhost:3000/authentication/login", raw)
      .then(function (response) {
        console.log(response);
        if (response.status === 201 && response.data.accessToken) {
          MySwal.fire({
            html: <i>Login success</i>,
            icon: "success",
          }).then((value) => {
            localStorage.setItem("token", response.data.accessToken);
            navigate("/profile");
          });
        }
      })
      .catch(function (error) {
        MySwal.fire({
          html: <i>Login failed</i>,
          icon: "error",
        });
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your username:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your password:
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <div>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </>
  );
}

export default Login;
