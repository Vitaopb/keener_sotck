<div align="center">
  <img src="https://tecer.us/wp-content/uploads/2021/07/2-1.png"/>
  <h1>Desafio Back-end Keener.io
 </div>
  
 ## Tecnologias e Softwares utilizados: 
 <div align="center">
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" alt="javascript"/>
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" alt="nodejs"/>
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/docker/docker.png" alt="docker"/>
<img height="50" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/express/express.png" alt="express"/>
<img height="50" src="https://static.imasters.com.br/wp-content/uploads/2018/07/25101553/Autenticac%CC%A7a%CC%83o-JSON-Web-Token-JWT-em-Node.js.jpg"/>
<img height="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRipGvv3cgQFF3NABgSVx2sbReijpnP1h-8wg&usqp=CAU" />
<img height="50" src="https://www.gartner.com/pi/vendorimages/postman_full-life-cycle-api-management_1633960356020.png"/>
<img height="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLmX8Nuowl-7BJurJx2b_tFhPb6obwpJiBWD3tgNKr0grd43rlnr_r-e9kmiEUIbejpk&usqp=CAU" />
<img height="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCBavr1Xr1wgxENlrF8fXGJYd710FHvzE7dg&usqp=CAU" /> 
<img height="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6J3XzQUmhZs_ZZdJZHPguwhpTdsd7gorj6Q&usqp=CAU" />
</div>
  
## Desafio proposto:
Você deverá desenvolver uma aplicação para cadastro de produtos e gestão de estoque, sendo obrigatória a implementação de um sistema de cadastro/autenticação, seguindo os padrões básicos de segurança. Observação importante: é permitida a utilização de frameworks de autenticação já existentes, como o Identity, no caso do .Net Core.
  
São páginas obrigatórias no sistema:

- Login :heavy_check_mark:
- Cadastro :heavy_check_mark:
- Cadastro de produtos :heavy_check_mark:
- Listagem de produtos :heavy_check_mark:
- Cadastro de movimentações de estoque (tanto saídas como entradas) :heavy_check_mark:
- Visualização/Listagem das movimentações realizadas :heavy_check_mark:
<hr>
  
## Como rodar na sua maquina:
### Será nescessario instalar:
  - [Node](https://nodejs.org/en/download/)
  - [Docker](https://docs.docker.com/get-docker/) e o [Docker-compose](https://docs.docker.com/compose/install/)
  - [Git](https://git-scm.com/downloads)
  - [Postman](https://www.postman.com/downloads/) (Para uma melhor experiência, mas pode ser qualquer outra API client.)

### Materiais de apoio:
  - [Documentção da API - EN-USA](https://documenter.getpostman.com/view/19371532/UVeCQUC7)
  - [Documentação da API - PT-BR](https://documenter.getpostman.com/view/19371532/UVeCRUQf)
  - [Arquivo de configuração das Rotas](https://drive.google.com/file/d/1r83cNMMYVBF18ZiDlaO4g_hM7uXPhzzL/view?usp=sharing) 
  - Só fazer o download e importar em sua API client desejada.

## Próximos passos:
 - Abra seu terminal e cole os comandos: 
 - Se estiver no Windows abra o GitBash (Será baixado junto com Git).
```bash
 git clone https://github.com/Vitaopb/keener_stock.git
 cd keener_stock
```
- Inicializando a aplicação:
```bash
bash entrypoint.sh
```
 - Se tudo funcionar você receberá "Server is running on port portnumber".
<hr>

## Testando a aplicação:
- Agora você irá precisar de uma API client, para testar as rotas da aplicação.
- Recomendo o [postman](https://www.postman.com/downloads/).
- Agora você precisa baixar e importar o arquivo de configuração das rotas.
