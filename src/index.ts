export {
    stringToColor,
    isNonEmptyString,
    isGuid,
    isPhoneNumber,
    isEmptyString,
    assignDeep,
    assignStyles,
    getSubObject,
    timeDiff,
    serialNumber,
    getDateTimeString,
    ttl,
    getMemoryCache,
    setMemoryCache,
    isEmptyGuid,
    checkToTrue,
    isIntString,
    isFloatString,
    isEmail,
    isPassword,
    utcISOString,
    utcMaxISOString,
    formatString,
    shortenString,
    removeNoValueProperty,
    isObject,
    isObjectString,
    groupItems,
    shortenNumber,
    numberWithCommas,
    formatText,
    readableFileSize,
    formatJSONString,
    deepFlatten,
    getPropName,
    doNothing,
    _process,
    _track
} from './core';

export { slug } from './slug';
export { newGuid } from './uuid';
export { csvToJson } from './csv';

export {
    getObjectPropValue,
    getBooleanPropValue,
    getIntValueOfObject,
    getArrayPropValueOfObject,
    getPropValueOfObject
} from './value-of-object';

export {
    getWebQueryValue,
    setWebQueryValue,
    getWebLocation,
    getWebRootUrl,
    fixUrl,
    getBaseDomain
} from './web';

export {
    GUID_EMPTY
} from './constants';