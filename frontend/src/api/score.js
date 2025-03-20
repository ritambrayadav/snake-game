import apiClient from "./api";
const path = "/api/score";

export const getTopScores = async () => {
  try {
    const response = await apiClient.get(`${path}`);
    return response?.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching top user data"
    );
  }
};
