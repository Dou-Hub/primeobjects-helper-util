//  Copyright PrimeObjects Software Inc. and other contributors <https://www.primeobjects.com/>
// 
//  This source code is licensed under the MIT license.
//  The detail information can be found in the LICENSE file in the root directory of this source tree.


import { isNonEmptyString, isObject } from "./core";
import { find } from "lodash";

/**
 * It returns an entity from a solution object, if it exists
 * @param solution - Record<string, any>
 * @param {string} entityName - The name of the entity you want to get.
 * @param {string} [entityType] - The type of entity you want to retrieve.
 */
export const getEntity = (solution: Record<string, any>, entityName: string, entityType?: string): Record<string, any> | null => {

    if (!isNonEmptyString(entityName)) return null;

    let entity = find(solution.entities, (entity) => {
        return entity.entityName === entityName && entity.entityType === entityType;
    });

    if (!isObject(entity)) {
        //we will try to use entityName only
        entity = find(solution.entities, (entity) => {
            return entity.entityName === entityName && !entity.entityType;
        });
    }

    return isObject(entity) ? entity : null;
};


/**
 * It takes a solution object and a slug string and returns the entity object that matches the slug or
 * null if no match is found
 * @param solution - Record<string, any>
 * @param {string} slug - string
 * @returns A function that takes two arguments, solution and slug.
 */
export const getEntityBySlug = (solution: Record<string, any>, slug: string): Record<string, any> | null => {

    if (!isNonEmptyString(slug)) return null;

    let entity = find(solution.entities, (entity) => {
        return entity.slug === slug;
    });

    return isObject(entity) ? entity : null;
};


/**
 * It takes a file name as a string and returns a string that represents the type of file
 * @param {string} fileName - string
 * @returns A string or null.
 */
export const getEntityTypeFromFileName = (fileName: string): string | null => {
    if (!isNonEmptyString(fileName)) return null;
    const fileInfo = fileName.split('?')[0];
    var ext = fileInfo.split('.');
    switch (ext[ext.length - 1].toLowerCase()) {
        case 'gif':
        case 'jpeg':
        case 'jpg':
        case 'png':
            {
                return 'Photo';
            }
        case 'mp4':
            {
                return 'Video';
            }
        case 'mp3':
            {
                return 'Audio';
            }
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'csv':
        case 'txt':
        case 'pdf':
        case 'ppt':
        case 'pptx':
        case 'zip':
            {
                return 'Document';
            }
        default:
            {
                return null;
            }
    }
};

