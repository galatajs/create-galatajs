import { createApp, App } from "@istanbul/app"
import { createHttpServer } from "@istanbul/http"

const app : App = createApp()
app.register(createHttpServer())

app.start()