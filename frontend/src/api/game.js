import apiClient from "./api";
const path = "/api/game";
export const startGame = async () => {
  try {
    const response = await apiClient.post(`${path}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error starting the game");
  }
};
