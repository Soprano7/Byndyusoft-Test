import { Token } from './Token';

class Tokenizer {
  private static isComma(ch: string): boolean {
    return /,/.test(ch);
  }

  private static isDigit(ch: string): boolean {
    return /\d/.test(ch);
  }

  private static isLetter(ch: string): boolean {
    return /[a-z]/i.test(ch);
  }

  private static isOperator(ch: string): boolean {
    return /\+|-|\*|\/|\^/.test(ch);
  }

  private static isLeftParenthesis(ch: string): boolean {
    return /\(/.test(ch);
  }

  private static isRightParenthesis(ch: string): boolean {
    return /\)/.test(ch);
  }

  public static tokenize(str: string): Token[] {
    str = str.replace(/\s+/g, '');
    const chars = str.split('');

    const result: Token[] = [];
    const letterBuffer: string[] = [];
    const numberBuffer: string[] = [];

    chars.forEach((char) => {
      if (Tokenizer.isDigit(char)) {
        numberBuffer.push(char);
      } else if (char === '.') {
        numberBuffer.push(char);
      } else if (Tokenizer.isLetter(char)) {
        if (numberBuffer.length) {
          this.emptyNumberBufferAsLiteral(result, numberBuffer);
          result.push(new Token('Operator', '*'));
        }
        letterBuffer.push(char);
      } else if (Tokenizer.isOperator(char)) {
        this.emptyNumberBufferAsLiteral(result, numberBuffer);
        this.emptyLetterBufferAsVariables(result, letterBuffer);
        result.push(new Token('Operator', char));
      } else if (Tokenizer.isLeftParenthesis(char)) {
        if (letterBuffer.length) {
          result.push(new Token('Function', letterBuffer.join('')));
          letterBuffer.length = 0;
        } else if (numberBuffer.length) {
          this.emptyNumberBufferAsLiteral(result, numberBuffer);
          result.push(new Token('Operator', '*'));
        }
        result.push(new Token('Left Parenthesis', char));
      } else if (Tokenizer.isRightParenthesis(char)) {
        this.emptyLetterBufferAsVariables(result, letterBuffer);
        this.emptyNumberBufferAsLiteral(result, numberBuffer);
        result.push(new Token('Right Parenthesis', char));
      } else if (Tokenizer.isComma(char)) {
        this.emptyNumberBufferAsLiteral(result, numberBuffer);
        this.emptyLetterBufferAsVariables(result, letterBuffer);
        result.push(new Token('Function Argument Separator', char));
      }
    });

    if (numberBuffer.length) {
      this.emptyNumberBufferAsLiteral(result, numberBuffer);
    }
    if (letterBuffer.length) {
      this.emptyLetterBufferAsVariables(result, letterBuffer);
    }

    return result;
  }

  private static emptyLetterBufferAsVariables(result: Token[], letterBuffer: string[]): void {
    const l = letterBuffer.length;
    for (let i = 0; i < l; i++) {
      result.push(new Token('Variable', letterBuffer[i]));
      if (i < l - 1) {
        // there are more Variables left
        result.push(new Token('Operator', '*'));
      }
    }
    letterBuffer.length = 0;
  }

  private static emptyNumberBufferAsLiteral(result: Token[], numberBuffer: string[]): void {
    if (numberBuffer.length) {
      result.push(new Token('Literal', numberBuffer.join('')));
      numberBuffer.length = 0;
    }
  }
}

export { Tokenizer };