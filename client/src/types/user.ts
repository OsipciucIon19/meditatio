export interface User {
    firstName: string
    lastName: string
    email: string
    isActivated: boolean
    _id: string
    roles: Array<string>
}
