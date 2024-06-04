import React from "react";

const useResetPassword = () => {
  async function sendEmail(email: string) {
    const response = await fetch("https://localhost:3000/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      throw new Error("No se ha podido iniciar sesión");
    }
  }

  return {
    sendEmail,
  };
};

export default useResetPassword;
