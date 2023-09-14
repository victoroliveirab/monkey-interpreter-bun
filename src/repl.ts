import type { ReadStream, WriteStream } from 'tty';

import Lexer from './lexer';
import tokens from './tokens';
import type { Token } from './tokens';

const PROMPT = '>> ';

export default async function start(
    input: ReadStream | Console,
    output: WriteStream,
) {
    output.write(PROMPT);
    for await (const rawLine of input) {
        const line = String(rawLine);
        const lexer = new Lexer(line);
        let token: Token;
        do {
            token = lexer.nextToken();
            output.write(
                `{ literal: '${token.literal}', type: ${token.type} }\n`,
            );
        } while (token.type !== tokens.EOF);
        output.write(PROMPT);
    }
}
