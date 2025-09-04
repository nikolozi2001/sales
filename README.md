# Sales Project

A Node.js web scraping application that extracts product information from e-commerce websites.

## Features

- Product scraping using Puppeteer
- Express.js REST API
- Real-time price monitoring
- Product data extraction (title, image, price, discounts)

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the server:
   ```bash
   node server.js
   ```

2. The server will run on `http://localhost:3000`

3. API endpoint:
   - `GET /products` - Fetch scraped product data

## Dependencies

- Express.js - Web framework
- Puppeteer - Web scraping and automation
- Axios - HTTP client
- Cheerio - Server-side HTML parsing

## License

MIT
