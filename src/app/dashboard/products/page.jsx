import PaginationComponent from "@/components/dashboard/pagination/pagination";
import SearchComponent from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/products/products.module.css";
import Image from "next/image";
import Link from "next/link";
import { fetchProductss } from "@/lib/data";
import { deleteProduct } from "@/lib/actions";

async function ProductsPage({ searchParams }) {
  // OBTENER TODOS LOS PRODUCTOS SEGÚN PARÁMETROS DE CONSULTA
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;

  // OBTENER LOS PRODUCTOS
  const { count, products } = await fetchProductss(query, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchComponent placeholder="Search a product..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addbutton}>Add New</button>
        </Link>
      </div>

      {products && products.length > 0 ? (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Title</td>
                <td>Description</td>
                <td>Price</td>
                <td>Created At</td>
                <td>Stock</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.product}>
                      <Image
                        className={styles.productimage}
                        src={product.img || "/noproduct.jpg"}
                        alt="product image"
                        width={50}
                        height={50}
                      />
                      {product.title}
                    </div>
                  </td>
                  <td>{product.desc}</td>
                  <td>${product.price}</td>
                  <td>{product.createdAt?.toString().slice(4, 16)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <div className={styles.buttons}>
                      <Link href={`/dashboard/products/${product.id}`}>
                        <button className={`${styles.button} ${styles.view}`}>View</button>
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationComponent count={count} />
        </>
      ) : (
        <div className={styles.empty}>No hay productos disponibles.</div>
      )}
    </div>
  );
}

export default ProductsPage;
