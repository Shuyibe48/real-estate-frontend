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

export const deletePropertyFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/properties/${id}`, {
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

export const approvedReviewFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/approved/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const approvedComplainFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/complains/approved/${id}`, {
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

export const rejectReviewFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/reject/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const vanishReviewFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const vanishComplainFunction = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/complains/${id}`, {
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
