import { v4 } from 'uuid';

export const newGuid = (): string => {
    return v4();
};
