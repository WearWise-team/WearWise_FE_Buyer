import fetchData from "@/apiServices/api/page";

export const getProducts = () => fetchData("products");

export const getProductWithSizeAndColor = () => fetchData("productswithsize");

export const getProductById = (id) => fetchData(`products/${id}`);

export const getProductDetails = (id) => fetchData(`products/more/${id}`);
export const createProduct = (productData) =>
  fetchData("products", "POST", productData);
export const updateProduct = (id, productData) =>
  fetchData(`products/${id}`, "PUT", productData);
export const deleteProduct = (id) => fetchData(`products/${id}`, "DELETE");

export const searchProduct = (name) =>
  fetchData("products/search", "POST", {
    name: name,
  });

export const fetchFilteredProducts = async (filter) => {
  try {
    const result = await fetchData("products/filter", "POST",  filter );
    return result;
  } catch (error) {
    console.error("Fetch filter error:", error);
    return [];
  }
};

export default fetchData;
