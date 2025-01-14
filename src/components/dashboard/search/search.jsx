"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function SearchComponent({ placeholder }) {
  const searchPrams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  
  const handleSearch = useDebouncedCallback( // use-debounce add deloy to search function
    (e) => {
      const params = new URLSearchParams(searchPrams);
      params.set("page", 1);
      if(e.target.value){
        params.set("query", e.target.value);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params}`);
    }, 1000
  ) 

  return (
    <div className={styles.container}>
      <MdSearch />
      <input className={styles.input} type="text" placeholder={placeholder} onChange={handleSearch} />
    </div>
  );
}

export default SearchComponent;