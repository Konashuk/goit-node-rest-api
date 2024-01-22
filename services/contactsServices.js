import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const newFolderPath = "../db";
const absolutePath = path.resolve(__dirname, newFolderPath);
const contactsPath = path.join(absolutePath, "contacts.json");

export async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
  } catch (error) {
    console.error("Error reading contacts:", error.message);
    throw error;
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === contactId);
    return result || null;
  } catch (error) {
    console.error("Error reading contacts:", error.message);
    throw error;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error reading contacts:", error.message);
    throw error;
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) return null;

    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error("Error reading contacts:", error.message);
    throw error;
  }
}

export async function updateContactById(id, data) {
  try {
    const contacts = await listContacts();
    console.log(data);
    const contactIndex = contacts.findIndex((contact) => contact.id === id);
    console.log(contactIndex);
    if (contactIndex === -1) {
      return null;
    }
    const existingContact = contacts[contactIndex];

    contacts[contactIndex] = {
      id,
      name: data.name || existingContact.name,
      email: data.email || existingContact.email,
      phone: data.phone || existingContact.phone,
    };

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(contacts[contactIndex]);
    return contacts[contactIndex];
  } catch (error) {
    console.error("Error updating contact:", error.message);
    throw error;
  }
}
