# Deep linking Experiment - Redis, Puppeteer, Bull

Creates two independent scrapers where one will scrape links and pass to another another for scraping data.
It Takes care of all possible cases related to all levels and integrate redis/ws to ensure the scraper can run in different servers/context mostly independent of each other.

Service structure:

- Server - handle DB and other queue, get and receive data about scraped site
- Scraper 1 - handle level 0
- Scraper 2 - handle level 1

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

What things you need to install the software and how to install them -

`Node JS`, `Redis` and `yarn`.

### Installing

Follow these steps to get a development env running

Clone the repo in your local machine

```
git clone https://github.com/Alamin02/experiment-redis.git
```

Now install all the dependencies using

```
yarn
```

Run the project with

 ```
 yarn start
 ```
 
Then you are good to go!

Make a GET request to `http://localhost:300` to see it in action.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Workflow

![](https://prtsc.ca/images/2020/03/28/Untitled-Diagram.jpg)