module.exports = class UserDto {
    firstName: string
    lastName: string
    email: string
    roles: Array<string>
    id: string
    isActivated: boolean

    constructor(model) {
        this.firstName = model.firstName
        this.lastName = model.lastName
        this.email = model.email
        this.roles = model.roles
        this.id = model._id
        this.isActivated = model.isActivated
    }
}
