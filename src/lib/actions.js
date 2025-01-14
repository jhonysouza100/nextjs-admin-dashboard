"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDb } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"; 

export const addUser = async (formData) => {
  const { email, password, username, address, phone, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {

    connectToDb();
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User({
      email,
      password: hashedPassword,
      username,
      address,
      phone,
      isAdmin,
      isActive,
    });

    await newUser.save();

  } catch (error) {
    console.log(error);
    throw new Error("Couldn't add user");
  }

  revalidatePath(`/dashboard/users`);
  redirect(`/dashboard/users`);
};

export const addProduct = async (formData) => {
  const data = Object.fromEntries(formData);

  try {

    connectToDb();
    
    const newProduct = await Product(data);

    await newProduct.save();

  } catch (error) {
    console.log(error);
    throw new Error("Couldn't create product");
  }

  revalidatePath(`/dashboard/products`);
  redirect(`/dashboard/products`);
};

export const deleteProduct = async (formData) => {
  const {id} =
    Object.fromEntries(formData);

  try {

    connectToDb();
    
    await Product.findByIdAndDelete(id);

  } catch (error) {
    console.log(error);
    throw new Error("Couldn't delete product");
  }

  revalidatePath(`/dashboard/products`);
};

export const deleteUser = async (formData) => {
  const {id} =
    Object.fromEntries(formData);

  try {

    connectToDb();
    
    await User.findByIdAndDelete(id);

  } catch (error) {
    console.log(error);
    throw new Error("Couldn't delete user");
  }

  revalidatePath(`/dashboard/users`);
};

export const updateUser = async (formData) => {
  const { id, email, password, username, address, phone, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {

    connectToDb();

    const updateFields = { email, password, username, address, phone, isAdmin, isActive };
    Object.keys(updateFields).forEach( (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]); // si algun campo se encuentra vacio, este se excluira

    await User.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update user");
  }

  revalidatePath(`/dashboard/users`);
  redirect(`/dashboard/users`);
};

export const updateProduct = async (formData) => {
  const { id, title, desc, price, color, stock, size, cat } =
  Object.fromEntries(formData);
  
  try {
    
    connectToDb();
    
    const updateFields = { title, desc, price, color, stock, size, cat };
    Object.keys(updateFields).forEach( (key) => (updateFields[key] === "" || undefined) && delete updateFields[key]); // si algun campo se encuentra vacio, este se excluira
    
    await Product.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Couldn't update product");
  }
  
  revalidatePath(`/dashboard/products`);
  redirect(`/dashboard/products`);
};

export const authentication = async (formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    return { username, password };
  } catch (error) {
    return {error: "Wrong credentials"};
  }
}