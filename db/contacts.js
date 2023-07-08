const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeContacts = async (contacts) => {
  const data = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, data, 'utf-8');
};

module.exports = {
  readContacts,
  writeContacts,
};

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async function getContactById(contactId) {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      return contact || null;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async function removeContact(contactId) {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      let contacts = JSON.parse(data);
      const contactIndex = contacts.findIndex((c) => c.id === contactId);
  
      if (contactIndex === -1) {
        return null;
      }
  
      const [removedContact] = contacts.splice(contactIndex, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
      return removedContact;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }
  
  async function addContact(name, email, phone) {
    try {
      const data = await fs.readFile(contactsPath, 'utf-8');
      const contacts = JSON.parse(data);
  
      const newContact = { id: generateId(), name, email, phone };
      contacts.push(newContact);
  
      await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
  
      return newContact;
    } catch (error) {
      throw error;
    }
  }
  
  function generateId() {
    return Date.now().toString();
  }
  
  
  
  