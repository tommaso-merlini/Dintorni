import { MutationAddToCartArgs } from "../../../Types/types";
import Cart from "../../../../Schema/Cart/Cart.model";
import Product from "../../../../Schema/Product/Product.model";
import { GraphQLError } from "graphql";

const addToCart = async (
  _,
  { productID, quantity, firebaseUserID }: MutationAddToCartArgs
) => {
  try {
    //get the product => shopID
    const neededFields = {
      shopID: 1,
    };
    const product = await Product.findById(productID, neededFields);
    if (product === null) {
      throw new Error(`product with id ${productID} does not exist`);
    }

    //get the cart
    const shopID = product.shopID;
    const cart = await Cart.findOne({
      firebaseUserID,
      shopID,
    });

    //check if the cart exists
    if (cart === null) {
      //if it does not exists create one
      const newCart = await new Cart({
        firebaseUserID: firebaseUserID,
        shopID: shopID,
        products: [
          {
            _id: productID,
            quantity: quantity,
          },
        ],
      });
      await newCart.save();
    } else {
      cart.products.map(async (product, index) => {
        if (product._id == productID) {
          const newQuantity = product.quantity + quantity;
          let newCart = cart;
          newCart.products[index].quantity = newQuantity;
          await Cart.updateOne({ _id: cart._id }, newCart);
        }
      });
    }

    // await Cart.findOneAndUpdate(
    //   { firebaseUserID, shopID },
    //   {
    //     firebaseUserID: firebaseUserID,
    //     shopID: shopID,
    //     products:
    //   },
    //   { new: true, upsert: true }
    // );

    return true;
  } catch (e) {
    console.log(`error while adding the product in the cart`);
    throw new GraphQLError(e.message);
  }
};

export default addToCart;
