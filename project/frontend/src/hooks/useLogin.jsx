import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginFormState } from "../store/loginState";
import axiosInstance from "../axios";

export const useLogin = () => {
  const [checkLogin, setCheckLogin] = useState(false);

  const getcheckLogin = async () => {
    // OAuth2はJSONではなくFormDataを使う仕様なので注意

    const token = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : "None";

    const response = await axiosInstance
      .get("/login/session-check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setCheckLogin(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("checked result is ", checkLogin);

  return { checkLogin, getcheckLogin };
};
