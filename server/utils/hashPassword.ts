import crypto from 'crypto'

export const hashPassword = (password : string) => {
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, 'sha512').toString('hex');
}