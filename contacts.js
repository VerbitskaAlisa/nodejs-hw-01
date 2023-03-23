const path = require("path");
const { nanoid } = require('nanoid');
const fs = require("fs").promises;

const contactsPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => {
       return item.id === id
    });
    return result || null;
}


const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {id: nanoid(), name, email, phone};
    const changedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(changedContacts, null, 2));
    return newContact;
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const changedContacts = contacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(changedContacts, null, 2));
    return contacts.filter(({ id }) => id === contactId);
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}

