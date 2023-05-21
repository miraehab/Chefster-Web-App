import { verifyJwt } from "../auth"

export const getUserId = (token : string | undefined) => {
    return verifyJwt(token?.split(' ')[1]!).userId
}