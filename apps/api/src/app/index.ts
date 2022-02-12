import express = require("express");
import bodyParser = require("body-parser");
import cors = require("cors");

import {routes} from '@codeby/data';

import abaixo from './items_abaixo_10_reais';
import acima from './items_acima_10_reais';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get(routes.RouteDictionary.Produtos.Raiz+'/acima', (req, res) => {
  res.send(acima);
});

app.get(routes.RouteDictionary.Produtos.Raiz+'/abaixo', (req, res) => {
  res.send(abaixo);
});

export default app;
