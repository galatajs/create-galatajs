import { createApp } from "@istanbul/app"
import { createHttpServer } from "@istanbul/http"

const app = createApp()
app.register(createHttpServer())

app.start()