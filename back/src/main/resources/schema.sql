CREATE TABLE IF NOT EXISTS Usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL,
    administrador BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Categoria (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Produto (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    foto VARCHAR(255),
    tamanho INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL REFERENCES Categoria(id)
);

CREATE TABLE IF NOT EXISTS Venda (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES Usuario(id)
);

CREATE TABLE IF NOT EXISTS Venda_Produto (
    id SERIAL PRIMARY KEY,
    venda_id INTEGER REFERENCES Venda(id),
    produto_id INTEGER REFERENCES Produto(id),
    quantidade INTEGER NOT NULL
);
