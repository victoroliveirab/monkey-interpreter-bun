import { describe, expect, test } from 'bun:test';

import Lexer from '../src/lexer';
import tokens from '../src/tokens';
import type { Token } from '../src/tokens';

describe('Lexer', () => {
    test('Should recognize all simple tokens', () => {
        const input = '=+(){},;!-/*5><';
        const expected: Token[] = [
            { literal: '=', type: tokens.ASSIGN },
            { literal: '+', type: tokens.PLUS },
            { literal: '(', type: tokens.OPEN_PARENTHESIS },
            { literal: ')', type: tokens.CLOSE_PARENTHESIS },
            { literal: '{', type: tokens.OPEN_BRACE },
            { literal: '}', type: tokens.CLOSE_BRACE },
            { literal: ',', type: tokens.COMMA },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: '!', type: tokens.BANG },
            { literal: '-', type: tokens.MINUS },
            { literal: '/', type: tokens.SLASH },
            { literal: '*', type: tokens.ASTERISK },
            { literal: '5', type: tokens.INT },
            { literal: '>', type: tokens.MORE_THAN },
            { literal: '<', type: tokens.LESS_THAN },
        ];

        const lexer = new Lexer(input);

        for (let i = 0; i < input.length; ++i) {
            const token = lexer.nextToken();
            expect(token).toEqual(expected[i]);
        }
    });

    test('Should recognize if else statements', () => {
        const input = `if (5 < 10) {
                         return true;
                       } else {
                         return false
                       }`;
        const expected: Token[] = [
            { literal: 'if', type: tokens.IF },
            { literal: '(', type: tokens.OPEN_PARENTHESIS },
            { literal: '5', type: tokens.INT },
            { literal: '<', type: tokens.LESS_THAN },
            { literal: '10', type: tokens.INT },
            { literal: ')', type: tokens.CLOSE_PARENTHESIS },
            { literal: '{', type: tokens.OPEN_BRACE },
            { literal: 'return', type: tokens.RETURN },
            { literal: 'true', type: tokens.TRUE },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: '}', type: tokens.CLOSE_BRACE },
            { literal: 'else', type: tokens.ELSE },
            { literal: '{', type: tokens.OPEN_BRACE },
            { literal: 'return', type: tokens.RETURN },
            { literal: 'false', type: tokens.FALSE },
            { literal: '}', type: tokens.CLOSE_BRACE },
            { literal: '', type: tokens.EOF },
        ];

        const lexer = new Lexer(input);
        let token: Token;
        let i = 0;
        do {
            token = lexer.nextToken();
            expect(token).toEqual(expected[i++]);
        } while (token.type !== tokens.EOF);
    });

    test('Should recognize two character operators', () => {
        const input = `10 == 10;
                       5 != 9; 
                      `;
        const expected: Token[] = [
            { literal: '10', type: tokens.INT },
            { literal: '==', type: tokens.EQUAL },
            { literal: '10', type: tokens.INT },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: '5', type: tokens.INT },
            { literal: '!=', type: tokens.DIFFERENT },
            { literal: '9', type: tokens.INT },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: '', type: tokens.EOF },
        ];

        const lexer = new Lexer(input);
        let token: Token;
        let i = 0;
        do {
            token = lexer.nextToken();
            expect(token).toEqual(expected[i++]);
        } while (token.type !== tokens.EOF);
    });

    test('Should read a simple program', () => {
        const input = `let five = 5;
                       let ten = 10;
                       let add = fn(x, y) {
                         x + y;
                       };

                       let result = add(five, ten);
                      `;
        const expected: Token[] = [
            { literal: 'let', type: tokens.LET },
            { literal: 'five', type: tokens.IDENT },
            { literal: '=', type: tokens.ASSIGN },
            { literal: '5', type: tokens.INT },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: 'let', type: tokens.LET },
            { literal: 'ten', type: tokens.IDENT },
            { literal: '=', type: tokens.ASSIGN },
            { literal: '10', type: tokens.INT },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: 'let', type: tokens.LET },
            { literal: 'add', type: tokens.IDENT },
            { literal: '=', type: tokens.ASSIGN },
            { literal: 'fn', type: tokens.FUNCTION },
            { literal: '(', type: tokens.OPEN_PARENTHESIS },
            { literal: 'x', type: tokens.IDENT },
            { literal: ',', type: tokens.COMMA },
            { literal: 'y', type: tokens.IDENT },
            { literal: ')', type: tokens.CLOSE_PARENTHESIS },
            { literal: '{', type: tokens.OPEN_BRACE },
            { literal: 'x', type: tokens.IDENT },
            { literal: '+', type: tokens.PLUS },
            { literal: 'y', type: tokens.IDENT },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: '}', type: tokens.CLOSE_BRACE },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: 'let', type: tokens.LET },
            { literal: 'result', type: tokens.IDENT },
            { literal: '=', type: tokens.ASSIGN },
            { literal: 'add', type: tokens.IDENT },
            { literal: '(', type: tokens.OPEN_PARENTHESIS },
            { literal: 'five', type: tokens.IDENT },
            { literal: ',', type: tokens.COMMA },
            { literal: 'ten', type: tokens.IDENT },
            { literal: ')', type: tokens.CLOSE_PARENTHESIS },
            { literal: ';', type: tokens.SEMICOLON },
            { literal: '', type: tokens.EOF },
        ];

        const lexer = new Lexer(input);
        let token: Token;
        let i = 0;
        do {
            token = lexer.nextToken();
            expect(token).toEqual(expected[i++]);
        } while (token.type !== tokens.EOF);
    });
});
