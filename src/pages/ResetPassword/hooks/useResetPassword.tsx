import React from "react";

const useValidateToken = () => {
  async function validateToken(token: string, actualTime: string) {
    const response = await fetch(
      "https://localhost:3000/api/resetPassword/validate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, actualTime }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      throw new Error("Unable to log in");
    }
  }

  async function resetPassword(email: string, password: string) {
    const response = await fetch(
      "https://localhost:3000/api/resetPassword/reset",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Unable to log in");
    }
  }

  return {
    validateToken,
    resetPassword,
  };
};

export default useValidateToken;
