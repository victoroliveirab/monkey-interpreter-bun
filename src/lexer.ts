import tokens, { keywords } from './tokens';
import type { Token } from './tokens';

import { isDigit, isLetter, isWhitespace } from './utils/string';

class Lexer {
    position: number = 0;
    char: string = '';
    constructor(private readonly input: string) {}

    nextToken(): Token {
        this.skipWhitespace();
        const char = this.readChar();
        switch (char) {
            // Operators
            case tokens.ASSIGN: {
                const nextChar = this.peekChar();
                if (nextChar === '=') {
                    this.readChar();
                    return this.buildToken(tokens.EQUAL, '==');
                }
                return this.buildToken(tokens.ASSIGN, char);
            }
            case tokens.ASTERISK: {
                return this.buildToken(tokens.ASTERISK, char);
            }
            case tokens.BANG: {
                const nextChar = this.peekChar();
                if (nextChar === '=') {
                    this.readChar();
                    return this.buildToken(tokens.DIFFERENT, '!=');
                }
                return this.buildToken(tokens.BANG, char);
            }
            case tokens.LESS_THAN: {
                return this.buildToken(tokens.LESS_THAN, char);
            }
            case tokens.MINUS: {
                return this.buildToken(tokens.MINUS, char);
            }
            case tokens.MORE_THAN: {
                return this.buildToken(tokens.MORE_THAN, char);
            }
            case tokens.PLUS: {
                return this.buildToken(tokens.PLUS, char);
            }
            case tokens.SLASH: {
                return this.buildToken(tokens.SLASH, char);
            }
            // Delimiters
            case tokens.CLOSE_BRACE: {
                return this.buildToken(tokens.CLOSE_BRACE, char);
            }
            case tokens.CLOSE_PARENTHESIS: {
                return this.buildToken(tokens.CLOSE_PARENTHESIS, char);
            }
            case tokens.COMMA: {
                return this.buildToken(tokens.COMMA, char);
            }
            case tokens.OPEN_BRACE: {
                return this.buildToken(tokens.OPEN_BRACE, char);
            }
            case tokens.OPEN_PARENTHESIS: {
                return this.buildToken(tokens.OPEN_PARENTHESIS, char);
            }
            case tokens.SEMICOLON: {
                return this.buildToken(tokens.SEMICOLON, char);
            }
            // EOF
            case tokens.EOF: {
                return this.buildToken(tokens.EOF, '');
            }
        }
        if (isLetter(char)) {
            const literal = this.readIdentifier();
            if (this.isKeyword(literal)) {
                return this.buildToken(keywords[literal], literal);
            }
            return this.buildToken(tokens.IDENT, literal);
        }
        if (isDigit(char)) {
            const literal = this.readNumber();
            return this.buildToken(tokens.INT, literal);
        }
        return this.buildToken(tokens.ILLEGAL, char);
    }

    private readChar() {
        return this.input[this.position++] ?? 'eof';
    }

    private peekChar(offset = 0) {
        return this.input[this.position + offset] ?? 'eof';
    }

    private readNumber() {
        const start = this.position - 1;
        while (isDigit(this.readChar()));
        return this.input.substring(start, --this.position);
    }

    private readIdentifier() {
        const start = this.position - 1;
        while (isLetter(this.readChar()));
        return this.input.substring(start, --this.position);
    }

    private buildToken(symbol: string, literal: string) {
        return {
            literal,
            type: symbol,
        };
    }

    private isKeyword(str: string) {
        return !!keywords[str];
    }

    private skipWhitespace() {
        while (isWhitespace(this.input[this.position])) ++this.position;
    }
}

export default Lexer;
