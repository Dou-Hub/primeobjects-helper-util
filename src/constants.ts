//  Copyright PrimeObjects Software Inc. and other contributors <https://www.primeobjects.com/>
// 
//  This source code is licensed under the MIT license.
//  The detail information can be found in the LICENSE file in the root directory of this source tree.

export const GUID_EMPTY = '00000000-0000-0000-0000-000000000000';
export const _window: any = typeof window !== "undefined" ? window : {};
export const _process: any = typeof process !== "undefined" ? process : {};
export const _track = `${_process?.env?.TRACK}`.toLowerCase() == 'true';
