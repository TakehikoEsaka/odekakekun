import axiosInstance from "../axios";

export const useLogin = () => {
  const getcheckLogin = async () => {
    // OAuth2はJSONではなくFormDataを使う仕様なので注意

    const token = localStorage.getItem("access_token")
      ? localStorage.getItem("access_token")
      : "None";

    await axiosInstance
      .get("/login/session-check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("you are logged in !");
        localStorage.setItem("login_state", "true");
      })
      .catch((error) => {
        console.log("you are not logged in !");
        localStorage.setItem("login_state", null);
        // console.log("error is ", error);
      });
  };

  return { getcheckLogin };
};
