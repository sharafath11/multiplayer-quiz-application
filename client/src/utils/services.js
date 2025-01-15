import axios from 'axios';
export const BaseUrl="http://localhost:4000";
export const postRequest = async (url, body) => {
  try {
    const data = body;
    const response = await axios.post(url, data);
    console.log(body);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return { error: true, message };
  }
};


export const getRequest = async (url) => {
  try {
    console.log(url)
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return { error: true, message };
  }
};
