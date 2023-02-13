module.exports = class ApiError extends Error {
    status: number
    errors: Array<string>

    constructor(status: number, message: string, errors: Array<string> = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Utilizatorul nu este autorizat')
    }

    static BadRequest(message: string, errors: Array<string> = []) {
        return new ApiError(400, message, errors)
    }
    
    static RestrictedAccessError() {
        return new ApiError(403, 'Access Interzis')
    }
}
