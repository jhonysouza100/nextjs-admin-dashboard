import { Product, User } from "./models";
import { connectToDb } from "./utils";

export const fetchUsers = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 3;

  try {
    connectToDb();
    const count = await User.find({username:{$regex: regex}}).countDocuments(); // GET USERS COUNT FOR PAGINATION
    const users = await User.find({username:{$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1)); // GET ALL USERS
    return {count, users};
  } catch (error) {
    console.log(error);
    throw new Error(`Fetching users error: ${error.message}`);
  }
}

export const findOneUser = async (id) => {
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(`Read user error: ${error.message}`);
  }
}

export const fetchProductss = async (query, page) => {
  const regex = new RegExp(query, "i");
  const ITEM_PER_PAGE = 3;

  try {
    connectToDb();
    const count = await Product.find({title:{$regex: regex}}).countDocuments(); // GET PRODUCTS COUNT FOR PAGINATION
    const products = await Product.find({title:{$regex: regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1)); // GET ALL PRODUCTS
    return {count, products};
  } catch (error) {
    console.log(error);
    throw new Error(`Fetching products error: ${error.message}`);
  }
}

export const findOneProduct = async (id) => {
  try {
    connectToDb();
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
    throw new Error(`Read product error: ${error.message}`);
  }
}