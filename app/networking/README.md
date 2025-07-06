# Networking

This application handles all communication with the backend through a dedicated networking module. Instead of using a library like ["axios"](https://axios-http.com) directly in each component or service, a single, unified method is provided to manage all HTTP requests. This approach ensures consistency, simplifies error handling, and centralizes logic for authentication and request configuration.

By using a central `http()` method, you can easily implement preconditions such as token validation, automatic token renewal, or global error handling in one place. For example, the method could check if a valid authentication token is present (using a `checkAndRenewJWT` function), and if the token is expired (checked with an `isExpired` function), it could automatically request a new token (using a `login` function).

> **Note:** Currently, the backend only provides GET routes and does not require authentication via token. Therefore, only the `http()` method is implemented at this stage. Additional authentication and helper functions will be added as the backend evolves.

![networking](./networking.svg)

## http()

The `http()` method is the single entry point for sending requests to the backend. It wraps the [axios](https://axios-http.com) library and abstracts away the details of configuring and sending HTTP requests, making it easy to use throughout the application.

**Functionality:**

- The method accepts an object with the following parameters:
  - **`method`** (string): The HTTP method to use. Supported values are `"GET"`, `"POST"`, and `"PUT"`.
  - **`path`** (string): The endpoint path for the request (relative to the backend base URL).
  - **`body`** (optional): The request payload, used for `"POST"` and `"PUT"` requests.
  - **`responseType`** (optional): The expected response type (e.g., `"blob"` for PDF downloads).
  - **`language`** (optional): The language to be sent in the `Accept-Language` header.

- The backend base URL is automatically prefixed to the path using the environment variable `VITE_BACKEND_URL`.

- If a `language` is provided, it is set in the `Accept-Language` header.

- If a `responseType` is provided, it is set in the axios config.

- Depending on the HTTP method, the request is sent using the appropriate axios function:
  - `"GET"`: `axios.get(url, config)`
  - `"POST"`: `axios.post(url, body, config)`
  - `"PUT"`: `axios.put(url, body, config)`

- The method returns the full axios response object.

**Example usage:**

```typescript
const response = await http({
  method: "GET",
  path: "/example/",
  language: "en",
});
```

This design allows for consistent request handling, easy extension (e.g., adding authentication or error handling), and central management of backend communication.