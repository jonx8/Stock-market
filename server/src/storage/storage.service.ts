import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import * as fs from 'fs';
import StockHistoryDto from '../stocks/dto/stock-history.dto';

@Injectable()
export class StorageService {
    private readonly storageDir: string = path.join(
        __dirname,
        '..',
        '..',
        'data',
    );

    public async load(fileName: string) {
        const data: string = await fs.promises.readFile(
            path.join(this.storageDir, fileName),
            'utf-8',
        );
        return JSON.parse(data);
    }

    public loadHistoryFile(fileName: string) {
        return new Promise<StockHistoryDto>((resolve, reject) => {
            const data: StockHistoryDto = {
                prices: [] as number[],
                dates: [] as string[],
            };
            fs.createReadStream(path.join(this.storageDir, fileName))
                .pipe(csv())
                .on('data', (row) => {
                    data.prices.push(parseFloat(row['Open'].substring(1)));
                    data.dates.push(row['Date']);
                })
                .on('end', () => {
                    resolve(data);
                })
                .on('error', (err) => {
                    reject(err);
                });
        });
    }

    async save(fileName: string, data: any[]) {
        writeFile(
            path.resolve(this.storageDir, fileName),
            JSON.stringify(data),
            (err) => {
                if (err) throw err;
            },
        );
    }
}
