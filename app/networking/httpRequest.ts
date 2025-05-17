import axios from "axios";

/**
 * This file implements all connections to the restful-api.
 * It uses cookies to store the credentials and renews the token if it is expired.
 *
 * @author Simon Neidig <mail@simon-neidig.de>
 */

const PROXY_BASE_URL = "http://127.0.0.1:8000";

interface Request {
  method: string;
  path: string;
  body?: string;
  responseType?: string;
}

/**
 * This method is used for all http-requests to the restful-api.
 *
 * @author Simon Neidig <mail@simon-neidig.de>
 */
export async function http({
  method,
  path,
  body = undefined,
  responseType = undefined,
}: Request): Promise<any> {
  console.log("HTTP request", method, path, body);
  let config = {};
  if (responseType !== undefined) {
    config = {
      responseType: responseType,
    };
  }

  // Prefix path with proxy base URL
  const url = `${PROXY_BASE_URL}${path}`;

  let response;
  if (method === "GET") {
    response = await axios.get(url, config);
  } else if (method === "PUT") {
    response = await axios.put(url, body);
  } else if (method === "POST") {
    response = await axios.post(url, body);
  }

  return response;
}
