function Set<T>(key: string, payload: T): T {
    localStorage.setItem(key, JSON.stringify(payload))
    return payload
}

function Get<T>(key: string): T {
    const payload = localStorage.getItem(key)
    if (!payload) throw new InvalidStoredValueError(key)
    let result: T = JSON.parse(payload)
    return result
}

function GetProperty<T>(path: string): T {
    const parsedPath: string[] = path.split('.')
    const payload: object = Get<Object>(parsedPath[0])
    let depth: number = 0
    let result: T

    if (Object.keys.length === 0)
        throw new InvalidStoredValueError(`${parsedPath[0]} returned an empty object`)

    parsedPath.slice(1)

    return DigToProperty<T>(payload, parsedPath, depth)
}

function DigToProperty<T>(obj: Object, parsedPath: string[], depth: number, depthLimit: number = 10) {
    if(!obj)
        throw new InvalidStoredValueError('undefined')

    if (parsedPath.length === 0){
        parsedPath.slice(1)
        return DigToProperty(obj, parsedPath, depthLimit, depth+1)
    }
    else return obj as T
}

class InvalidStoredValueError extends Error {
    constructor(key: string) {
        console.log()
        super(`Stored value ${key} is invalid.`)
    }
}

class InvalidPayloadError extends Error {
    constructor(key: string) {
        super(`Cannot save ${key} to localstorage. The payload is invalid.`)
    }
}

const LocalStorage = {
    Set: <T>(key: string, payload: T) => Set<T>(key, payload),
    Get: <T>(key: string) => Get<T>(key),
    GetProperty: <T>(path: string) => GetProperty(path),
}

export { LocalStorage as default }
