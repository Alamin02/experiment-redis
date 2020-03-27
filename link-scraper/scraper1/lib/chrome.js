const puppeteer = require('puppeteer');

class Chrome {
    launch = async () => {
        this.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: [
                '--start-maximized'
            ],
            waitUntil: 'load', timeout: 0
        });
        this.page = await this.browser.newPage();
    }

    click = async (selector) => {
        const target = await this.page.$(selector);
        await target.click();
    }

    extract = async (selector, leaf) => {
        const value = await this.page.$eval(selector, (e, leaf) => {
            return e[leaf];
        }, leaf);

        return value;
    }

    navigate = async (url) => {
        await this.page.goto(url);
    }

    wait = async (selector) => {
        await this.page.waitForSelector(selector);
    }

    getLinks = async (selector) => {
        let urls = await this.page.$$eval(selector, links => {
            return links.map(link => {
                return { name: link.innerText, url: link.href }
            });
        });

        return urls;
    }

    getCurrentUrl = async () => {
        const url = await this.page.evaluate(() => {
            return window.location.href;
        });

        return url;
    }

    close = async () => {
        await this.page.close();
        await this.browser.close();
    }
}

module.exports = Chrome;
