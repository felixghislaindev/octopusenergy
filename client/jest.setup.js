import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

afterEach(async () => {
  cleanup();

  await new Promise((resolve) => setTimeout(resolve, 50));

  if (typeof global.gc === "function") {
    global.gc();
  }
});
