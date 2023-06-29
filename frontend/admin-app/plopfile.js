const modules = [
  "core",
  "auth",
  "date",
  "navigation",
  "studies",
  "participants",
  "members",
  "groups",
  "entities",
];

const types = ["type", "interface"];

const ModulePrompt = {
  type: "list",
  name: "module",
  choices: modules,
  default: "core",
  message: "Module?",
};

const ComponentGenerator = {
  description: "Create a component",
  prompts: [
    ModulePrompt,
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/modules/{{module}}/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
      templateFile: "plop/templates/Component.tsx.hbs",
    },
    {
      type: "add",
      path: "src/modules/{{module}}/components/index.ts",
      skipIfExists: true,
    },
    {
      type: "append",
      path: "src/modules/{{module}}/components/index.ts",
      templateFile: "plop/templates/component.pipe.ts.hbs",
    },
  ],
};

const PageGenerator = {
  description: "Create a page component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
  ],
  actions: [
    {
      type: "add",
      path: "src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.tsx",
      templateFile: "plop/templates/Page.tsx.hbs",
    },
  ],
};

const HookGenerator = {
  description: "Create a hook",
  prompts: [
    ModulePrompt,
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
    {
      type: "list",
      name: "type",
      choices: ["normal", "read request", "write request"],
      default: "normal",
      message: "Type?",
    },
  ],
  actions: function ({ type }) {
    const actions = [
      {
        type: "add",
        path: "src/modules/{{module}}/hooks/index.ts",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/modules/{{module}}/hooks/index.ts",
        templateFile: "plop/templates/hook.pipe.ts.hbs",
      },
    ];

    if (type === "normal") {
      actions.push({
        type: "add",
        path: "src/modules/{{module}}/hooks/use{{pascalCase name}}/use{{pascalCase name}}.ts",
        templateFile: "plop/templates/hook.ts.hbs",
      });
    } else if (type === "read request") {
      actions.push({
        type: "add",
        path: "src/modules/{{module}}/hooks/use{{pascalCase name}}/use{{pascalCase name}}.ts",
        templateFile: "plop/templates/read-request-hook.ts.hbs",
      });
    } else if (type === "write request") {
      actions.push({
        type: "add",
        path: "src/modules/{{module}}/hooks/use{{pascalCase name}}/use{{pascalCase name}}.ts",
        templateFile: "plop/templates/write-request-hook.ts.hbs",
      });
    } else {
      throw new Error("unknown type");
    }

    return actions;
  },
};

const TypeGenerator = {
  description: "Create a type",
  prompts: [
    ModulePrompt,
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
    {
      type: "list",
      name: "type",
      choices: types,
      default: "interface",
      message: "Type?",
    },
  ],
  actions: function ({ type }) {
    const actions = [
      {
        type: "add",
        path: "src/modules/{{module}}/types/index.ts",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/modules/{{module}}/types/index.ts",
        templateFile: "plop/templates/type.pipe.ts.hbs",
      },
    ];

    if (type === "interface") {
      actions.push({
        type: "add",
        path: "src/modules/{{module}}/types/{{pascalCase name}}/{{pascalCase name}}.ts",
        templateFile: "plop/templates/interface.type.ts.hbs",
      });
    } else if (type === "type") {
      actions.push({
        type: "add",
        path: "src/modules/{{module}}/types/{{pascalCase name}}/{{pascalCase name}}.ts",
        templateFile: "plop/templates/type.type.ts.hbs",
      });
    } else {
      throw new Error("unknown type");
    }

    return actions;
  },
};

const UtilsGenerator = {
  description: "Create a utils package",
  prompts: [
    ModulePrompt,
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
  ],
  actions: function () {
    const actions = [
      {
        type: "add",
        path: "src/modules/{{module}}/utils/index.ts",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/modules/{{module}}/utils/{{camelCase name}}/{{camelCase name}}.ts",
        templateFile: "plop/templates/utils.ts.hbs",
      },
      {
        type: "append",
        path: "src/modules/{{module}}/utils/index.ts",
        templateFile: "plop/templates/utils.pipe.ts.hbs",
      },
    ];

    return actions;
  },
};

const ContextGenerator = {
  description: "Create a context",
  prompts: [
    ModulePrompt,
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
  ],
  actions: function () {
    const actions = [
      {
        type: "add",
        path: "src/modules/{{module}}/contexts/index.ts",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/modules/{{module}}/contexts/{{pascalCase name}}Context/{{pascalCase name}}Context.tsx",
        templateFile: "plop/templates/context.tsx.hbs",
      },
      {
        type: "append",
        path: "src/modules/{{module}}/contexts/index.ts",
        templateFile: "plop/templates/context.pipe.ts.hbs",
      },
    ];

    return actions;
  },
};

const FormGenerator = {
  description: "Create a form",
  prompts: [
    ModulePrompt,
    {
      type: "input",
      name: "name",
      message: "Name?",
    },
  ],
  actions: function () {
    const actions = [
      {
        type: "add",
        path: "src/modules/{{module}}/components/index.ts",
        skipIfExists: true,
      },
      {
        type: "add",
        path: "src/modules/{{module}}/components/{{pascalCase name}}Form/{{pascalCase name}}Form.tsx",
        templateFile: "plop/templates/form.tsx.hbs",
      },
      {
        type: "append",
        path: "src/modules/{{module}}/components/index.ts",
        templateFile: "plop/templates/form.pipe.ts.hbs",
      },
    ];

    return actions;
  },
};

export default (plop) => {
  plop.setGenerator("c", ComponentGenerator);
  plop.setGenerator("component", ComponentGenerator);
  plop.setGenerator("con", ContextGenerator);
  plop.setGenerator("context", ContextGenerator);
  plop.setGenerator("p", PageGenerator);
  plop.setGenerator("page", PageGenerator);
  plop.setGenerator("h", HookGenerator);
  plop.setGenerator("hook", HookGenerator);
  plop.setGenerator("t", TypeGenerator);
  plop.setGenerator("type", TypeGenerator);
  plop.setGenerator("u", UtilsGenerator);
  plop.setGenerator("utils", UtilsGenerator);
  plop.setGenerator("form", FormGenerator);
};
