import jwt, { JwtPayload } from 'jsonwebtoken'
const secretKey = 'type1234'

export const generateToken = (idusers: number) => {
    return jwt.sign ({ idusers }, secretKey, { expiresIn: '1h'})
}

export const verifyToken = (token: string): JwtPayload | null => {
    try{
        const decodedToken = jwt.verify (token, secretKey) as JwtPayload
        return decodedToken
    } catch (error) {
        console.error ('Error al verificar el Token:' ,error)
        return null
    }
    
}

export const generateVerificationToken = (idusers: number) => {
    return jwt.sign ({ idusers }, secretKey, { expiresIn: '24h'})
}