const { GraphQLError } = require("graphql");

const createOrder = async(_,{userId, companyId, dateLimit, pickUpHour}, {db, resolvers}) =>{
    try {

        //get the cart
        const cart = [];
        let total = 0;
        let totalToPay = 0;
        let newCashback = 0;


        const cartCollection = await db.collection(`Cart/${userId}/${companyId}`).get();
        cartCollection.forEach((doc) => {
            cart.push(doc.data())
        });

        if(cart.length === 0) throw new Error("cart must haveat least one item");

        //get the cashback of the user
        const cashbackDoc = await db.doc(`Cashback/${userId}`).get();
        const cashback = cashbackDoc.data().cashback;
        console.log(`----------------`);
        console.log(`user cashback: ${cashback}`);

        //get the cashback of the company
        

        //calculate total to pay
        cart.forEach(item => {
            total += item.price * item.quantity;
        })

        console.log(`total: ${total}`);

        //get the cashbackinfo of the company
        const company = await resolvers.Query.company(null, {id: companyId});
        const cashbackInfo = company.cashbackInfo;

        //if the cashback is greater than the total add the difference to newcashback
        totalToPay = total - cashback;
        if(totalToPay < 0) {
            console.log(`payed: 0`);
        } else {
            console.log(`payed: ${totalToPay}`);
        }

        if(totalToPay < 0) {
            totalToPay = Math.abs(totalToPay);
            newCashback = totalToPay;
        }


        //if you can receive the cashback calculate it and add to the newcashback
        if(total > cashbackInfo.minPayment) {
            newCashback += (total * cashbackInfo.cashBack) / 100;
            console.log(`new cashback: ${newCashback}`);
        }
        console.log(`----------------`);

        // creating code
        const alphabet = "abcdefghilmnopqrstuvxz"
        let codeProvaalph  = alphabet[Math.floor(Math.random() * alphabet.length)] + alphabet[Math.floor(Math.random() * alphabet.length)]
        let codeNumProva = Math.floor(Math.random()*(999-100+1)+100);
        let code = codeProvaalph + codeNumProva

        db.doc(`Cashback/${userId}`).set({
            cashback: newCashback
        })

        return true;
    } catch(e) {
        console.log(`error while  creating the order`);
        throw new GraphQLError(e.message);
    }
}

module.exports = createOrder;