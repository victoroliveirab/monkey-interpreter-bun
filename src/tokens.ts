const identifiersAndLiteralTokens = {
    IDENT: 'identifier',
    INT: 'integer',
};

export const operatorTokens = {
    ASSIGN: '=',
    ASTERISK: '*',
    BANG: '!',
    DIFFERENT: '!=',
    EQUAL: '==',
    MINUS: '-',
    PLUS: '+',
    SLASH: '/',
    LESS_THAN: '<',
    MORE_THAN: '>',
};

export const keywordTokens = {
    ELSE: 'else',
    FALSE: 'false',
    FUNCTION: 'function',
    IF: 'if',
    LET: 'let',
    RETURN: 'return',
    TRUE: 'true',
};

export const keywords: Record<string, string> = {
    else: keywordTokens.ELSE,
    false: keywordTokens.FALSE,
    fn: keywordTokens.FUNCTION,
    if: keywordTokens.IF,
    let: keywordTokens.LET,
    return: keywordTokens.RETURN,
    true: keywordTokens.TRUE,
};

export const delimiterTokens = {
    CLOSE_BRACE: '}',
    CLOSE_PARENTHESIS: ')',
    COMMA: ',',
    OPEN_BRACE: '{',
    OPEN_PARENTHESIS: '(',
    SEMICOLON: ';',
};

const tokenType: Record<string, string> = {
    ...identifiersAndLiteralTokens,
    ...operatorTokens,
    ...delimiterTokens,
    ...keywordTokens,
    EOF: 'eof',
    ILLEGAL: 'illegal',
};

type TokenType = string;

export type Token = {
    literal: string;
    type: TokenType;
};

export default tokenType;
