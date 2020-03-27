const Chrome = require("./chrome");

class Scraper extends Chrome {
    create = async () => {
        await this.launch();
    }

    init = async (startUrl) => {
        await this.navigate(startUrl);

        // TODO: Handle these conditions
        this.page.on("close", () => { });
        this.page.on("error", () => { });
    }

    stop = async () => {
        await this.close();
    }

    scrape = async () => {
        const id = await this.extract(".id", "innerText");
        const hash = await this.extract(".hash", "innerText");
        const phone = await this.extract(".phone", "innerText").catch(() => "");
        const mail = await this.extract(".mail", "innerText").catch(() => "");
        return {
            id,
            hash,
            phone,
            mail
        }
    }

}

module.exports = Scraper;
