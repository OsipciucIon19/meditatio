import {Subject} from './subject'
import {User} from './user'

export interface Course {
    _id: string
    title: string
    category: string
    description: string
    imagePath: string
    price: number
    status: string
    content: string,
    subject?: Subject
    teachers: Array<User>
}