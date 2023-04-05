module.exports = class CourseDto {
	title: string
	category: string
	description: string
	imagePath: string
	price: number
	status: string
	content: string
    
	constructor(model) {
		this.title = model.title
		this.category = model.category
		this.description = model.description
		this.imagePath = model.imagePath
		this.price = model.price
		this.status = model.status
		this.content = model.content
	}
}
