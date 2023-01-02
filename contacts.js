const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readContacts() {
  try {
    const contactRaw = await fs.readFile(contactsPath);
    const contactDb = JSON.parse(contactRaw);
    return contactDb;
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function writeContact(db) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function listContacts() {
  try {
    return await readContacts();
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function getContactById(contactId) {
  try {
    const db = await readContacts();
    return db.find((contact) => contact.id === contactId);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function removeContact(contactId) {
  try {
    const db = await readContacts();
    const updateDb = db.filter((contact) => contact.id !== contactId);
    await writeContact(updateDb);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

async function addContact(name, email, phone) {
  try {
    const db = await readContacts();
    const id = nanoid();
    const contact = { id, name, email, phone };
    db.push(contact);

    await writeContact(db);
  } catch (error) {
    console.warn(`Error: ${error}`);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
