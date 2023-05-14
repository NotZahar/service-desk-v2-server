import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GeneralValidationPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT!;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new GeneralValidationPipe());
    app.enableCors();

    await app.listen(PORT, () => console.log(`Server started on ${PORT}`));
}

start()