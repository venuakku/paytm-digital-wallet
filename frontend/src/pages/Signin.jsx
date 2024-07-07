import React, { useState } from "react";
import axios from "axios";
import { Heading } from "../components/authComponents/Heading";
import { SubHeading } from "../components/authComponents/SubHeading";
import { InputBox } from "../components/authComponents/InputBox";
import { Button } from "../components/authComponents/Button";
import { BottomWarning } from "../components/authComponents/ButtomWarning";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleClick() {
    const response = await axios.post(
      "https://paytm-wallet-server.vercel.app/api/v1/api/v1/user/signin",
      {
        username,
        password,
      }
    );
    console.log(response.data.token);
    localStorage.setItem("token", response.data.token);
    navigate("/dashboard");
  }

  return (
    <div className="bg-slate-300 flex justify-center h-screen">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white p-2 px-4 text-center w-80 h-max">
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            label="Email"
            placeholder="johndoe@gmail.com"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          <Button label="Sign In" onClick={handleClick} />
          <BottomWarning
            label="Don't have an account?"
            to={"/signup"}
            buttonText="Sign Up"
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
