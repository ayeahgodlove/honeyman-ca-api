// src/domain/exceptions/validation.exception.ts

export class ValidationException extends Error {
    constructor(errors: any[]) {
        super(`Validation failed: ${errors.join(', ')}`);
        this.name = 'ValidationException';
    }
}
