# Integração com a API de Pagamento do Mercado Pago

## Descrição
Este projeto implementa a integração com a API do Mercado Pago para permitir pagamentos online de forma segura e eficiente. Ele inclui autenticação, criação de pagamentos e verificação de status de transações.

## Tecnologias Utilizadas
- **Next.js** (para o frontend)
- **Nest.js** (para o backend)
- **Typescript**
- **Mercado Pago SDK**
- **Zustand** (para gerenciamento de estado, se necessário)
- **Docker** (opcional para ambiente de desenvolvimento)

## Requisitos
Antes de iniciar, certifique-se de ter instalado:
- Node.js (>=16)
- NPM ou Yarn
- Conta no Mercado Pago (com credenciais de API configuradas)

## Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```
   ou
   ```sh
   yarn install
   ```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto:
   ```env
   MERCADO_PAGO_ACCESS_TOKEN=seu_access_token
   MERCADO_PAGO_PUBLIC_KEY=sua_public_key
   ```

## Uso
### Inicialização do Servidor
Para iniciar o servidor local:
```sh
npm run dev
```