const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readContacts() {
  const contactRaw = await fs.readFile(contactsPath);
  const contactDb = JSON.parse(contactRaw);
  return contactDb;
}

async function writeContact(db) {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
}

async function listContacts() {
  return await readContacts();
}

async function getContactById(contactId) {
  const db = await readContacts();
  return db.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const db = await readContacts();
  const updateDb = db.filter((contact) => contact.id !== contactId);
  await writeContact(updateDb);
}

async function addContact(name, email, phone) {
  const db = await readContacts();
  const id = nanoid();
  const contact = { id, name, email, phone };
  db.push(contact);

  await writeContact(db);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
