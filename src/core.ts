//  Copyright PrimeObjects Software Inc. and other contributors <https://www.primeobjects.com/>
//
//  This source code is licensed under the MIT license.
//  The detail information can be found in the LICENSE file in the root directory of this source tree.

import { isObject as _isObject, isNil, isString, sortBy, without, map, capitalize, isArray, isNumber, camelCase, isNaN, isInteger, isFunction } from "lodash";
// import { isValidNumber } from "libphonenumber-js";
import { GUID_EMPTY } from "./constants";

export type TWindow = Window &
    typeof globalThis & {
        attachEvent: (event: string, fn: any) => void;
        detachEvent: (event: string, fn: any) => void;
    };

export const getWindow = (): TWindow | Record<string, any> => {
    return typeof window !== "undefined" ? window : {};
};

export const getProcess = (): Record<string, any> => {
    return typeof process !== "undefined" ? process : {};
};

export const isSSR = (): boolean => {
    return typeof window === "undefined";
};

export const getGlobalEnv = (): boolean => {
    return getGlobalObject().env;
};

export const appTrackIsOn = (): boolean => {
    const global = getGlobalObject();
    if (`${global.APP_TRACK}` == `true`) return true;
    if (`${global.env?.APP_TRACK}` == `true`) return true;
    return false;
};

export const libTrackIsOn = (): boolean => {
    const global = getGlobalObject();
    if (`${global.LIB_TRACK}` == `true`) return true;
    if (`${global.env?.LIB_TRACK}` == `true`) return true;
    return false;
};

export const getPropName = (s: string): string => {
    return formatText(s.replace(/[^a-zA-Z0-9]/g, " ").replace(/[ ]{2,}/gi, " "), "camel");
};

//to handle TS6133: xxxx is declared but its value is never read.
export const doNothing = (o?: any) => {
    getProcess().doNothing = o;
};

export const stringToColor = (str: string, s?: number, l?: number) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = hash % 360;
    return `hsl(${h}, ${s && s >= 0 && s <= 100 ? s : 50}%, ${l && l >= 0 && l <= 100 ? l : 50}%)`;
};

export const isNonEmptyString = (s: any, trim?: boolean): boolean => {
    return isString(s) && ((!trim && s.length > 0) || (trim && s.trim().length > 0)) ? true : false;
};

export const isGuid = (v: any): boolean => {
    if (!isNonEmptyString(v)) return false;
    const pattern = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
    return pattern.test(v.replace("{", "").replace("}", "").toLowerCase()) ? true : false;
};

// export const isPhoneNumberAdvanced = (s: any): boolean => {
//     if (!isNonEmptyString(s)) return false;
//     return isValidNumber(s.trim().replace(/ /g, ""));
// };

export const isPhoneNumber = (s: string): boolean => {
    const pattern = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    return pattern.test(s.trim().replace(/ /g, ""));
};

export const isEmptyString = (s: any, trim?: boolean): boolean => {
    return isString(s) && ((!trim && s.length === 0) || (trim && s.trim().length === 0)) ? true : false;
};

export const assignDeep = (...args: any[]) => {
    const result: Record<string, any> = {};
    for (let i = 0; i < args.length; i++) {
        const item: any = args[i];
        if (_isObject(item)) {
            const objItem: Record<string, any> = item;
            for (const p in objItem) {
                const newPropValue = objItem[p];
                if (_isObject(newPropValue)) {
                    if (isArray(newPropValue)) {
                        result[p] = newPropValue;
                    } else {
                        result[p] = assignDeep({}, result[p], newPropValue);
                    }
                } else {
                    if (!isNil(newPropValue)) result[p] = newPropValue;
                }
            }
        }
    }

    return result;
};

export const assignStyles = (...args: Record<string, any>[]) => {
    let styles = {};
    for (let i = 0; i < args.length; i++) {
        styles = { ...styles, ...args[i] };
    }
    return styles;
};

export const getSubObject = (obj: Record<string, any> | null | undefined, props: string): Record<string, any> | undefined => {
    if (isNil(obj)) return undefined;
    const indirectEval = eval;
    return indirectEval(`(o)=>(({${props}}) => ({${props}}))(o)`)(obj);
};

export const timeDiff = (d1: Date, d2: Date, type: "second" | "sec" | "s" | "minute" | "min" | "m" | "hour" | "hr" | "h") => {
    const diffT = d1.getTime() - d2.getTime();
    if (type == "second" || type == "sec" || type == "s") return Math.floor(diffT / 1000);
    if (type == "minute" || type == "min" || type == "m") return Math.floor(diffT / 1000 / 60);
    if (type == "hour" || type == "hr" || type == "h") return Math.floor(diffT / 1000 / 60 / 60);
    return diffT;
};

export const getDateTimeString = (dt?: any, delimiter?: string) => {
    if (!delimiter) delimiter = "-";
    const s = (dt ? dt : new Date()).toISOString().replace("T", "-").replace(/:/g, "-").replace("Z", "").replace(/\./g, "-");
    return delimiter == "-" ? s : s.replace(/-/g, delimiter);
};

export const serialNumber = () => {
    const dt: Date = new Date();
    let dtString: string = new Date(dt.getTime() + dt.getTimezoneOffset() * 60000).toISOString();
    dtString = dtString.replace(/-/g, "").replace(/:/g, "").replace("Z", "").replace("T", "").replace(/[.]/g, "");
    const c: string[] = dtString.substring(1).split("");

    let result = "";
    let i = 0;
    while (i < c.length) {
        const n: number = i < c.length - 1 ? parseInt(c[i]) * 10 + parseInt(c[i + 1]) : parseInt(c[i]);
        if (n <= 9) {
            result = result + `n`;
            i = i + 2;
        } else if (n >= 10 && n < 36) {
            result = result + String.fromCharCode("a".charCodeAt(0) + n - 10);
            i = i + 2;
        } else if (n >= 36 && n < 62) {
            result = result + String.fromCharCode("A".charCodeAt(0) + n - 36);
            i = i + 2;
        } else {
            result = result + c[i];
            i = i + 1;
        }
    }
    return result;
};

export const ttl = (mins: number) => {
    if (!isNumber(mins)) mins = 60;
    const date = Date.now();
    return Math.floor(date / 1000) + mins * 60;
};

export const getGlobalObject = () => {
    let global: Record<string, any> = {};
    if (typeof window !== "undefined") {
        global = window;
    } else {
        if (typeof process !== "undefined") global = process;
    }
    return global;
};

export const checkToTrue = (js: string, props: any): boolean => {
    if (!_isObject(props)) props = {};

    try {
        const func = isFunction(props.jsEvalFunction) ? props.jsEvalFunction(js) : null;
        if (!isFunction(func)) {
            if (func) return true;
        } else {
            if (func(props)) return true;
        }
    } catch (ex) {
        console.error("Error when evaluating checkToTrue", { ex, js });
    }

    return false;
};

export const isIntString = (v: string): boolean => {
    if (!/^-?\d+?$/.test(v)) return false;
    const parsed = parseInt(v);
    return !isNaN(parsed);
};

export const isFloatString = (v: string): boolean => {
    if (!/^-?\d+(?:[.]\d*?)?$/.test(v)) return false;
    const parsed = parseFloat(v);
    return !isNaN(parsed);
};

export const isEmail = (email: string): boolean => {
    if (isNonEmptyString(email)) email = email.trim().replace(/ /g, "").replace(/[+]/g, "");
    const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(email);
};

export const isPassword = (v: string, settings?: any) => {
    if (!_isObject(settings)) settings = {};

    const { needLowerCaseLetter, needUpperCaseLetter, needDigit, needSpecialChar, minLen } = settings;

    if (isNonEmptyString(v)) v = v.trim().replace(/ /g, "");
    if (!isNonEmptyString(v)) return false;

    if (v.length < (!isInteger(minLen) ? 8 : minLen)) return false;

    let result = true;

    if (needDigit) {
        result = new RegExp(/^(?=.*[\d])[\w!@#$%.^&*]+$/).test(v);
        if (!result) console.log("Password does not contain digit.");
    }

    if (result && needUpperCaseLetter) {
        result = new RegExp(/^(?=.*[A-Z])[\w!@#$%.^&*]+$/).test(v);
        if (!result) console.log("Password does not contain uppercase letter.");
    }

    if (result && needLowerCaseLetter) {
        result = new RegExp(/^(?=.*[a-z])[\w!@#$%.^&*]+$/).test(v);
        if (!result) console.log("Password does not contain lowercase letter.");
    }

    if (result && needSpecialChar) {
        result = new RegExp(/^(?=.*[!@#$%^&*])[\w!@#$%.^&*]+$/).test(v);
        if (!result) console.log("Password does not contain special character.");
    }

    return result;
};

export const utcISOString = (dt?: Date, minutesDiff?: number): string => {
    if (!dt) dt = new Date();
    if (isNumber(minutesDiff)) dt.setMinutes(dt.getMinutes() + minutesDiff);
    return dt.toISOString();
};

export const utcMaxISOString = (): string => {
    return utcISOString(new Date("9999-12-31T23:59:59.999Z"), 0);
};

export const formatString = (...args: string[]) => {
    if (args.length == 0) return null;
    let s = args[0];
    for (let i = 1; i < args.length; i++) {
        s = s.replace(/\{0\}/g, args[i]);
    }
    return s;
};

export const shortenString = (s: string, l: number): string => {
    return s.length <= l ? s : `${s.substring(0, l)} ...`;
};

//the isObject from lodash will cause error from typescript
//this one will not
export const isObject = (v: any): boolean => {
    return _isObject(v) ? true : false;
};

export const isObjectString = (s: string): boolean => {
    try {
        JSON.parse(s);
        return true;
    } catch {
        return false;
    }
};

export const removeNoValueProperty = (data: Record<string, any>, removeEmptyString: boolean): Record<string, any> => {
    if (isArray(data)) {
        return without(
            map(data, (r) => {
                return r === undefined || r === null || (r === "" && removeEmptyString) ? null : _isObject(r) ? removeNoValueProperty(r, removeEmptyString) : r;
            }),
            null
        );
    }

    for (const p in data) {
        const v = data[p];

        if (v === undefined || v === null || (v === "" && removeEmptyString)) {
            delete data[p];
        } else {
            if (isArray(v)) {
                data[p] = without(
                    map(v, (r) => {
                        return r === undefined || r === null || (r === "" && removeEmptyString) ? null : _isObject(r) ? removeNoValueProperty(r, removeEmptyString) : r;
                    }),
                    null
                );
            } else {
                if (_isObject(v)) {
                    data[p] = removeNoValueProperty(v, removeEmptyString);
                }
            }
        }
    }

    return data;
};

export const groupItems = (data: Array<Record<string, any>>, groups: Array<Record<string, any>>, propNameForItemGroup?: string, propNameForItemSort?: string): Array<Record<string, any>> => {
    if (!(isArray(data) && data.length > 0)) return [];
    propNameForItemGroup = propNameForItemGroup ? propNameForItemGroup : "group";
    propNameForItemSort = propNameForItemSort ? propNameForItemSort : "fullName";

    const result = map(groups, (group) => {
        return {
            ...group,
            data: sortBy(
                without(
                    map(data, (item: Record<string, any>) => {
                        return propNameForItemGroup && item[propNameForItemGroup] == group.id ? item : null;
                    }),
                    null
                ),
                (item: Record<string, any>) => {
                    return propNameForItemSort && item[propNameForItemSort];
                }
            )
        };
    });
    return result;
};

export const shortenNumber = (num: number, fractionDigits?: number) => {
    if (!isNumber(fractionDigits) || (isNumber(fractionDigits) && fractionDigits < 0)) fractionDigits = 1;
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    //const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value;
        });
    return item ? item && (num / item.value).toFixed(fractionDigits) + item.symbol : "0";
};

export const numberWithCommas = (x: number) => {
    if (!isNumber(x)) return null;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatText = (text: string, format: "lower" | "upper" | "capital" | "capital-first" | "capital-all" | "camel" | "initials") => {
    switch (format) {
        case "lower":
            return text.toLowerCase();
        case "upper":
            return text.toUpperCase();
        case "capital":
        case "capital-first":
            return capitalize(text);
        case "capital-all":
            return map(text.split(" "), capitalize).join(" ");
        case "initials":
            return map(text.split(" "), (t) => (t.length > 0 ? t.charAt(0) : "")).join(" ");
        case "camel":
            return camelCase(text);
        default:
            return text;
    }
};

export const readableFileSize = (fileSizeInBytes: number) => {
    if (!isNumber(fileSizeInBytes)) return "";
    let i = -1;
    const byteUnits = [" KB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};

export const formatJSONString = (c: string) => {
    const jsonValue = isNonEmptyString(c) ? JSON.parse(c) : c;

    try {
        return JSON.stringify(jsonValue, null, 4);
    } catch (ex) {
        //console.log({ v, ex })
    }

    return JSON.stringify(jsonValue);
};

export const deepFlatten = (array: Array<any>): Array<any> => {
    let result: Array<any> = [];
    array.forEach(function (elem) {
        if (Array.isArray(elem)) {
            result = result.concat(deepFlatten(elem));
        } else {
            result.push(elem);
        }
    });

    return result;
};

export const getCache = (key: string, defaultValue?: any) => {
    if (!isNonEmptyString(key)) return null;

    const global = getGlobalObject();

    if (!isObject(global.localCache)) global.localCache = {};

    let data = null;

    const cacheData = global.localCache[key];
    if (isNil(cacheData)) return defaultValue;

    if (isNonEmptyString(cacheData)) {
        try {
            data = JSON.parse(cacheData);
            if (isObject(data) && isInteger(data.ttl)) {
                //ttl in seconds
                if (Date.now() > data.ttl * 1000) {
                    removeCache(key);
                    return !isNil(defaultValue) ? defaultValue : null;
                } else {
                    return data.data;
                }
            }
        } catch {
            data = cacheData;
        }
    } else {
        data = cacheData;
    }

    return !isNil(data) ? data : !isNil(defaultValue) ? defaultValue : null;
};

export const setCache = (key: string, data: any, expireMinutes?: number) => {
    const global = getGlobalObject();

    if (!isNonEmptyString(key)) return null;
    if (!isObject(global.localCache)) global.localCache = {};
    if (isNil(data)) return removeCache(key);

    if (!isNil(expireMinutes) && isInteger(expireMinutes) && expireMinutes > 0) {
        const cacheData = { data, ttl: ttl(expireMinutes) };
        global.localCache[key] = JSON.stringify(cacheData);
    } else {
        global.localCache[key] = isObject(data) ? JSON.stringify(data) : data;
    }
};

export const removeCache = (key: string) => {
    const global = getGlobalObject();
    if (!isObject(global.localCache)) global.localCache = {};
    delete global.localCache[key];
};

export const cleanGuid = (v: string): string => {
    return !v ? "" : (v + "").replace("{", "").replace("}", "").replace(/_/g, "-").trim().toLowerCase();
};

export const sameGuid = (a: string, b: string): boolean => {
    return cleanGuid(a) === cleanGuid(b);
};

export const isEmptyGuid = (v: string) => {
    return sameGuid(v, GUID_EMPTY);
};

export const convertEnumToArray = (thisEnum: any): { key: string; value: string | number }[] => {
    let result = [];
    let i = Object.keys(thisEnum).length / 2;
    for (let key in thisEnum) {
        i--;
        if (i < 0) result.push({ key, value: thisEnum[key] });
    }
    return result;
};
