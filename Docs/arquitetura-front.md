## Arquitetura de arquivos da aplicação
Educação Financeira/
├── index.html                  # Página inicial da aplicação
│
├── pages/                      # Páginas HTML da aplicação
│   ├── login.html
│   ├── cadastro.html
│   └── home.html
│
├── css/                        # Estilos da aplicação
│   ├── reset.css               # Remove diferenças de estilos padrão entre navegadores
│   ├── variables.css           # Centraliza valores reutilizáveis e facilita a criação de temas
│   ├── global.css              # Estilos gerais utilizados em toda a aplicação
│   │
│   ├── components/             # Estilos de componentes reutilizáveis
│   │   ├── button.css
│   │   └── card.css
│   │
│   └── layout/                 # Estilos responsáveis pela estrutura e organização do layout
│       ├── header.css
│       └── footer.css
│
├── js/                         # Código JavaScript da aplicação
│   ├── main.js                 # Ponto de entrada principal do JavaScript
│   │
│   ├── config/                 # Configurações da aplicação
│   │   └── config.js
│   │
│   ├── components/             # Comportamentos reutilizáveis dos componentes
│   │   └── menu.js
│   │
│   ├── services/               # Comunicação com APIs e serviços externos
│   │   ├── api.js
│   │   └── auth.js
│   │
│   ├── utils/                  # Funções utilitárias e genéricas
│   │   ├── format.js
│   │   └── validation.js
│   │
│   └── pages/                  # Lógica específica de cada página
│       ├── home.js
│       └── login.js
│
└── assets/                     # Recursos estáticos da aplicação
    ├── images/                 # Imagens
    └── icons/                  # Ícones
