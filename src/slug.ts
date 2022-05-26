import slugify from 'slugify';
import { isString } from 'lodash';

export const slug = (text: string) => {
    return !isString(text) ? null : slugify(text.replace(/_/g, '-'), {
        lower: true,
        remove: /[=:?#@!$&'()*+,;"<>%{}|\\^`]/g
    })
        .replace(/\./g, '-')
        .replace(/\//g, '-')
        .toLowerCase();
};

