export default class CodeError extends Error {
  code: number;

  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
