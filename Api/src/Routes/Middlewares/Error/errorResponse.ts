export class errorResponse extends Error {
  constructor(
    public code: number,
    message: string,
  ) {
    super(message);
  }
}
