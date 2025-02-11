import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude, 'packages/template/*'],
        environment: 'jsdom',
        coverage: {
            include: ['**/*.tsx'],
            exclude: [
                '**/node_modules/**',
                '**/*.test.tsx',
                '**/*.spec.tsx',
                'src/__tests__/setup.ts',
            ],
        },
    },
});
