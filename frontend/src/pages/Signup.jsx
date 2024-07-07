import React, { useState } from "react";
import axios from "axios";
import { Heading } from "../components/authComponents/Heading";
import { SubHeading } from "../components/authComponents/SubHeading";
import { InputBox } from "../components/authComponents/InputBox";
import { Button } from "../components/authComponents/Button";
import { BottomWarning } from "../components/authComponents/ButtomWarning";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        username,
        password,
        firstName,
        lastName,
      }
    );
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="bg-white w-80 text-center p-2 px-4 h-max rounded-lg">
          <Heading label="Sign Up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            placeholder="John"
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            placeholder="Doe"
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            label="Email"
            placeholder="johndoe@gmail.com"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          <Button label="Sign up" onClick={handleClick} />
          <BottomWarning
            label="Already have an account?"
            to={"/signin"}
            buttonText="Sign in"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
