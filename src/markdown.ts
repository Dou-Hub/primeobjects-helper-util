//  Copyright PrimeObjects Software Inc. and other contributors <https://www.primeobjects.com/>
//
//  This source code is licensed under the MIT license.
//  The detail information can be found in the LICENSE file in the root directory of this source tree.

import { marked } from "marked";
import { isNonEmptyString } from "./core";

export const markdown = (content: string): string => {
    return isNonEmptyString(content) ? marked(content) : "";
};
