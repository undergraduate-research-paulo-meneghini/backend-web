import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailGeneratorService {
    /**
     * Generates a unique email for a mother based on binomio ID
     * Format: mae{id}@app.com
     */
    generate(idBinomio: number): string {
        return `mae${idBinomio}@app.com`;
    }

    /**
     * Validates if an email follows the expected format
     */
    isValidFormat(email: string): boolean {
        const regex = /^mae\d+@app\.com$/;
        return regex.test(email);
    }
}
