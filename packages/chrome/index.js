const puppeteer = require('puppeteer');

class Chrome {
  constructor() {
    this.page = null;
    this.browser = null;
  }

  startPage = async () => {
    this.page = await this.browser.newPage();
  };

  launch = async () => {
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'],
    });
    await this.startPage();
  };

  click = async selector => {
    const target = await this.page.$(selector);
    await target.click();
  };

  extract = async (selector, leaf) => {
    const value = await this.page.$eval(
      selector,
      (e, leaf) => {
        return e[leaf];
      },
      leaf
    );

    return value;
  };

  navigate = async url => {
    await this.page.goto(url);
  };

  wait = async selector => {
    await this.page.waitForSelector(selector);
  };

  getLinks = async selector => {
    const urls = await this.page.$$eval(selector, links => {
      return links.map(link => {
        return { name: link.innerText, url: link.href };
      });
    });

    return urls;
  };

  getCurrentUrl = async () => {
    const url = await this.page.evaluate(() => {
      return window.location.href;
    });

    return url;
  };

  closePage = async () => {
    await this.page.close();
  };

  close = async () => {
    await this.closePage();
    await this.browser.close();
  };
}

module.exports = Chrome;
