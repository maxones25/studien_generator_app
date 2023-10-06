const director = {
  id: "d98cd02e-1ebf-49f4-8b9b-df37ad78911e",
  email: "max.mustermann@test.de",
  password: "12345678",
  firstName: "Max",
  lastName: "Mustermann",
};

const study = {
  id: "ed450d39-b087-4ce9-a5fb-45b063e45c4a",
  name: "Test Studie",
};

const group = {
  id: "497d0534-de0a-4267-ae00-5221a0c6b6ef",
  name: "Gruppe 1",
};

const participant = {
  id: "54feae71-a7ae-4752-b9b5-a908e2446d31",
  password: "0123456789AB",
  number: "001",
};

export const entity = {
  id: "c2c31a68-6bd7-48df-8d4b-47a95de8920f",
  name: "hxgEe00CvK",
  fields: {
    text: {
      id: "6f776404-0402-42ca-9649-bace38c52684",
    },
    date: {
      id: "cba34ffd-f3ce-4d64-928f-02a2f2bc3549",
    },
    datetime: {
      id: "acfcfefe-190c-4a40-8006-39bf04a709b7",
    },
    time: {
      id: "b790febe-ec2b-4fb8-8710-0a224e2a8938",
    },
  },
};

export const form = {
  id: "9cc9de50-065f-4ca9-88ad-b1453f51ee3e",
  page: {
    id: "5d791f96-0622-4084-9079-2239c55e5b3e",
  },
  components: {
    textfield: {
      id: "e52c9298-8b1e-4881-9572-9765bad2e8ee",
    },
    datepicker: {
      id: "8eb5a6dd-2652-42cc-8af1-45a267f44a62",
    },
    datetimepicker: {
      id: "7f817f50-dfae-4370-a259-a4b339e7bb22",
    },
    timepicker: {
      id: "a666f59d-38f6-4aa3-8aea-c51aa898e31e",
    },
  },
  entity: {
    id: "c118259b-5c92-4cb3-ba51-d5b5a3a5b3b1",
  },
  fields: {
    text: {
      id: "84b78ebb-0684-45b1-9663-8087738c6209",
    },
    date: {
      id: "bd99097c-fdd0-4cac-ac45-e9db68eae858",
    },
    time: {
      id: "6c8d8b8d-a783-48ce-b145-124add7cd6dd",
    },
    datetime: {
      id: "ee6040fe-343b-4b15-943f-d810c22f18b6",
    },
  },
};

const activationPassword = "1234";

const testData = {
  entity,
  form,
  director,
  group,
  study,
  participant,
  activationPassword,
};

export default testData;
