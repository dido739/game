// Updated code in server/src/services/auth.ts to fix JWT sign type error

// ... (previous code)

const options: JwtSignOptions = {\n    algorithm: 'HS256',\n    // Other options\n};\n\ngenerateToken(payload: object) {\n    return jwt.sign(payload, this.secret, options);\n}

// ... (following code)