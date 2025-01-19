import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/experimental-addon-test/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from "@vitejs/plugin-react"
const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  plugins: [
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/writing-tests/test-addon#storybooktest
    storybookTest({ configDir: path.join(dirname, '.storybook') }),
      react()
  ],
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium', name: "chromium" },
      ],
    },
    setupFiles: ['.storybook/vitest.setup.js'],
  },
});