import { postOrderTraversal } from './expression-parser/ast';
import { Parser } from './expression-parser/parser.ts';

export const evaluateExpression = (expression) => {
    const parser = new Parser();
    const ast = parser.parse(expression);
    console.log(ast);

    let result = 0;
    let literals = [];

    postOrderTraversal(ast, (token) => {
        if (token.type === 'Operator') {
            if (token.value === '+') {
                result = literals[0] + literals[1];
            } else if (token.value === '-') {
                result = literals[0] - literals[1];
            } else if (token.value === '*') {
                result = literals[0] * literals[1];
            } else if (token.value === '/') {
                if (literals[1] === 0) {
                    throw new Error("Division by zero");
                }
                result = literals[0] / literals[1];
            } else if (token.value === '%') {
                result = literals[0] * (literals[1] / 100);
            } else if (token.value === '√') {
                if (literals[0] < 0) {
                    throw new Error("Cannot take the square root of a negative number");
                }
                result = Math.sqrt(literals[0]);
            }
            literals = [result];
        } else {
            literals.push(parseFloat(token.value));
        }
    });

    console.log(result);

    return result;
};