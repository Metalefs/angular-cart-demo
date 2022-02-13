import { enums,entities } from "@codeby/data";

export const CalcularPrecoProduto = (produto: entities.Produto) => {
  const preco =
    produto.Status == enums.StatusProduto.promocao? (produto.price/100) + produto.priceTags[0].rawValue : produto.price;
  return preco * produto?.Quantidade;
};

export function ObterPrecoProduto(produto:entities.Produto){
  return (produto?.price/100);
}

export function ObterPrecoDesconto(produto:entities.Produto){
  if(produto?.priceTags)
  return ((produto?.price/100) + produto?.priceTags[0].rawValue) * produto.Quantidade
  return (produto?.price/100) * produto.Quantidade
}
