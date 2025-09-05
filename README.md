# Sales Project

A Georgian grocery store discount aggregator with modern UI and toast notifications.

## Features

- Product scraping from multiple Georgian stores (2nabiji, Nikora)
- React frontend with modern design
- **Toast Notifications System** with Georgian language support
- Real-time price monitoring
- Product filtering and search
- Responsive design with Tailwind CSS
- Enhanced user experience with micro-interactions

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
