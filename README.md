# api-node-js-com-solid (Rocketseat)

## Estrutura do projeto

- Aplicativo com estilo gympass

## Requisitos Funcionais
- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível se obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;
 
## Regras de negócio
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por adminsitradores;

## Requisitos não-funcionais
- [x] A senha do usuário deve ser criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco POstgreSQl;
- [x] Todas as listas de dados devem estar paginadas com 20 itens por páginas;
- [x] O usuário deve ser identificado por um JWT ( json web token)