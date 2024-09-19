// Include playwright module
const { test, expect } = require('@playwright/test');

const connection = require('../utils/mysqldatabase');

const name = 'Testers Talk';
const email = 'testerstalk@example.com';

test.beforeAll('Running before all tests', async () => {
    // Setup: Insert test data into the database
    await connection.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
});

test.afterAll('Running after all tests', async () => {
    // Cleanup: Remove test data from the database
    await connection.execute('DELETE FROM users WHERE email = ?', ['testerstalk@example.com']);
});

/**
 * Bakkappa N
 */
test('Data Base Validation Test 1', { tag: '@SQLDataBaseTest' }, async ({ }) => {
    await test.step('Validate name from data base', async () => {

        // Playwright actions

        // Query the database
        const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', ['testerstalk@example.com']);
        const user = rows[0];

        // Perform assertions - validating user name
        expect(user).toBeDefined();
        console.log('name is ' + user.name);
        console.log('email is ' + user.email);
        expect(user.name).toBe('Testers Talk');

        // Playwright actions
    })
})

/**
 * Bakkappa N
 */
test('Data Base Validation Test 2', { tag: '@SQLDataBaseTest' }, async ({ }) => {
    await test.step('Validate email from data base', async () => {

        // Playwright actions

        // Query the database
        const [rows] = await connection.execute('SELECT * FROM users WHERE name = ?', ['Testers Talk']);
        const user = rows[0];

        // Perform assertions - validating user email
        expect(user).toBeDefined();
        console.log('name is ' + user.name);
        console.log('email is ' + user.email);
        expect(user.email).toBe('testerstalk@example.com');

        // Playwright actions
    })
})