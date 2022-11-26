<h1 align="center">API</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
</p>

Desenvolvida utilizando a linguagem de programação Typescript, apoiada pela plataforma Node.js e pelo banco de dados PostgreSQL, a qual é utilizada como um microsserviço que realiza a ingestão dos dados brutos coletados pelos sensores (*Arduinos*), trata-os e os disponibiliza para que o apicativo mobile (*Android*) os consuma, também gerenciando as conexões entre dispositivos móveis e sensores.


## Casos de uso

Os casos de uso que definem a API são:

<p align="center">
<img src="https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/blob/main/api/docs/diagramas/Casos%20de%20uso.jpg">
</p>


## Arquitetura

A API foi desenvolvida utilizando-se um paradigma de programação orientado a objetos, com esses objetos e classes sendo organizados conforme os princípios da divisão de responsabilidades pregadas pela arquitetura limpa, conforme o diagrama de pacotes a seguir:

<p align="center">
<img src="https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/blob/main/api/docs/diagramas/Componentes%20de%20arquitetura.drawio.png">
</p>


## Infraestrutura

A API foi hospedada em um servidor cloud por meio da utilização do Docker, sua infraestrutura e a comunicação dos dispositivos móveis e sensores com a API podem ser definidos da seguinte forma:

<p align="center">
<img src="https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/blob/main/api/docs/diagramas/infraestrutura_do_ambiente_de_produ%C3%A7%C3%A3o.png" width="65%">
</p>


## API Consumida

Para validarmos os dados coletados pelos sensores foi utilizada uma API externa, a *OpenWeatherMap*, que disponibiliza medições de temperatura e umidade da localização passada, proporcionando uma melhor visualização de alertas irregulares.
