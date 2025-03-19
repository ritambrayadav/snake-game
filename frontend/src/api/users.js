import apiClient from "./api";
const path = "/api/auth";

export const getUserById = async (userId) => {
  try {
    const response = await apiClient.get(`${path}/${userId}`);
    return response?.data?.user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user data"
    );
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post(`${path}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error registering user");
  }
};

export const loginUser = async (userCredentials) => {
  try {
    const response = await apiClient.post(`${path}/login`, userCredentials);
    return response?.data;
  } catch (error) {
    throw new Error(
      error.response.data?.error?.errorMessage || "Error logging user"
    );
  }
};
