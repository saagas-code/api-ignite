
import { app } from './app';

app.listen(process.env.PORT || 8819, async () => {
  console.log(`Aplicativo rodando na porta: ${process.env.PORT}!`)
})