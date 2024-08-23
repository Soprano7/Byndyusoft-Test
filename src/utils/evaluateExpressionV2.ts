import { postOrderTraversal } from './expression-parser/ast'
import { parse } from './expression-parser/parser.ts';

export const evaluateExpression = (expression) => {

    const ast = parse(expression)
    console.log(ast)

    let result = 0;
    let litertals = [];

    postOrderTraversal(ast, (token) => {
        if (token.type === 'Operator') {
            if (token.value === '+') {
                result = litertals[0] + litertals[1]
            }
            if (token.value === '-') {
                result = litertals[0] - litertals[1]
            }
            if (token.value === '*') {
                result = litertals[0] * litertals[1]
            }
            if (token.value === '/') {
                result = litertals[0] / litertals[1]
            }
            litertals = [result]
        } else {
            litertals.push(token.value)
        }
    })

    console.log(result);

    return result;
}


