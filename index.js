const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts.js");

// listContacts();
let result = null;
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      result = await listContacts();
      console.log(result);
      break;

    case "get":
      result = await getContactById(id);
      console.log(result.data[result.contactIndex]);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.log(deletedContact);
      break;

    case "add":
      const newContact = await addContact(name, email, phone);
      console.log(newContact);
      break;

    default:
      console.log("unknown action try again...");
      break;
  }
};

// invokeAction({ actions: "listContacts" });

// invokeAction({ actions: "getContactById", id: "pN81JA2Jlwcw91mMCIT5o" });

// invokeAction({
//   actions: "addContact",
//   name: "Olexii Luzanchuk",
//   email: "Luzanchuk123@gmail.com",
//   phone: "+380809765123",
// });

// invokeAction({
//   actions: "removeContact",
//   id: "pN81JA2Jlwcw91mMCIT5o",
// });
invokeAction(argv);
