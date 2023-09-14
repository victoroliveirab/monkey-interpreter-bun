const A = 'A'.charCodeAt(0);
const Z = 'Z'.charCodeAt(0);
const a = 'a'.charCodeAt(0);
const z = 'z'.charCodeAt(0);

const zero = '0'.charCodeAt(0);
const nine = '9'.charCodeAt(0);

export function isLetter(char: string) {
    const charCode = char.charCodeAt(0);
    return (charCode >= A && charCode <= Z) || (charCode >= a && charCode <= z);
}

export function isWhitespace(char: string) {
    return char == ' ' || char == '\t' || char == '\n' || char == '\r';
}

export function isDigit(char: string) {
    const charCode = char.charCodeAt(0);
    return charCode >= zero && charCode <= nine;
}
