import { JwtPayload } from "jsonwebtoken"
import { Request } from "express"

export type AuthenticationRequest = Request & JwtPayload



