import { postOrderTraversal } from './ast.ts';
import { Token } from './Token';
import { ASTNode } from './parser';

describe('postOrderTraversal', () => {
    it('should traverse a simple tree in post-order', () => {
        const tokens = [
            new Token('Literal', '3'),
            new Token('Operator', '+'),
            new Token('Literal', '4'),
        ];

        const tree = new ASTNode(tokens[1], new ASTNode(tokens[0], null, null), new ASTNode(tokens[2], null, null));

        const visitedTokens: Token[] = [];
        const handleToken = (token: Token) => {
            visitedTokens.push(token);
        };

        postOrderTraversal(tree, handleToken);

        expect(visitedTokens).toEqual([
            new Token('Literal', '3'),
            new Token('Literal', '4'),
            new Token('Operator', '+'),
        ]);
    });

    it('should traverse a more complex tree in post-order', () => {
        const tokens = [
            new Token('Literal', '1'),
            new Token('Operator', '+'),
            new Token('Literal', '2'),
            new Token('Operator', '*'),
            new Token('Literal', '3'),
        ];

        const tree = new ASTNode(
            tokens[3],
            new ASTNode(tokens[1], new ASTNode(tokens[0], null, null), new ASTNode(tokens[2], null, null)),
            new ASTNode(tokens[4], null, null)
        );

        const visitedTokens: Token[] = [];
        const handleToken = (token: Token) => {
            visitedTokens.push(token);
        };

        postOrderTraversal(tree, handleToken);

        expect(visitedTokens).toEqual([
            new Token('Literal', '1'),
            new Token('Literal', '2'),
            new Token('Operator', '+'),
            new Token('Literal', '3'),
            new Token('Operator', '*'),
        ]);
    });

    it('should handle an empty tree', () => {
        const visitedTokens: Token[] = [];
        const handleToken = (token: Token) => {
            visitedTokens.push(token);
        };

        postOrderTraversal(null, handleToken);

        expect(visitedTokens).toEqual([]);
    });
});
