import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Cleanup after each test
afterEach(async () => {
  cleanup();

  // Add small delay to allow pending operations to complete
  await new Promise((resolve) => setTimeout(resolve, 50));

  // Only attempt GC if available
  if (typeof global.gc === "function") {
    global.gc();
  }
});
