import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",  // Ajusta al puerto de tu Angular
    setupNodeEvents(on, config) {
      // Implementar eventos si es necesario
    },
  },
});