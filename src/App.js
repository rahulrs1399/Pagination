import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [product, setProduct] = useState("");
  const [page, setPage] = useState(1);

  const handleNum = (selectedPage) => {
    if (
      selectedPage > 0 &&
      selectedPage <= product.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setProduct(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="App">
      <h1>Products.</h1>
      {product.length > 0 && (
        <div className="products">
          {product.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {product.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__block"}
            onClick={() => handleNum(page - 1)}
          >
            ◀
          </span>
          {[...Array(product.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => handleNum(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < product.length / 10 ? "" : "pagination__block"}
            onClick={() => handleNum(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
