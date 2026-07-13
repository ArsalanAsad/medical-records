const API_BASE = `${import.meta.env.VITE_API_URL}/api/records`;

const getHeaders = () => {
  const token = localStorage.getItem("medivault_token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};


const recordService = {

  getAll: async () => {
    const res = await fetch(API_BASE, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch records");
    }

    return data;
  },


  getByUser: async () => {
    const res = await fetch(API_BASE, {
      method: "GET",
      headers: getHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch records");
    }

    return data;
  },


  getById: async (id) => {
    const records = await recordService.getAll();

    return records.find(
      (record) => record._id === id
    );
  },


  create: async (record) => {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(record),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create record");
    }

    return data.record;
  },


  update: async (id, updatedData) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(updatedData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to update record");
    }

    return data.record;
  },


  remove: async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete record");
    }

    return data;
  },

};


export default recordService;