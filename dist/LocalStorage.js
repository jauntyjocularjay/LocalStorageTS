function Set(key, payload) {
    localStorage.setItem(key, JSON.stringify(payload));
    return payload;
}
function Get(key) {
    const payload = localStorage.getItem(key);
    if (!payload)
        throw new InvalidStoredValueError(key);
    let result = JSON.parse(payload);
    return result;
}
function GetProperty(path) {
    let parsedPath = path.split('.');
    const payload = GetIntermediatePayload(parsedPath);
    parsedPath = parsedPath.slice(1);
    return DigToProperty(payload, parsedPath, 0);
}
function GetIntermediatePayload(parsedPath) {
    if (!parsedPath[0] || parsedPath[0] === '')
        throw new InvalidStoredValueError('property path');
    const payload = Get(parsedPath[0]);
    if (Object.keys(payload).length === 0)
        throw new InvalidStoredValueError('IntermediaPayloadPath');
    return payload;
}
function DigToProperty(obj, parsedPath, depth, depthLimit = 10) {
    if (!obj)
        throw new InvalidStoredValueError('Record<string, any> key');
    if (!parsedPath[0])
        throw new Error('Reached the end of the path without a result');
    if (parsedPath.length === 0) {
        return obj;
    }
    else {
        const [key, ...reducedParsedPath] = parsedPath;
        obj = obj[key];
        return DigToProperty(obj, reducedParsedPath, depth + 1, depthLimit);
    }
}
class InvalidStoredValueError extends Error {
    constructor(key) {
        super(`Stored value ${key} is invalid.`);
    }
}
class InvalidPayloadError extends Error {
    constructor(key) {
        super(`Cannot save ${key} to localstorage. The payload is invalid.`);
    }
}
const LocalStorage = {
    Set: (key, payload) => Set(key, payload),
    Get: (key) => Get(key),
    GetProperty: (path) => GetProperty(path),
};
export { LocalStorage as default };
//# sourceMappingURL=LocalStorage.js.map