import getUser from "./getUser";

const redirectToRoleFeature = async (uid) => {
  const userData = await getUser(uid);
  if (userData.role === "admin") {
    return "admin";
  } else if (userData.role === "officer") {
    return "officer";
  } else {
    return "user";
  }
};

export { redirectToRoleFeature };
