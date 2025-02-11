import apiClient from "./apiClient";

export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};
