# Projeto Formulário com NextJS, React Hook Form e MUI

Este projeto é uma implementação de um formulário dinâmico utilizando NextJS, React Hook Form, e Material UI (MUI). Ele destaca a integração de um componente Autocomplete que utiliza `useFormContext` do React Hook Form para busca assíncrona de pessoas.

## Funcionalidades

- **Formulário Dinâmico:** Utilização do React Hook Form para gerenciamento de estado do formulário.
- **Campo Autocomplete:** Campo para busca de pessoas com sugestões automáticas, integrado com dados assíncronos.
- **Validação de Campos:** Validação de campos com Zod.
- **Estilização com MUI:** Uso de componentes MUI para uma interface responsiva.
- **Json Server:** Uso do Json Server para simular um banco de dados.

## Pré-requisitos

Para executar este projeto, você precisará ter instalado:

- [Node.js](https://nodejs.org/en/) (que inclui `npm`).

## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Sadn0x/pcteste.git
   cd pcteste
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**


   ```bash
   npm run dev
   ```

Acesse http://localhost:3000 para ver o projeto no navegador.

## Estrutura do Projeto

pages/index.js: Contém o formulário principal e a lógica para a integração do React Hook Form com os componentes MUI.

## Uso

O formulário contém campos para pessoa, telefone e e-mail. Após preencher os campos, ao clicar em "Enviar", os dados do formulário serão exibidos no console do navegador.