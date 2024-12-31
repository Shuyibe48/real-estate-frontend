export const deleteBuyerFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/buyers/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const deleteAgentFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/agents/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};