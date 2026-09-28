// Jest transformer shim: replaces Vite `import.meta.env` accesses with
// `process.env` equivalents before delegating to ts-jest. This allows source
// files using `import.meta.env.VITE_BACKEND_URL` to be tested under Jest
// (CommonJS) without changing production behaviour, where Vite provides
// `import.meta.env` natively.
const { TsJestTransformer } = require("ts-jest");

const baseTransformer = new TsJestTransformer();

function replaceImportMeta(src) {
  return src
    .replace(/import\.meta\.env\.VITE_BACKEND_URL/g, "process.env.VITE_BACKEND_URL")
    .replace(/import\.meta\.env/g, "(process.env)");
}

module.exports = {
  process(src, filePath, transformOptions) {
    return baseTransformer.process(replaceImportMeta(src), filePath, transformOptions);
  },
  getCacheKey(src, filePath, transformOptions) {
    return baseTransformer.getCacheKey(replaceImportMeta(src), filePath, transformOptions);
  },
};
