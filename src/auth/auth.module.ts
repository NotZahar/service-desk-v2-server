import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CustomersModule } from 'src/customers/customers.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { authConfig } from './auth-config';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => CustomersModule),
    forwardRef(() => EmployeesModule),
    JwtModule.register({
      secret: authConfig.SECRET,
      signOptions: {
        expiresIn: authConfig.TOKEN_EXPIRE_TIME
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
