import dbConfig from '../config/db.config';
import { runSeeder, SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm';
import { PropertyFactory } from './property.factory';
import { UserFactory } from './user.factory';
import { MainSeeder } from './main.seeder';
import { DataSource } from 'typeorm';
import { PropertyFeatureFactory } from './propertyFeature.factory';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  factories: [PropertyFactory, UserFactory, PropertyFeatureFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource
  .initialize()
  .then(async () => {
    await dataSource.synchronize(true);
    await runSeeder(dataSource, MainSeeder);
  })
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
  })
  .finally(() => process.exit());
