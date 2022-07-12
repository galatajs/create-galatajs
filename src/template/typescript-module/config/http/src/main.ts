import { createApp } from "@istanbul/app";
import { createHttpServer } from "@istanbul/http";

const app = createApp();
const http = createHttpServer();
app.register(http);
app.start();
