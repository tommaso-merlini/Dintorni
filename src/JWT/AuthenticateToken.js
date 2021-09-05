const authenticateToken = (userTokenId, inputUserId) => {
  //if the userTokenId or userId is not provided throw an error
  if(!userTokenId || !inputUserId) {
    throw new Error("unauthorized");
  }

  //if the userIds from the jwt and the input don't match throw an error
  if(userTokenId != inputUserId) {
    throw new Error("incorrect authorization");
  }

  return true;
}

module.exports = authenticateToken;