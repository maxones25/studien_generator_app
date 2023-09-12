import { AppModule } from '@admin/app.module';
import { AttributeType } from '@admin/components/Attribute';
import { INestApplication } from '@nestjs/common';
import { createApp } from '@test/app/createApp';
import { getAdminAccessToken } from '@test/auth/loginAdmin';
import { getDirectorAccessToken } from '@test/auth/loginDirector';
import { getComponents } from '@test/components/getComponents';
import { createDirector } from '@test/director/signUpDirector';

const VALID_TYPES: AttributeType[] = [
  'boolean',
  'date',
  'datetime',
  'number',
  'options',
  'string',
  'time',
];

describe('get components', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    app = await createApp(AppModule);

    const director = await createDirector(app);

    accessToken = await getDirectorAccessToken(
      app,
      director.email,
      director.password,
    );
  });

  afterAll(async () => {
    return app.close();
  });

  it('should get all components', () => {
    return getComponents(app, accessToken)
      .expect(200)
      .then((res) => {
        const components = res.body;

        expect(Array.isArray(components)).toBeTruthy();
        expect(components.length).toBeGreaterThan(0);

        components.forEach((component) => {
          expect(typeof component).toBe('object');
          expect(typeof component.name).toBe('string');
          expect(Array.isArray(component.entityFields)).toBeTruthy();
          expect(typeof component.attributes).toBe('object');

          component.entityFields.forEach((field) => {
            expect(typeof field).toBe('string');
          });

          Object.values(component.attributes).forEach((attribute: any) => {
            expect(typeof attribute).toBe('object');
            expect(typeof attribute.name).toBe('string');
            expect(typeof attribute.required).toBe('boolean');
            expect(VALID_TYPES.includes(attribute.type)).toBeTruthy();
          });
        });
      });
  });

  it('should fail because unauthorized', () => {
    return getComponents(app, undefined).expect(401);
  });

  it('should fail because admin authorized', async () => {
    const accessToken = await getAdminAccessToken(app);
    return getComponents(app, accessToken).expect(401);
  });
});
