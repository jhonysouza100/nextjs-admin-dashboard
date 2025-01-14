import PaginationComponent from "@/components/dashboard/pagination/pagination";
import SearchComponent from "@/components/dashboard/search/search";
import styles from "@/components/dashboard/users/users.module.css";
import { deleteUser } from "@/lib/actions";
import { fetchUsers } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

async function UsersPage({ searchParams }) {
  // GET ALL USERS by QUERY PARAMS <=================================================
  const query = searchParams?.query || "";
  const page = searchParams?.page || 1;
  // GET ALL USERS <=================================================
  const {count, users} = await fetchUsers(query, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchComponent placeholder="Search a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addbutton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <div className={styles.user}>
                  <Image className={styles.userimage} src={user.img || "/noavatar.png"} alt="user image" width={50} height={50} />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActve ? "Active" : "Passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent count={count} />
    </div>
  );
}

export default UsersPage;