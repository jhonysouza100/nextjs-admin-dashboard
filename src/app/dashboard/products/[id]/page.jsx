import styles from "@/components/dashboard/products/singleProduct/singleProduct.module.css";
import { updateProduct } from "@/lib/actions";
import { findOneProduct } from "@/lib/data";
import Image from "next/image";

async function SingleProductPage({params}) {
  const product = await findOneProduct(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={product.img || "/noproduct.jpg"} alt="user image" fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label htmlFor="price">Price</label>
          <input type="number" name="price" placeholder={product.price} />
          <label htmlFor="stock">Stock</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label htmlFor="color">Color</label>
          <input type="text" name="color" placeholder={product.color} />
          <label htmlFor="size">Size</label>
          <textarea type="text" name="size" placeholder={product.size} />
          <label htmlFor="cat">Category</label>
          <select name="cat" id="cat">
            <option value="general" selected={product.cat === "general"}>General</option>
            <option value="kitchen" selected={product.cat === "kitchen"}>Kitchen</option>
            <option value="phone" selected={product.cat === "phone"}>Phone</option>
            <option value="computer" selected={product.cat === "computer"}>Computer</option>
          </select>
          <textarea name="desc" id="desc" rows="16" placeholder={product.desc}></textarea>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
}

export default SingleProductPage;
