import { Token } from './Token';

export class Tokenizer {
  private static readonly COMMA_REGEX = /,/;
  private static readonly DIGIT_REGEX = /\d/;
  private static readonly LETTER_REGEX = /[a-z]/i;
  private static readonly OPERATOR_REGEX = /\+|-|\*|\/|\^|%|√/;
  private static readonly LEFT_PARENTHESIS_REGEX = /\(/;
  private static readonly RIGHT_PARENTHESIS_REGEX = /\)/;

  public tokenize(str: string): Token[] {
    const input = str.replace(/\s+/g, '');
    const chars = input.split('');
    const result: Token[] = [];
    const buffers = {
      letter: [],
      number: [],
    };

    for (const char of chars) {
      if (Tokenizer.isDigit(char)) {
        buffers.number.push(char);
      } else if (char === '.') {
        buffers.number.push(char);
      } else if (Tokenizer.isLetter(char)) {
        if (buffers.number.length) {
          this.flushNumberBuffer(result, buffers.number);
          result.push(new Token('Operator', '*'));
        }
        buffers.letter.push(char);
      } else if (Tokenizer.isOperator(char)) {
        this.flushBuffers(result, buffers);
        result.push(new Token('Operator', char));
      } else if (Tokenizer.isLeftParenthesis(char)) {
        if (buffers.letter.length) {
          result.push(new Token('Function', buffers.letter.join('')));
          buffers.letter.length = 0;
        } else if (buffers.number.length) {
          this.flushNumberBuffer(result, buffers.number);
          result.push(new Token('Operator', '*'));
        }
        result.push(new Token('Left Parenthesis', char));
      } else if (Tokenizer.isRightParenthesis(char)) {
        this.flushBuffers(result, buffers);
        result.push(new Token('Right Parenthesis', char));
      } else if (Tokenizer.isComma(char)) {
        this.flushBuffers(result, buffers);
        result.push(new Token('Function Argument Separator', char));
      }
    }

    this.flushBuffers(result, buffers);

    return result;
  }

  private flushBuffers(result: Token[], buffers: { letter: string[]; number: string[] }): void {
    this.flushNumberBuffer(result, buffers.number);
    this.flushLetterBuffer(result, buffers.letter);
  }

  private flushLetterBuffer(result: Token[], letterBuffer: string[]): void {
    for (const letter of letterBuffer) {
      result.push(new Token('Variable', letter));
      if (letterBuffer.length > 1) {
        result.push(new Token('Operator', '*'));
      }
    }
    letterBuffer.length = 0;
  }

  private flushNumberBuffer(result: Token[], numberBuffer: string[]): void {
    if (numberBuffer.length) {
      result.push(new Token('Literal', numberBuffer.join('')));
      numberBuffer.length = 0;
    }
  }

  private static isComma(char: string): boolean {
    return Tokenizer.COMMA_REGEX.test(char);
  }

  private static isDigit(char: string): boolean {
    return Tokenizer.DIGIT_REGEX.test(char);
  }

  private static isLetter(char: string): boolean {
    return Tokenizer.LETTER_REGEX.test(char);
  }

  private static isOperator(char: string): boolean {
    return Tokenizer.OPERATOR_REGEX.test(char);
  }

  private static isLeftParenthesis(char: string): boolean {
    return Tokenizer.LEFT_PARENTHESIS_REGEX.test(char);
  }

  private static isRightParenthesis(char: string): boolean {
    return Tokenizer.RIGHT_PARENTHESIS_REGEX.test(char);
  }
}