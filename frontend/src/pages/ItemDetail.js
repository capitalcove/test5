import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ItemDetail.module.css";
function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    fetch("http://localhost:3001/api/items/" + id)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setItem)
      .catch(() => navigate("/"));
  }, [id, navigate]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{item.name}</h2>
      <p className={styles.detail}>
        <span className={styles.label}>Category:</span>
        <span className={styles.value}>{item.category}</span>
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Price:</span>
        <span className={`${styles.value} ${styles.price}`}>${item.price}</span>
      </p>
    </div>
  );
}

export default ItemDetail;
