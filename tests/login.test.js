const fs = require('fs');
const path = require('path');

const {Browser} = require('../browser');
const {login} = require('../helpers/login');

describe('Login', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = new Browser();
    page = await browser.launch();
  });

  afterAll(async () => {
    await browser.close();
  });


  const ENTRY = 'http://localhost:3000/beta_cms/clients';
  const users = JSON.parse(
                  fs.readFileSync(
                path.resolve(__dirname, '../helpers/users.json')));
  
  users.forEach((user) => {
    it(`should login with ${user.username}, ${user.role}`, async () => {
      await login(ENTRY, user);
      const loggedIn = await page.evaluate(() => {
        return true;
      });
      expect(loggedIn).toBe(true);
    });
  });
});