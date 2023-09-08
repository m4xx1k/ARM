import { useEffect, useState } from "react";
import { getLoggedinUser } from "../../helpers/api_helper";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  let token =
  userProfileSession &&
  userProfileSession["token"];
  const [loading, setLoading] = useState(!userProfileSession);
  const [userProfile, setUserProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    let token =
      userProfileSession &&
      userProfileSession["token"];
    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(!token);
  }, []);


  return { userProfile, loading,token };
};

export { useProfile };
