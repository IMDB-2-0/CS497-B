/**
 * A simple email validator
 * @param email An email address
 * @returns a boolean wheter or not an email address is valid
 */
 export function emailValid(email: string): boolean {
    return /^[^\s@]+@[^\s@]+$/.test(email);
}