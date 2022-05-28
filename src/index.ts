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
    doNothing
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
    GUID_EMPTY,
    _process,
    _track,
    _window
} from './constants';

export {
    COLORS,  SLATE, GRAY, ZINC, NEUTRAL, STONE, RED, ORANGE,
    AMBER, YELLOW, LIME, GREEN, EMERALD,
    TEAL, CYAN, SKY, BLUE, INDIGO, VIOLET,
    PURPLE, FUCHSIA, PINK, ROSE
} from './colors';

export {
    getFileType,
    getContentType,
    getAcceptExtension,
    getAcceptMIMEs,
    getAcceptFileExtensions
} from './file';