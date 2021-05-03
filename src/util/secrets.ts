export const JWT_SECRET = process.env['JWT_SECRET']

if (!JWT_SECRET) {
  console.log('Erro: Configure a variável JWT_SECRET.')
  process.exit(1)
}