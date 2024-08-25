import { Tokenizer } from './tokenize';
import { Token } from './Token';

describe('Tokenizer', () => {
    it('should tokenize a simple expression', () => {
        const tokenizer = new Tokenizer();
        const tokens = tokenizer.tokenize('3 + 4 * 2 / ( 1 - 5 ) ^ 2 % 10 √ 16');
        expect(tokens).toEqual([
            new Token('Literal', '3'),
            new Token('Operator', '+'),
            new Token('Literal', '4'),
            new Token('Operator', '*'),
            new Token('Literal', '2'),
            new Token('Operator', '/'),
            new Token('Left Parenthesis', '('),
            new Token('Literal', '1'),
            new Token('Operator', '-'),
            new Token('Literal', '5'),
            new Token('Right Parenthesis', ')'),
            new Token('Operator', '^'),
            new Token('Literal', '2'),
            new Token('Operator', '%'),
            new Token('Literal', '10'),
            new Token('Operator', '√'),
            new Token('Literal', '16'),
        ]);
    });

    it('should tokenize an expression with variables', () => {
        const tokenizer = new Tokenizer();
        const tokens = tokenizer.tokenize('a + b * c');
        expect(tokens).toEqual([
            new Token('Variable', 'a'),
            new Token('Operator', '+'),
            new Token('Variable', 'b'),
            new Token('Operator', '*'),
            new Token('Variable', 'c'),
        ]);
    });
});
