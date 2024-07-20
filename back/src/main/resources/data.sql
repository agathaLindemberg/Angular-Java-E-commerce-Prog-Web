INSERT INTO Categoria (nome, descricao) VALUES ('Categoria 1', 'Descrição da Categoria 1')
ON CONFLICT (id) DO NOTHING;
INSERT INTO Categoria (nome, descricao) VALUES ('Categoria 2', 'Descrição da Categoria 2')
ON CONFLICT (id) DO NOTHING;

-- Inserir produtos
INSERT INTO Produto (nome, descricao, autor, preco, foto, tamanho, quantidade, categoria_id)
VALUES ('Livro 1', 'Descrição do Produto 1', 'Autor 1', 29.99, 'https://i.pinimg.com/736x/39/c1/24/39c124f6e987492b03f1f5aa6c259d3a.jpg', 10, 100, 1);
INSERT INTO Produto (nome, descricao, autor, preco, foto, tamanho, quantidade, categoria_id)
VALUES ('Livro 2', 'Descrição do Produto 2', 'Autor 2', 39.99, 'https://i.pinimg.com/736x/39/c1/24/39c124f6e987492b03f1f5aa6c259d3a.jpg', 20, 200, 2);
-- Inserir usuários
INSERT INTO Usuario (nome, endereco, email, login, senha, administrador)
VALUES ('Usuário 1', 'Endereço 1', 'email1@example.com', 'admin', 'admin', TRUE);
INSERT INTO Usuario (nome, endereco, email, login, senha, administrador)
VALUES ('Usuário 2', 'Endereço 2', 'email2@example.com', 'a', 'a', FALSE);