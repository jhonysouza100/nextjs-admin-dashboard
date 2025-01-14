import Image from "next/image";
import styles from "./transactions.module.css";

function Transactions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* Name */}
            <td className={styles.user}>
              <Image className={styles.userimage} src="/noavatar.png" alt="Avatar image" width={50} height={50} />
              Jon Doe
            </td>
            {/* Status */}
            <td>
              <span className={`${styles.status} ${styles.pending}`}>Pending</span>
            </td>
            {/* Date */}
            <td>14.02.2025</td>
            {/* Amount */}
            <td>$3.200</td>
          </tr>
          <tr>
            {/* Name */}
            <td className={styles.user}>
              <Image className={styles.userimage} src="/noavatar.png" alt="Avatar image" width={50} height={50} />
              Jon Doe
            </td>
            {/* Status */}
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>Pending</span>
            </td>
            {/* Date */}
            <td>14.02.2025</td>
            {/* Amount */}
            <td>$3.200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;