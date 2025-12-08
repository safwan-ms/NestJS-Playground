import { Faker } from '@faker-js/faker';
import { Property } from '../entity/property.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PropertyFactory = setSeederFactory(Property, (faker: Faker) => {
  const property = new Property();
  property.name = faker.location.street();
  property.price = faker.number.int({ min: 1000000, max: 10000000 });
  property.description = faker.lorem.sentence();

  return property;
});
