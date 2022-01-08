const authenticateToken = (userTokenID: string, inputUserID: string) => {
  //if the userTokenId or userId is not provided throw an error
  if (!userTokenID || !inputUserID) {
    throw new Error("unauthorized");
  }

  //if the userIds from the jwt and the input don't match throw an error
  if (userTokenID != inputUserID) {
    throw new Error("incorrect authorization");
  }

  return true;
};

export default authenticateToken;
