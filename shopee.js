

// Set Runtime Variables
const { firefox } = require('playwright');
const fs = require('fs');
const { getEnvironmentData } = require('worker_threads');
const threshold = 100;
const outputFilePath = 'page.html';
const url = 'https://shopee.ph/buyer/login?next=' + encodeURIComponent(process.env.SHOPEE_LISTING.split('?')[0]); 


(async () => {

    //// Set playwright browser object ////////
    // const browser = await firefox.launch(); // use for production (non-testing)
    const browser = await firefox.launch({ headless: false }); // use only for testing

    //// Use playwright browser object to open a new browser instance ////////
    const page = await browser.newPage(); 

    //// Navigate to the URL, waiting until page loaded ////////
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForSelector('.vvOL40', { state: 'visible' });

    //// Once the username input box is visible in browser, automatically fill in the username and password fields ////////
    await page.fill('.F8zDuW > div:nth-child(1) > input:nth-child(1)', process.env.SHOPEE_USERNAME);
    await page.fill('.L2QI3a > div:nth-child(1) > input:nth-child(1)', process.env.SHOPEE_PASSWORD);

    //// Automatically click the login button ////////
    await page.click('.vvOL40'); 
    
    //// Automatically click the security validation button when it becomes visible ////////
    await page.waitForSelector('.dWxniD', { state: 'visible' });
    await page.click('.dWxniD');

    console.log('Please check for security verification email...');
    
    //// At this point, we need to confirm the email link to continue ////////

    // ------------------------------------------------------
    // add logic here to check the price on a loop, when/if the price is below a threshold, proceed to purchase
    // ------------------------------------------------------

    //// Close the browser
    // await browser.close();

})();


//////////////// NOTES /////////////////
    // // Alternatively, wait for network idle (there are no more than 2 network connections for at least 500 ms)
    // await page.goto(url, {waitUntil: 'networkidle'});

    // // Perform additional waiting if necessary
    // await page.waitForSelector(priceSelector, { state: 'visible' });

    // // const priceText = await page.$eval(priceSelector, el => el.innerHTML);
    // const priceText = await page.$eval(priceSelector, el => el.innerText);
    // console.log('priceText: ' + priceText.toString())

    // // Save the HTML content to a file
    // const pageContent = await page.content();
    // fs.writeFileSync(outputFilePath, pageContent, 'utf8');

    // const browser = await firefox.launch();
    // const page = await browser.newPage();
    // await page.goto(url);
    
    // // Save the HTML content to a file
    // const pageContent = await page.content();
    // fs.writeFileSync(outputFilePath, pageContent, 'utf8');

    // // Adjust the selector based on the Shopee page structure
    // const priceSelector = 'div.G27FPf';
    // const priceText = await page.$eval(priceSelector, el => el.innerText);

    // // Extract price value
    // const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    // console.log(`Price is ${price}. No action needed.`);

    // if (price < threshold) {
    //     console.log(`Price dropped to ${price}. Triggering purchase.`);
    //     // Implement the purchase logic here or set a flag
    //     fs.writeFileSync('purchase_needed.txt', `Price dropped to ${price}. Please purchase manually.`);
    // } else {
    //     console.log(`Price is ${price}. No action needed.`);
    // }
