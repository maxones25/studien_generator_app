import fs from 'fs';

const addFile = ({ template, path }) => ({
  type: 'add',
  path: 'apps/admin/src/{{module}}/' + path,
  templateFile: 'plop/templates/' + template,
});

const appendPipe = ({ path, folder, prefix = '', suffix = "" }) => ({
  type: 'append',
  path: 'apps/admin/src/{{module}}/' + path,
  templateFile: 'plop/templates/pipe.hbs',
  data: {
    folder,
    prefix,
    suffix,
  },
});

const addPipe = ({ path }) => ({
  type: 'add',
  path: 'apps/admin/src/{{module}}/' + path,
  skipIfExists: true,
});

export default function (plop) {
  plop.setGenerator('usecase', {
    description: 'generates a use case with domain interface',
    prompts: [
      {
        name: 'module',
        message: 'Module:',
        type: 'list',
        choices: () => {
          return fs
            .readdirSync('./apps/admin/src', { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
        },
      },
      {
        name: 'name',
        type: 'input',
      },
    ],
    actions: (data) => {
      data.name = data.name + ' use case';

      return [
        addFile({
          path: 'domain/useCases/I{{pascalCase name}}.ts',
          template: 'use-case-interface.hbs',
        }),
        addPipe({ path: 'domain/index.ts' }),
        appendPipe({
          path: 'domain/index.ts',
          folder: 'useCases',
          prefix: 'I',
        }),
        addFile({
          path: 'application/useCases/{{pascalCase name}}.ts',
          template: 'use-case.hbs',
        }),
        addPipe({ path: 'application/index.ts' }),
        appendPipe({
          path: 'application/index.ts',
          folder: 'useCases',
        }),
        addFile({
          path: 'providers/useCases/{{pascalCase name}}Provider.ts',
          template: 'provider.hbs',
        }),
        addPipe({ path: 'providers/index.ts' }),
        appendPipe({
          path: 'providers/index.ts',
          folder: 'useCases',
          suffix: "Provider"
        }),
      ];
    },
  });

  plop.setGenerator('error', {
    description: 'generates an use case error',
    prompts: [
      {
        name: 'module',
        message: 'Module:',
        type: 'list',
        choices: () => {
          return fs
            .readdirSync('./apps/admin/src', { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
        },
      },
      {
        name: 'name',
        type: 'input',
      },
    ],
    actions: (data) => {
      data.name = data.name + ' error';

      return [
        addFile({
          path: 'domain/errors/{{pascalCase name}}.ts',
          template: 'error.hbs',
        }),
        addPipe({ path: 'domain/index.ts' }),
        appendPipe({
          path: 'domain/index.ts',
          folder: 'errors',
        }),
      ];
    },
  });

  plop.setGenerator('repo', {
    description: 'generates a repository',
    prompts: [
      {
        name: 'module',
        message: 'Module:',
        type: 'list',
        choices: () => {
          return fs
            .readdirSync('./apps/admin/src', { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => dirent.name);
        },
      },
      {
        name: 'name',
        type: 'input',
      },
    ],
    actions: (data) => {
      data.name = data.name + ' repository';

      return [
        addFile({
          path: 'domain/repositories/I{{pascalCase name}}.ts',
          template: 'error.hbs',
        }),
        addPipe({ path: 'domain/index.ts' }),
        appendPipe({
          path: 'domain/index.ts',
          folder: 'repositories',
          prefix: 'I',
        }),
      ];
    },
  });
}
