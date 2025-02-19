import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [...configDefaults.exclude, 'packages/template/*'],
        environment: 'jsdom',
        globals: true,
        coverage: {
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
