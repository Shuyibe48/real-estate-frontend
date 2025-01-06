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

export const deleteAdminFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/admins/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const deleteDeveloperFunction = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/developers/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );

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

export const approvedListFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/approved/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const rejectListFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/reject/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const blockListFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/block/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const blockAgentFunction = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/agents/block/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};

export const blockAdminFunction = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/admins/block/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};

export const blockBuyerFunction = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/buyers/block/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};

export const blockDeveloperFunction = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/developers/block/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data;
};
