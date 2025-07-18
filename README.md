<div style="display: flex; align-items: flex-start; gap: 20px;">
  <div style="flex: 1;">
    
# Amazon Archive Extension

A browser extension that helps you quickly access Amazon order archives. Amazon removed on May 2025 the ability to archive orders, but not completely. You can still access the archive page by clicking on the order ID in the order page. This extension makes it easier to access the archive page by adding a button to the toolbar.

  </div>
  <div style="flex-shrink: 0;">
    <img src="public/logo.png" alt="Amazon Archive Extension Logo" width="150" height="150" />
  </div>
</div>

## How it Works

1. **Default State**: Extension icon appears grayed out in the browser toolbar
2. **Detection**: When you visit an Amazon URL with an `orderID` or `orderId` parameter (e.g., `https://amazon.com/some-page?orderID=123-456789-012345`), the icon becomes highlighted
3. **Archive Access**: Click the highlighted icon to navigate to: `https://www.amazon.<TLD>/gp/css/order-history/archive/archiveModal.html?orderId=<ORDER-ID>`

## Installation

Grab the latest release from the [releases page](https://github.com/polvallverdu/amazon-archive-extension/releases). Then follow the instructions for your browser.

### Chrome/Edge/Brave

1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist` folder

### Firefox

1. Open `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on" and select the `manifest.json` from the `dist` folder

### Development

```bash
# Install dependencies
pnpm install

# Generate icons from logo (requires ImageMagick)
# Place your logo at public/logo.png first
pnpm run generate-icons

# Build for Chrome
pnpm run build:chrome

# Build for Firefox
pnpm run build:firefox

# Development mode
pnpm run dev
```

## Usage Example

1. Visit any Amazon product page or order page with an orderID or orderId in the URL
2. Notice the extension icon becomes highlighted
3. Click the icon to be redirected to the order archive page

## Supported Amazon Domains

- amazon.com (US)
- amazon.co.uk (UK)
- amazon.ca (Canada)
- amazon.de (Germany)
- amazon.fr (France)
- amazon.it (Italy)
- amazon.es (Spain)
- amazon.com.au (Australia)
- amazon.co.jp (Japan)
- amazon.in (India)

## Technical Details

- **Manifest Version**: 3
- **Permissions**: `activeTab`, `tabs`
- **Host Permissions**: Amazon domains only
- **Background Script**: Service worker that monitors tab changes and URL updates

## License

MIT License

## Thanks

Thank you to [JohnBra](https://github.com/JohnBra) for the template for creating chrome and firefox extensions. Find it here: [JohnBra/vite-web-extension](https://github.com/JohnBra/vite-web-extension).
