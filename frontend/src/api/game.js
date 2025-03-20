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
export const updateGameState = async (gameState) => {
  try {
    await apiClient.put(`${path}`, gameState);
  } catch (error) {
    console.error("Error updating game state:", error);
  }
};
export const getGameState = async (sessionId) => {
  try {
    await apiClient.get(`${path}/${sessionId}`);
  } catch (error) {
    console.error("Error getting game state:", error);
  }
};
