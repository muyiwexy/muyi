import { Client, Account, Databases } from 'appwrite';
const client = new Client();

const account = new Account(client);
const databases = new Databases(client, 'Comment');
// Init your Web SDK
client
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('Chat-app') // Your project ID
;
export const access = account;
export const db = databases;