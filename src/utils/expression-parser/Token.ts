class Token {
  type: string;
  value: string | number;

  constructor(type: string, value: string) {
    this.type = type;
    this.value = type === 'Literal' ? Number(value) : value;
  }
}

export { Token };