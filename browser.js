const {config} = require('dotenv');
const {launch} = require('puppeteer');

config();

class Browser {
  constructor() {
    this.browser = null;
    this.page = null;
    this.config = {
      headless: false,
      slowMo: 50
    };
  }

  async launch() {
    this.browser = await launch({headless: false});
    this.page = await this.browser.newPage();
    return this.page;
  }

  async goAndWait(url) {
    this.page.goto(url);
    await this.page.waitForNavigation();
  }

  async close() {
    await this.browser.close();
  }
};

module.exports = { Browser };