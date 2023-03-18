import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'sd',
            password: 'qwerty',
            database: 'service-desk',
            models: [],
            autoLoadModels: true
        }),
    ]
})

export class AppModule {}