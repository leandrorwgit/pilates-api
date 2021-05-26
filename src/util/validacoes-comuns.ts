import { InvalidArgumentError } from './erros';

export class Validadoes {

  static campoStringNaoNulo(valor: any, nome: String) {
    if (!valor)
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
  }

  static campoTamanhoMinimo(valor: any, nome: String, minimo: number) {
    if (valor.length < minimo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${minimo} caracteres!`
      );
  }

  static campoTamanhoMaximo(valor: any, nome: String, maximo: number) {
    if (valor.length > maximo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser menor que ${maximo} caracteres!`
      );
  }
  
};