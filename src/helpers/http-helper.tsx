import axios from "axios";

const httpRequest = async (
  apiURL: string,
  method: string = "GET",
  body: any = {}
) => {
  try {
    const responseData = await axios({
      url: apiURL,
      method: method,
      data: body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return responseData.data;
  } catch (ex) {
    console.error("Error:" + ex);
    return null;
  }
};

export { httpRequest };
