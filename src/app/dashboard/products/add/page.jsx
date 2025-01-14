import styles from "@/components/dashboard/products/addProduct/addProduct.module.css";
import { addProduct } from "@/lib/actions";

function AddProductPage() {
  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" placeholder="Title" name="title" required />
        <select name="cat" id="cat">
          <option value="general">Choose a category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" name="price" id="price" placeholder="Price" />
        <input type="number" name="stock" id="stock" placeholder="Stock" />
        <input type="text" name="color" id="color" placeholder="Color" />
        <input type="number" name="size" id="size" placeholder="Size" />
        <textarea name="desc" id="desc" rows="16" placeholder="Description"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProductPage;