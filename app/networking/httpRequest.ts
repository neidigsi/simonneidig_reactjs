import axios from "axios";

/**
 * This file implements all connections to the restful-api.
 * It uses cookies to store the credentials and renews the token if it is expired.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Request {
  method: string;
  path: string;
  body?: any;
  responseType?: string;
  language?: string; // optionales Feld für Sprache
}

/**
 * This method is used for all http-requests to the restful-api.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 */
export async function http({
  method,
  path,
  body = undefined,
  responseType = undefined,
  language = undefined,
}: Request): Promise<any> {
  let config: any = {
    headers: {},
  };

  if (language !== undefined) {
    config.headers["Accept-Language"] = language;
  }
  if (responseType !== undefined) {
    config.responseType = responseType;
  }

  // Prefix path with proxy base URL
  const url = `${BACKEND_URL}${path}`;

  let response;
  if (method === "GET") {
    response = await axios.get(url, config);
  } else if (method === "PUT") {
    response = await axios.put(url, body, config);
  } else if (method === "POST") {
    response = await axios.post(url, body, config);
  }

  return response;
}
