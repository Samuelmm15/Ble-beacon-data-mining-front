import React from "react";

const useUser = () => {
  async function getLogin(email: string, password: string) {
    const response = await fetch("https://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Error fetching user data");
    }
  }

  async function verifyToken() {
    const response = await fetch("https://localhost:3000/api/user/verify-token", {
      method: "POST",
      credentials: 'include', // incluir cookies en la solicitud
    });

    if (response.ok) {
      const data = await response.json();
      return data.valid;
    } else {
      throw new Error("Error verifying token");
    }
  }

  return { getLogin, verifyToken };
};

export default useUser;
