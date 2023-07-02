import { React, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({});

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    const url = "http://localhost:3000/authentication/register";

    //request to backend to register user
    axios
      .post(url, inputs)
      .then((response) =>
        MySwal.fire({
          html: <i>Register Success</i>,
          icon: "success",
        }).then((value) => {
          navigate("/login");
        })
      )
      .catch((error) => {
        console.log(error);
        MySwal.fire({
          html: <i>{error.message}</i>,
          icon: "error",
        }).then((value) => {
          navigate("/register");
        });
      });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>FirstName</label>
          <input
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={handleOnchange}
            required
          />
        </div>
        <div>
          <label>LastName</label>
          <input
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={handleOnchange}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleOnchange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleOnchange}
            required
          />
        </div>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleOnchange}
            required
          />
        </div>
        <div>
          <input type="submit" value="Register" />
        </div>
      </form>
    </>
  );
}

export default Register;
