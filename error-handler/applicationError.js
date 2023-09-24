export class ApplicaationError extends Error{
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}