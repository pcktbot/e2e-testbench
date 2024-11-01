

module.exports.login = async (entry, user) => {
  await page.goto(entry);
  await page.type('input#Username', user.username);
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  
  await timeoutOrNavigation(page);
  
  const passwordFieldSelector = 'input.form-control';
  await page.waitForSelector(passwordFieldSelector);
  await page.type(passwordFieldSelector, user.password);
  
  await page.waitForSelector('button[type="submit"]');
  await page.click('button[type="submit"]');
  
  await timeoutOrNavigation(page);
};

async function timeoutOrNavigation(page) {
  try {
    await Promise.race([
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
      // page.waitForTimeout(10000) // Adjust timeout as needed
    ]);
  } catch (error) {
    console.log('Navigation did not occur within the timeout period.');
  }
};
