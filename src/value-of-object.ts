
import {
    isObject as _isObject, isNil, isString,
    isArray, forOwn, camelCase, isNaN, isBoolean
} from "lodash";

const isNonEmptyString = (s: any, trim?: boolean): boolean => {
    return (
        isString(s) &&
        ((!trim && s.length > 0) || (trim && s.trim().length > 0))
    ) ? true : false;
};

export const getObjectPropValue = (obj: Record<string, any> | null | undefined, key: string, caseSensitive?: boolean) => {
    let value = null;

    if (!isNonEmptyString(key)) return value;

    forOwn(obj, (v: any, k: string) => {
        if (
            k &&
            v &&
            ((!caseSensitive && key.toLowerCase() == k.toLowerCase()) ||
                (caseSensitive && key === k))
        ) {
            value = v;
        }
    });

    return value;
};

export const getBooleanPropValue = (obj: Record<string, any> | null | undefined, key: string, defaultValue?: boolean) => {
    if (!isBoolean(defaultValue)) defaultValue = undefined;
    const val = getPropValueOfObject(obj, key);
    if (isBoolean(val)) return val;
    if (isString(val)) return val.toLowerCase().trim() == 'true';
    return defaultValue;
};


export const getIntValueOfObject = (obj: Record<string, any> | null | undefined, key: string, defaultValue?: number | null | undefined) => {
    if (!isNonEmptyString(defaultValue)) defaultValue = undefined;
    const val = getPropValueOfObject(obj, key);
    return !isNaN(parseInt(val)) ? parseInt(val) : defaultValue;
};

export const getFloatValueOfObject = (obj: Record<string, any> | null | undefined, key: string, defaultValue?: number | null | undefined) => {
    if (!isNonEmptyString(defaultValue)) defaultValue = undefined;
    const val = getPropValueOfObject(obj, key);
    return !isNaN(parseFloat(val)) ? parseFloat(val) : defaultValue;
};

export const getBooleanValueOfObject = (obj: Record<string, any> | null | undefined, key: string, defaultValue?: boolean | null | undefined) => {
    if (!isNonEmptyString(defaultValue)) defaultValue = undefined;
    const val = getPropValueOfObject(obj, key);
    if (`${val}`.toLowerCase() == 'true') return true;
    if (`${val}`.toLowerCase() == 'false') return false;
    return defaultValue;
};

export const getArrayPropValueOfObject = (obj: Record<string, any> | null | undefined, key: string, defaultValue?: any[] | null | undefined) => {
    if (!_isObject(defaultValue)) defaultValue = undefined;
    const val = getPropValueOfObject(obj, key);
    return isArray(val) ? val : isNonEmptyString(val) ? JSON.parse(val) : defaultValue;
};

export const getPropValueOfObject = (obj: Record<string, any> | null | undefined, key: string, defaultValue?: any | null | undefined) => {

    if (isNil(defaultValue)) defaultValue = undefined;
    if (!_isObject(obj) || !isNonEmptyString(key)) return null;
    let v = obj[key];
    if (!v) key = key.replace(/-/g, '');
    if (!v) v = obj[key.toLowerCase()];
    if (!v) v = obj[key.toUpperCase()];
    if (!v) v = obj[camelCase(key)];

    if (!v) {
        //try scan all props
        for (const p in obj) {
            if (p.toLowerCase() == key.toLowerCase()) return obj[p];
        }
    }
    return v;
};
