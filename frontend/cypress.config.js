import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'sjxtav',
  e2e: {
    baseUrl: "http://localhost:5173",
    video: true,
    screenshotOnRunFailure: true,
  },
});