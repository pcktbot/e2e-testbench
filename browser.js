import {config} from 'dotenv';
import puppeteer, { launch } from 'puppeteer';
import jest from 'jest';
import jestPuppeteer from 'jest-puppeteer';

config();

const ENTRY_URL = process.env.ENTRY_URL;
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

export default async () => {
  // console.log({puppeteer, jest, jestPuppeteer});
  const browser = await launch({headless: false, slowMo: 50});
  const page = await browser.newPage();
  await page.goto(ENTRY_URL);
  
  await page.waitForSelector('input#Username');
  await page.type('input#Username', USERNAME);

  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  
  try {
    await Promise.race([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      page.waitForTimeout(5000) // Adjust timeout as needed
    ]);
  } catch (error) {
    console.log('Navigation did not occur within the timeout period.');
  }
  const passwordFieldSelector = 'input.form-control';
  await page.waitForSelector(passwordFieldSelector);
  await page.type(passwordFieldSelector, PASSWORD);
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  
  await page.waitForNavigation({waitUntil: 'networkidle0'});

  await page.screenshot({ path: 'example.png' });

  await browser.close();
};

export class Browser {
  constructor() {
    this.browser = null;
    this.page = null;
    this.config = {
      headless: false,
      slowMo: 50
    };
  }

  async launch() {
    this.browser = await launch({headless: false, slowMo: 50});
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
