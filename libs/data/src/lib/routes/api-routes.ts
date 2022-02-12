const rota_produto = '/produtos';
export const RouteDictionary = {

  Produtos: {
    Raiz: rota_produto,
    Filtrar: rota_produto + "/filtrar/",
    Gostar: rota_produto + "/gostar/",
    Rate: rota_produto + "/rate/",
    IncrementarVendas: rota_produto + "/incrementarVenda/",
    IncrementarVisualizacoes: rota_produto + "/incrementarVisualizacoes/",
    EmDestaque: rota_produto + "/destaques/",
    Semelhantes: rota_produto + "/semelhantes/",
  },

  Categoria: "/categoria/",
  Pedidos: {
    Raiz:"/pedido/",
    PorUsuario:"/pedido-usuario/",
    CodigoRastreamento:"codigo-rastreamento/",
  },

  Checkout: '/checkout/',
};
