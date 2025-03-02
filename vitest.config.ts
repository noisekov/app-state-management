import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        exclude: [...configDefaults.exclude, 'packages/template/*'],
        environment: 'jsdom',
        globals: true,
        coverage: {
            provider: 'v8',
            include: ['**/*.tsx'],
            exclude: [
                '**/node_modules/**',
                './*',
                '**/*.spec.tsx',
                'src/__tests__/setup.ts',
            ],
        },
    },
});
