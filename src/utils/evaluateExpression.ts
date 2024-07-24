export const evaluateExpression = (expression: string): string => {
    try {
        let expr = expression.replace(/√/g, 'Math.sqrt');
        expr = expr.replace(/(\d+)%/g, '($1 * 0.01)');
        const result = Function(`"use strict"; return (${expr})`)();
        return String(result);
    } catch (error) {
        return 'Error';
    }
};
