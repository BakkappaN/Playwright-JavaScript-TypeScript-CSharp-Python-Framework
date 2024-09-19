// Include playwright module
const { test, expect } = require('@playwright/test');

const { connect, close } = require('../utils/mongodb');

let db;
let collection;

test.beforeAll('Running before all tests', async () => {
    db = await connect(); // Connect to MongoDB

    // Read collection
    collection = db.collection(process.env.MONGODB_COLLECTION);

    // Insert data into MongoDB
    await collection.insertOne({ name: 'Testers Talk', age: 30, email: 'testerstalk@example.com' });

    // Insert multiple documents
    await collection.insertMany([
        { name: "Testers Talk 2", age: 25, email: "testerstalk2@example.com" },
        { name: "Testers Talk 3", age: 35, email: "testerstalk3@example.com" }
    ])
});

test.afterAll('Running after all tests', async () => {
    await collection.deleteMany({}); // Delete document
    await close(); // Close MongoDB connection
});

/**
 * Bakkappa N
 */
test('MongoDB Test 1 - Validate email', { tag: '@MongoDBTest' }, async ({ }) => {
    await test.step('Validate email from MongoDB', async () => {

        // Playwright actions

        // Retrieve and log data from MongoDB
        const documents = await collection.find({}).toArray();
        console.log(documents);

        // Read a particular record
        const query = { name: 'Testers Talk' };
        const record = await collection.findOne(query);

        console.log('Record:', record);

        // Example assertion (if relevant)
        expect(record).not.toBeNull();
        expect(record).toHaveProperty('email', 'testerstalk@example.com');

        // Playwright actions

    })
})

/**
 * Bakkappa N
 */
test('MongoDB Test 2 - Validate name', { tag: '@MongoDBTest' }, async ({ }) => {
    await test.step('Validate name from MongoDB', async () => {

        // Playwright actions

        // Retrieve and log data from MongoDB
        const documents = await collection.find({}).toArray();
        console.log(documents);

        // Read a particular record
        const query = { email: 'testerstalk@example.com' };
        const record = await collection.findOne(query);

        console.log('Record:', record);

        // Example assertion (if relevant)
        expect(record).not.toBeNull();
        expect(record).toHaveProperty('name', 'Testers Talk');

        // Playwright actions

    })
})

/**
 * Bakkappa N
 */
test('MongoDB Test 3 - Validate age', { tag: '@MongoDBTest' }, async ({ }) => {
    await test.step('Validate age from MongoDB', async () => {

        // Playwright actions

        // Retrieve and log data from MongoDB
        const documents = await collection.find({}).toArray();
        console.log(documents);

        // Read a particular record
        const query = { name: 'Testers Talk' };
        const record = await collection.findOne(query);

        console.log('Record:', record);

        // Example assertion (if relevant)
        expect(record).not.toBeNull();
        expect(record).toHaveProperty('age', 30);

        // Playwright actions

    })
})