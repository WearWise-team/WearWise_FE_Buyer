import fetchData from "../api/page";

export const tryOnKlingAI = (data) =>
  fetchData("virtual-tryon-klingAI", "POST", data);

export const getKlingAIResults = (taskId, token) =>
  fetchData(`/get-result-try-on/${taskId}`, "GET", {
    token: token,
  });
