import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'egagofur',
  password: '',
  database: 'belajar_nest',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
};
