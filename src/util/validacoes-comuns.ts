import { InvalidArgumentError } from './erros';

export class Validadoes {

  static campoStringNaoNulo(valor: String, nome: String) {
    if (!valor)
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
  }

  static campoTamanhoMinimo(valor: String, nome: String, minimo: number) {
    if (valor.length < minimo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${minimo} caracteres!`
      );
  }

  static campoTamanhoMaximo(valor: String, nome: String, maximo: number) {
    if (valor.length > maximo)
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser menor que ${maximo} caracteres!`
      );
  }
  
};