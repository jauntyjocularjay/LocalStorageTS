import {LocalStorage as localStorage} from 'node-localstorage'



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
    let parsedPath: string[] = path.split('.')
    const payload: Record <string, any> = GetIntermediatePayload(parsedPath)
    parsedPath = parsedPath.slice(1)

    return DigToProperty<T>(payload, parsedPath, 0)
}

function GetIntermediatePayload(parsedPath: string[]) {
    if (!parsedPath[0] || parsedPath[0] === '')
        throw new InvalidStoredValueError('property path')
    
    const payload: Record<string, any> = Get<Record<string, any>>(parsedPath[0])
    
    if (Object.keys(payload).length === 0)
        throw new InvalidStoredValueError('IntermediaPayloadPath')

    return payload
}

function DigToProperty<T>(
    obj: Record<string, any>,
    parsedPath: string[],
    depth: number,
    depthLimit: number = 10
) {
    if (!obj) throw new InvalidStoredValueError('Record<string, any> key')
    if (!parsedPath[0]) throw new Error('Reached the end of the path without a result')

    if (parsedPath.length === 0) {
        return obj as T
    } else {
        const [key, ...reducedParsedPath] = parsedPath
        obj = obj[key]
        return DigToProperty(obj, reducedParsedPath, depth + 1, depthLimit)
    }
}

class InvalidStoredValueError extends Error {
    constructor(key: string) {
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
