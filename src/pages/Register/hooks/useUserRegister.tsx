import React from "react";

const useUserRegister = () => {
  async function setRegister(name: string, email: string, password: string, admin: boolean) {
    const response = await fetch("https://localhost:3000/api/user/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, admin }),
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Error fetching user data");
    }
  }

  return { setRegister };
};

export default useUserRegister;
