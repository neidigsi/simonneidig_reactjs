// Import external dependencies
import axios from "axios";

// Import internal dependencies
import { http } from "@/networking/httpRequest";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedAxios = axios as unknown as Record<string, jest.Mock>;

describe("httpRequest", () => {
  const BACKEND_URL = process.env.VITE_BACKEND_URL as string;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   * Test to check if a GET request is sent against the configured backend url.
   */
  it("sends a GET request against the configured backend url", async () => {
    mockedAxios.get.mockResolvedValue({ status: 200, data: {} });

    const response = await http({ method: "GET", path: "/personal-details/" });

    expect(response).toEqual({ status: 200, data: {} });
    expect(mockedAxios.get).toHaveBeenCalledWith(`${BACKEND_URL}/personal-details/`, {
      headers: {},
      withCredentials: true,
    });
  });

  /**
   * Test to check if language, authorization and response type headers are set.
   */
  it("sets language, authorization and response type headers", async () => {
    mockedAxios.get.mockResolvedValue({ status: 200, data: {} });

    await http({
      method: "GET",
      path: "/work/",
      language: "de",
      jwt: "token-123",
      responseType: "blob",
    });

    expect(mockedAxios.get).toHaveBeenCalledWith(`${BACKEND_URL}/work/`, {
      headers: { "Accept-Language": "de", Authorization: "Bearer token-123" },
      withCredentials: true,
      responseType: "blob",
    });
  });

  /**
   * Test to check if a POST request with a body is sent.
   */
  it("sends a POST request with a body", async () => {
    mockedAxios.post.mockResolvedValue({ status: 201, data: {} });
    const body = { email: "jane@example.com" };

    await http({ method: "POST", path: "/auth/register", body, language: "en" });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      `${BACKEND_URL}/auth/register`,
      body,
      { headers: { "Accept-Language": "en" }, withCredentials: true }
    );
  });

  /**
   * Test to check if a PUT request with a body is sent.
   */
  it("sends a PUT request with a body", async () => {
    mockedAxios.put.mockResolvedValue({ status: 200, data: {} });
    const body = { name: "Jane" };

    await http({ method: "PUT", path: "/users/me", body, jwt: "token-123" });

    expect(mockedAxios.put).toHaveBeenCalledWith(`${BACKEND_URL}/users/me`, body, {
      headers: { Authorization: "Bearer token-123" },
      withCredentials: true,
    });
  });

  /**
   * Test to check if PATCH and DELETE requests are sent.
   */
  it("sends PATCH and DELETE requests", async () => {
    mockedAxios.patch.mockResolvedValue({ status: 200, data: {} });
    mockedAxios.delete.mockResolvedValue({ status: 204, data: {} });

    await http({ method: "PATCH", path: "/users/me", body: { first_name: "Jane" } });
    await http({ method: "DELETE", path: "/contact/1", jwt: "token-123" });

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${BACKEND_URL}/users/me`,
      { first_name: "Jane" },
      { headers: {}, withCredentials: true }
    );
    expect(mockedAxios.delete).toHaveBeenCalledWith(`${BACKEND_URL}/contact/1`, {
      headers: { Authorization: "Bearer token-123" },
      withCredentials: true,
    });
  });

  /**
   * Test to check if unsupported methods are rejected and logged.
   */
  it("rejects unsupported http methods and logs the error", async () => {
    await expect(http({ method: "OPTIONS", path: "/" })).rejects.toThrow(
      "Unsupported HTTP method: OPTIONS"
    );
    expect(console.error).toHaveBeenCalledWith(
      "Full HTTP Error Object:",
      expect.objectContaining({ message: "Unsupported HTTP method: OPTIONS" })
    );
  });

  /**
   * Test to check if axios failures are logged with status details and rethrown.
   */
  it("logs axios failures with status details and rethrows", async () => {
    const failure = {
      message: "Request failed",
      response: { status: 401, statusText: "Unauthorized", data: { detail: "nope" } },
      config: { url: `${BACKEND_URL}/users/me` },
    };
    mockedAxios.get.mockRejectedValue(failure);

    await expect(http({ method: "GET", path: "/users/me" })).rejects.toBe(failure);
    expect(console.error).toHaveBeenCalledWith(
      "Full HTTP Error Object:",
      expect.objectContaining({ message: "Request failed", status: 401 })
    );
  });
});
