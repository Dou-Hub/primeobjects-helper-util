import csv from 'csvtojson';

export const csvToJson = async (s: string, onRecordReady?: (record: Record<string, any>) => {}): Promise<Array<Record<string, any>>> => {
    return new Promise((resolve, reject) => {
        csv().fromString(s)
            .subscribe((r: Record<string, any>) => {
                //this trigged at the record
                if (onRecordReady) onRecordReady(r);
            })
            .then((result: Array<Record<string, any>>) => {
                resolve(result)
            }, (error: any) => {
                reject(error);
            });
    });
}
