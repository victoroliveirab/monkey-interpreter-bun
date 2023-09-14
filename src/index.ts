import repl from './repl';

const { env, stdin, stdout } = process;
const { USER } = env;

stdout.write(`Hello ${USER}! This is the Monkey programming language!\n`);
stdout.write('Fell free to type in commands\n');

repl(stdin, stdout);
