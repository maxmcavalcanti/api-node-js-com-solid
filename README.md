# api-node-js-com-solid (Rocketseat)

## Estrutura do projeto

- Aplicativo com estilo gympass

## Requisitos Funcionais
- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível se obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pleo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;
 
## Regras de negócio
- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por adminsitradores;

## Requisitos não-funcionais
- [ ] A senha do usuário deve ser criptografada;
- [ ] Os dados da palicação precisam estar persistidos em um banco POstgreSQl;
- [ ] Todas as listas de dados devem estar paginadas com 20 itens por páginas;
- [ ] O usuário deve ser identificado por um JWT ( json web token)