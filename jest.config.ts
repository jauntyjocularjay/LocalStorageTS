import type { Config } from 'jest'

export default async (): Promise<Config> => {
    return {
        verbose: true,
        transform: {},
        preset: 'ts-jest/presets/js-with-ts-esm',
        extensionsToTreatAsEsm: ['.ts'],
        testEnvironment: 'node',
        globals: {
            'ts-jest': {
                useESM: true,
            },
        },
        
    }
}
