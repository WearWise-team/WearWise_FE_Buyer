"use client";

import { createContext, useState, useEffect, useContext } from "react";
import { getProducts } from "@/apiServices/products/page";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (products.length === 0) {
      getProducts()
        .then((data) => {
          setProducts(data.slice(-4));
        })
        .catch((error) => console.error("Lỗi khi lấy sản phẩm:", error));
    }
  }, [products]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
