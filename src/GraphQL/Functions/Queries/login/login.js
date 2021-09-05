require("dotenv").config();
const { attemptSilentLogin } = require("express-openid-connect");
const jwt = require('jsonwebtoken')
const { admin } = require("../../../../firebase/firebase");
const authenticateToken = require("../../../../JWT/AuthenticateToken");
const { GraphQLError } = require("graphql");


const login = async (_, { firebaseToken, id }) => {
    try{
        const token = await admin.auth().verifyIdToken(firebaseToken);
        const tokenID = token.uid;
        let isCompany = token.company;
        if(isCompany === undefined || isCompany === null) {
            isCompany = false;
        }

        //if the user authenticates
        if(authenticateToken(tokenID, id)) {
            const user = { id: id, isCompany: isCompany };
            const accessToken = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN);
            return accessToken;
        }

    } catch(e) {
        console.log("error while trying to login");
        throw new GraphQLError(e.message);
        return null;
    }
}

module.exports = login;