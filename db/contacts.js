const fs = require("fs").promises;
const { error } = require("console");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  let contactIndex = 0;
  const result = data.find((item, index) => {
    contactIndex = index;
    return item.id === contactId;
  });

  if (!result) {
    return null;
  }
  return {
    data: data,
    contactIndex: contactIndex,
  };
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const { data, contactIndex } = await getContactById(contactId);
  if (!data) {
    return null;
  }
  const result = data[contactIndex];
  data.splice(contactIndex, 1);

  await fs.writeFile(contactsPath, JSON.stringify(data));
  return result;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
