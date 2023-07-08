const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
function invokeAction({ action, id, name, email, phone }) {
  const contacts = require('./contacts'); // Імпорт функцій для роботи з контактами

  switch (action) {
    case 'list':
      const allContacts = contacts.listContacts();
      console.table(allContacts);
      break;

    case 'get':
      const contact = contacts.getContactById(id);
      if (contact) {
        console.log(contact);
      } else {
        console.log('Contact not found');
      }
      break;

    case 'add':
      const newContact = contacts.addContact(name, email, phone);
      console.log('New contact added:', newContact);
      break;

    case 'remove':
      const removedContact = contacts.removeContact(id);
      if (removedContact) {
        console.log('Contact removed:', removedContact);
      } else {
        console.log('Contact not found');
      }
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);