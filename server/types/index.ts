export interface Course extends Document {
    title: string,
    category: string,
    description: string,
    imagePath: string,
    price: number,
    status: string,
    content: string
}

export interface Role extends Document {
    value: string
}

export interface Subject extends Document {
    title: string,
    grade: number
}

export interface User extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles: Array<Role>,
    isActivated: boolean,
    activationLink: string,
    subjects?: Array<Subject>,
    phoneNumber?: string
}

export interface TeacherRequest extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    subjects: Array<Subject>,
    phoneNumber?: string,
    status: string
}

export interface Token extends Document {
    user: string,
    refreshToken: string,
}