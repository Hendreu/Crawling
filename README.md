# Crawling

Um web crawler simples desenvolvido em Node.js usando arquitetura MVC.

## Estrutura do Projeto

```
crawling/
├── src/
│   ├── controllers/     # Controladores
│   ├── models/         # Modelos de dados
│   ├── services/       # Lógica de negócio
│   ├── utils/          # Utilitários
│   ├── config/         # Configurações
│   └── index.js        # Ponto de entrada
├── tests/              # Testes
└── package.json
```

## Instalação

```bash
npm install
```

## Uso

```bash
npm start https://example.com
```

## Testes

```bash
npm test
```

## Funcionalidades

- Navegação automática por websites
- Extração de links
- Normalização de URLs
- Geração de relatórios
- Tratamento de erros

## Tecnologias

- Node.js
- JSDOM
- Jest