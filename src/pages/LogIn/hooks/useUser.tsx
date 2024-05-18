import React from "react";

const useUser = () => {
  async function getLogin(email: string, password: string) {
    const response = await fetch("https://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("No se ha podido iniciar sesión");
    }
  }

  return { getLogin };
};

export default useUser;
