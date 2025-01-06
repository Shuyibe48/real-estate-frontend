import baseUrl from "./baseUrl";

export const getAgent = async (id) => {
  const res = await baseUrl.get(`/agents/${id}`);

  return res?.data?.data;
};

export const getSingleList = async (id) => {
  const res = await baseUrl.get(`/properties/${id}`);

  return res?.data?.data;
};

export const getSingleAgent = async (id) => {
  const res = await baseUrl.get(`/agents/${id}`);

  return res?.data?.data;
};

export const getSingleBuyer = async (id) => {
  const res = await baseUrl.get(`/buyers/${id}`);

  return res?.data?.data;
};

export const getSingleAdmin = async (id) => {
  const res = await baseUrl.get(`/admins/${id}`);

  return res?.data?.data;
};

export const getSingleProperty = async (id) => {
  const res = await baseUrl.get(`/properties/${id}`);

  return res?.data?.data;
};

export const getSingleAgency = async (id) => {
  const res = await baseUrl.get(`/agencies/${id}`);

  return res?.data?.data;
};
