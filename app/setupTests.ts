import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// Provide Vite's VITE_BACKEND_URL to tests. Source files access it via
// `import.meta.env.VITE_BACKEND_URL`, which jest.transformer.cjs rewrites to
// `process.env.VITE_BACKEND_URL` for the Jest (CommonJS) runtime.
if (!process.env.VITE_BACKEND_URL) {
  process.env.VITE_BACKEND_URL = "http://127.0.0.1:8000";
}
