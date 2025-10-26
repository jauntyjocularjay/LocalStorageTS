import LocalStorage from '../LocalStorage.ts'

describe('LocalStorage tests', () => {
    beforeAll(() => {
        const testValues: object[] = [
            { schema: Object.freeze({ array: 'array'} )},
            {
                elevenLevels: Object.freeze({
                    one: {
                        two: {
                            three: {
                                four: {
                                    five: {
                                        six: {
                                            seven: {
                                                eight: {
                                                    nine: {
                                                        ten: {
                                                            eleven: {},
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                }),
            },
        ]
        const errorVAlues: object[] = [{ empty: Object.freeze({}) }]

        testValues.forEach(value => {
            for (let [key, payload] of Object.entries(value)) {
                // LocalStorage.Set(key, payload)
            }
        })
    })

    // describe('Get', () => {
    //     test('Simple retrieval works', () => {
    //         const schema = LocalStorage.Get('schema')
    //         expect(schema).toBeDefined()

    //     })
    // })
})
