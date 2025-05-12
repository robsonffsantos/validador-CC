# Identificador de Bandeira de Cartão
Este projeto é uma aplicação web que identifica a bandeira de cartões de crédito com base no número do cartão.

<img src="https://github.com/user-attachments/assets/38c6e746-7a61-4358-9168-f1146a66be75" width="400" alt="Identificador de Bandeira de Cartão">

## 📋 Funcionalidades

- **Identificação de bandeiras**: Detecta automaticamente bandeiras como Visa, Mastercard, American Express, Discover, JCB, Diners Club, Elo e Hipercard.
- **Validação em tempo real**: Verifica a entrada do usuário e mostra a bandeira conforme digita.
- **Interface visual interativa**: Exibe um cartão virtual que atualiza conforme o usuário digita.
- **Design responsivo**: Funciona em dispositivos móveis e desktops.

## 🚀 Tecnologias Utilizadas

- HTML5
- CSS3 (com animações e design responsivo)
- JavaScript (ES6+)

## 🔍 Como Funciona

A aplicação utiliza expressões regulares e lógica condicional para identificar as bandeiras dos cartões com base em seus padrões específicos:

| Bandeira | Padrão | Comprimento |
|----------|--------|-------------|
| Visa | Começa com 4 | 13, 16 ou 19 dígitos |
| Mastercard | Começa com 51-55 ou 2221-2720 | 16 dígitos |
| American Express | Começa com 34 ou 37 | 15 dígitos |
| Discover | Começa com 6011, 622126-622925, 644-649 ou 65 | 16-19 dígitos |
| JCB | Começa com 3528-3589 | 16-19 dígitos |
| Diners Club | Começa com 300-305, 36, 38-39 | 14-19 dígitos |
| Elo (Brasil) | Múltiplos prefixos (401178, 401179, etc.) | 16 dígitos |
| Hipercard (Brasil) | Começa com 606282 | 16 dígitos |

## 🌟 Melhorias Implementadas

Em relação ao projeto original, foram implementadas as seguintes melhorias:

1. **Interface visual aprimorada**: Adição de um cartão visual que atualiza em tempo real
2. **Validação em tempo real**: Feedback instantâneo durante a digitação
3. **Suporte a bandeiras brasileiras**: Adição de Elo e Hipercard
4. **Informações detalhadas**: Exibição do prefixo, comprimento e validação Luhn
5. **Animações e feedback visual**: Melhor experiência do usuário
6. **Design responsivo**: Adaptação para diversos dispositivos

## 🔧 Como Executar

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/identificador-bandeira-cartao.git
   ```

2. Abra o arquivo `index.html` em qualquer navegador moderno.

Não é necessário instalar nenhuma dependência ou configurar um servidor - basta abrir o arquivo HTML!

## 📚 Aprendizados do Projeto

Este projeto demonstra:

- Uso de expressões regulares para verificação de padrões
- Manipulação do DOM para atualização dinâmica da interface
- Design responsivo com CSS puro
- Validação de entrada de usuário em tempo real

## Contato

Se você tiver dúvidas ou sugestões, sinta-se à vontade para entrar em contato:
- **LinkedIn:** [Robson Fernando](https://www.linkedin.com/in/robsonffdossantos/?locale=pt_BR)

GrayPixel - 2025
