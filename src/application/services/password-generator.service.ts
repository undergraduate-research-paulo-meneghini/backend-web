import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordGeneratorService {
    private readonly SALT_ROUNDS = 10;

    /**
     * Generates a random secure password
     * Format: 8 characters with uppercase, lowercase, and numbers
     * Example: Abc12345
     */
    generate(): string {
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';

        let password = '';

        // Ensure at least one of each type
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));

        // Fill the rest with random characters
        const allChars = uppercase + lowercase + numbers;
        for (let i = 3; i < 8; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        // Shuffle the password
        return password.split('').sort(() => Math.random() - 0.5).join('');
    }

    /**
     * Hashes a password using bcrypt
     */
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.SALT_ROUNDS);
    }

    /**
     * Compares a plain text password with a hash
     */
    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
