"use client";

import styles from "./pagination.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function PaginationComponent({count}) {
  const searchPrams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchPrams.get("page") || 1;

  const params = new URLSearchParams(searchPrams);
  
  const ITEM_PER_PAGE = 3;

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;

  const handleChangePage = (type) => {
    type === "prev" ? params.set("page", parseInt(page) - 1) : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!hasPrev} onClick={() => handleChangePage("prev")}>Previous</button>
      <button className={styles.button} disabled={!hasNext} onClick={() => handleChangePage("next")}>Next</button>
    </div>
  );
}

export default PaginationComponent;