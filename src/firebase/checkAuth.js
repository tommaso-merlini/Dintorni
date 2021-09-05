require("dotenv").config();
const jwt = require('jsonwebtoken')
const {admin} = require("./firebase");

function checkAuth(req, res, next) {
/* console.log(req.body.idToken); */
if (req.body.idToken) {
admin.auth().verifyIdToken(req.body.idToken)
    .then(decodedToken => {
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    if(uid == req.body.uid){
        /* admin.auth().setCustomUserClaims(uid, {
        DintorniAdmin: true
        }) */
        console.log(uid);
        console.log(req.body.uid);
        const token = jwt.sign({uid:uid, email: email}, process.env.SECRET_ACCESS_TOKEN, /* {expiresIn: "1h"} */)
        return res.status(200).json({
        message:"Accesso Confermato",
        emailLoggata: email,
        jwt: token
        })
    }
    else{
        console.log('questa email ha fatto un tentativo di attacco ', email);
        res.status(403).send('Tentativo di Attacco Hacker') //someone is trying to attack out site
    }
    /* next() */
    }).catch(error => {
    console.log(error);
    res.status(403).send('Unauthorized')
    });
} else {
console.log('non è arrivato nessun token');
res.status(403).send('non è arrivato nessun token')
}
}

module.exports = checkAuth;