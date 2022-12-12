
import { app } from './app';

app.listen(process.env.PORT, async () => {
  console.log(`Aplicativo rodando na porta: ${process.env.PORT}!`)
})