import * as jwt from 'react-jwt';
import { ServerError, UnAuthorizedError, UnexpectedError } from '../modules/auth/login.exception';

export async function LoginUser(_email, _pass) {
    try {
        const response = await fetch(`/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: _email, password: _pass })
        })
        const responseBody = await response.json()
    
        if (response.status >= 500) {
            throw ServerError.generate()
        } 
        
        if (response.status >= 400) {
            throw UnAuthorizedError.generate(responseBody.message)
        }

    
        return responseBody;
    } catch (error) {
        if (error instanceof ServerError || error instanceof UnAuthorizedError) {
            throw error
        }

        throw UnexpectedError.generate()
    }
}

export async function RegisterUser(_email, _pass) {

    const response = await fetch(`/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: _email, password: _pass })
    })

    return await response.json();

}

export function TokenIsValid(_token) {
    jwt.decodeToken(_token);

    if (jwt.isExpired(_token)) {
        return false
    }
    return true
}