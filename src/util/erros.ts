export class InvalidArgumentError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'InvalidArgumentError';
  }
}

export class InternalServerError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = 'InternalServerError';
  }
}

export function getMensagemErro(erro: any): string {
  return erro.errors ? erro.errors[0].message : erro.message
}