export type UserData = {
    idusers: number,
    name: string,
    email: string,
    password: string,
    rolename: string
    verified: boolean
}

export type UserRegister  = Pick <UserData, 'email' | 'password' | 'name'  > 

export type UserUpdates = Pick <UserData, 'email' | 'password' | 'name'>
    
export type UserLogin = Pick <UserData, 'email' | 'password'>

export type UpdateState = Pick <UserData, 'verified' | 'idusers'>