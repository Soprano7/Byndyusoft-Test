import { Token } from './Token';
import { tokenize } from './tokenize';

interface Token {
  type: string;
  value: string;
}

class ASTNode {
  token: Token;
  leftChildNode: ASTNode | null;
  rightChildNode: ASTNode | null;

  constructor(token: Token, leftChildNode: ASTNode | null, rightChildNode: ASTNode | null) {
    this.token = token;
    this.leftChildNode = leftChildNode;
    this.rightChildNode = rightChildNode;
  }
}

class Parser {
  private outStack: ASTNode[];
  private opStack: Token[];
  private assoc: { [key: string]: string };
  private prec: { [key: string]: number };

  constructor() {
    this.outStack = [];
    this.opStack = [];
    this.assoc = {
      '^': 'right',
      '*': 'left',
      '/': 'left',
      '+': 'left',
      '-': 'left',
    };
    this.prec = {
      '^': 4,
      '*': 3,
      '/': 3,
      '+': 2,
      '-': 2,
    };
  }

  private addNode(operatorToken: Token): void {
    const rightChildNode = this.outStack.pop();
    const leftChildNode = this.outStack.pop();
    this.outStack.push(new ASTNode(operatorToken, leftChildNode, rightChildNode));
  }

  private peek(stack: Token[]): Token | undefined {
    return stack.slice(-1)[0];
  }

  private precedence(token: Token): number {
    return this.prec[token.value];
  }

  private associativity(token: Token): string {
    return this.assoc[token.value];
  }

  public parse(inp: string): ASTNode | null {
    const tokens = tokenize(inp);

    tokens.forEach((v) => {
      if (v.type === 'Literal' || v.type === 'Variable') {
        this.outStack.push(new ASTNode(v, null, null));
      } else if (v.type === 'Function') {
        this.opStack.push(v);
      } else if (v.type === 'Function Argument Separator') {
        while (this.peek(this.opStack) && this.peek(this.opStack)!.type !== 'Left Parenthesis') {
          this.addNode(this.opStack.pop()!);
        }
      } else if (v.type === 'Operator') {
        while (
            this.peek(this.opStack) &&
            this.peek(this.opStack)!.type === 'Operator' &&
        ((this.associativity(v) === 'left' && this.precedence(v) <= this.precedence(this.peek(this.opStack)!)) ||
        (this.associativity(v) === 'right' && this.precedence(v) < this.precedence(this.peek(this.opStack)!)))
      ) {
          this.addNode(this.opStack.pop()!);
        }
        this.opStack.push(v);
      } else if (v.type === 'Left Parenthesis') {
        this.opStack.push(v);
      } else if (v.type === 'Right Parenthesis') {
        while (this.peek(this.opStack) && this.peek(this.opStack)!.type !== 'Left Parenthesis') {
          this.addNode(this.opStack.pop()!);
        }
        this.opStack.pop();
        if (this.peek(this.opStack) && this.peek(this.opStack)!.type === 'Function') {
          this.addNode(this.opStack.pop()!);
        }
      }
    });

    while (this.peek(this.opStack)) {
      this.addNode(this.opStack.pop()!);
    }

    return this.outStack.pop() || null;
  }
}

export { Parser };