const { admin, firebase } = require("../../../../firebase/firebase");

const createUser = async (_, {email, password}) => {
    try{
        const userCredentials = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const docRef = admin.firestore().collection(`UtenteTest`).doc(userCredentials.user.uid)
        await docRef.set({
            email: email
        });
        console.log("firebase user created!");
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

module.exports = createUser;