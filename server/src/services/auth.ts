import jwt, { SignOptions } from 'jsonwebtoken';

const signOptions: SignOptions = { expiresIn: '1h' }; // Properly typing the expiresIn option

function createToken(payload: object): string {
    return jwt.sign(payload, 'your_secret_key', signOptions);
}