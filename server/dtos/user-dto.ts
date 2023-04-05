module.exports = class UserDto {
	firstName: string
	lastName: string
	email: string
	roles: Array<string>
	_id: string
	isActivated: boolean

	constructor(model) {
		this.firstName = model.firstName
		this.lastName = model.lastName
		this.email = model.email
		this.roles = model.roles
		this._id = model._id
		this.isActivated = model.isActivated
	}
}
