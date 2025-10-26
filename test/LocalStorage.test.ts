import jest from 'jest'

describe('LocalStorage tests', () => {
    beforeAll(() => {
        const testValues: object[] = [
            { empty: Object.freeze({}) },
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
    })
})
