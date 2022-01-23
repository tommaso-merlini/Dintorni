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
    const cart: MutationAddToCartArgs = await Cart.findOne({
      firebaseUserID,
      shopID,
    });

    // if the cart does not exist create one
    if (cart === null) {
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
    }

    //if the cart exist add

    return true;
  } catch (e) {
    console.log(`error while adding the product in the cart`);
    throw new GraphQLError(e.message);
  }
};

export default addToCart;
