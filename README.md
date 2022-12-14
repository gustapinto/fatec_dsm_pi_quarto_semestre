# JKCG Sensor

<p align="center">
  <img src="https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/blob/main/design/Fundo_branco_-_Redonda.png" width="30%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white">
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
  <img src="https://img.shields.io/badge/Github%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white">
  <img src="https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=arduino&logoColor=white">
  <img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualStudioCode&logoColor=white">
  <img src="https://img.shields.io/badge/Figma-5551ff?style=for-the-badge&logo=figma&logoColor=white">
  <img src="https://img.shields.io/badge/Android%20Studio-3DDC84?style=for-the-badge&logo=androidStudio&logoColor=white">
</p>

## Conhecendo o projeto

O projeto é uma plataforma de monitoramento remoto de dispositivos eletrônicos e equipamentos industriais, integrando os dados de temperatura e umidade coletados pelo sensor a partir de um aplicativo Android rápido e amigável.

Para conhecer melhor nosso projeto e acompanhar os próximos desenvolvimentos e objetivos visite:
- [Trello](https://trello.com/invite/b/4TmzojXT/ATTIb11a6911235b9019e08e27dd01aab9773BEE38C0/projeto-interdisciplinar-4-semestre)

### API

Nós criamos uma API para nosso projeto, que é utilizada como um microsserviço para a ingestão dos dados brutos coletados, seu tratamento e a disponibilização para o consumo do aplicativo mobile.

Também consumimos uma API externa, a OpenWeatherMap, a qual disponibiliza valores de temperatura e umidade da localização passada pelo usuário.

- API no repositório: [Github](https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/blob/main/api/README.md)
- Para acessar a API externa OpenWeatherMap: [OpenWeatherMap](https://openweathermap.org/api/)

### Arduino

O Arduino é utilizado como um sensor que coleta as informações de temperatura e umidade do ambiente e as envia para a API.

- Arduino no repositório: [Github](https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/blob/main/arduino/README.md)

### Design

O design foi desenvolvido visando uma fácil interação entre o usuário e a aplicação, performando de maneira simples e concentrando os recursos em mínimas quantidades de telas, facilitando assim a visualização intuitiva.

Foi desenvolvido com a ferramenta de edição Figma, podendo ser encontrado à partir do link: [Figma](https://bit.ly/3Ts2gz8)

### Documentação

Na documentação se explica todos os elementos e a composição do projeto e como foram aplicadas as técnicas necessárias para seu desenvolvimento, podendo deixar explícito também como ele funciona e ocorre sua implementação.

A documentação deste projeto foi feita na wiki desse mesmo repositório, pode-se encontrá-la na aba superior do repositório no antepenúltimo elemento da direita, denominado como “wiki” ou pelo link: [Github Wiki](https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/wiki)

### Mobile

O aplicativo mobile apresenta as informações capturadas e tratadas pelo sensor na tela de seu celular independendo da distância, fazendo necessário apenas acesso a rede de internet.

- Inserção do mobile no repositório: [Github](https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/tree/main/mobile)

## Desenvolvido por

<p align="center">
  <a href="https://github.com/gustapinto">
    <img src="https://avatars.githubusercontent.com/gustapinto" width="15%">
  </a>
  <a href="https://github.com/CarolinyFranca">
    <img src="https://avatars.githubusercontent.com/CarolinyFranca" width="15%">
  </a>
  <a href="https://github.com/Karen-HerOAcEDucK">
    <img src="https://avatars.githubusercontent.com/Karen-HerOAcEDucK" width="15%">
  </a>
  <a href="https://github.com/0502j">
    <img src="https://avatars.githubusercontent.com/0502j" width="15%">
  </a>
</p>


---

<p align="center">
  <img src="https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/actions/workflows/deploy.yml/badge.svg?branch=main">
  <img src="https://github.com/gustapinto/fatec_dsm_pi_quarto_semestre/actions/workflows/android.yml/badge.svg?branch=main">
</p>
