import { Parser } from './parser';
import { Token } from './Token';

describe('Parser', () => {
    it('should parse a simple expression', () => {
        const parser = new Parser();
        const ast = parser.parse('3 + 4 * 2');
        expect(ast).not.toBeNull();

    });

    it('should parse an expression with parentheses', () => {
        const parser = new Parser();
        const ast = parser.parse('(1 + 2) * 3');
        expect(ast).not.toBeNull();

    });

    it('should parse an expression with percent and square root', () => {
        const parser = new Parser();
        const ast = parser.parse('10 % 20 √ 16');
        expect(ast).not.toBeNull();
    });
});
