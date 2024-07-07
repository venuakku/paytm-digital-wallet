import axios from "axios";
import { useEffect, useState } from "react";

export const Balance = ({ value }) => {
  const [balance, setBalance] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getBalance() {
      const response = await axios.get(
        "https://paytm-wallet-server.vercel.app/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      let data = response.data.balance;
      setBalance(data.toFixed(2));
    }

    getBalance();
  }, []);

  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">₹ {balance}</div>
    </div>
  );
};
