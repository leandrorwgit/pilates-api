# pilates-api
API para sistema de pilates.

.env
<br/>
DATABASE_URL=postgres://user:pass@localhost/dbname
<br/>
DATABASE_SSL=false
<br/>
JWT_SECRET=node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"

<br/>
<br/>
npx sequelize-cli model:generate --name Aluno --attributes firstName:string,lastName:string
npx sequelize-cli migration:generate --name alter-aluno-valorpagamento
npx sequelize-cli db:migrate   // (para rodar local exportar variável DATABASE_URL)