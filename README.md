# Link-Saver-Web-Extension
A web extension to save commonly accessed links.

## Table of contents
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Features](#features)

## Installation
### Option 1: Using Git Bash.
```
# Downloads a copy on the local machine
git clone https://github.com/klbdev/Link-Saver-Web-Extension
```
### Option 2: Download the repository.
1. Click the green **Code** button.
2. Select **Download ZIP**.
3. Extract the ZIP file.

## Setup
1. Open your preferred web browser.
2. Type the following on the address bar to open extensions:
- Chrome: `chrome://extensions/`
- Edge: `edge://extensions/`
3. Turn on **Developer mode** by clicking on the toggle.
4. Click **Load unpacked**.
5. Navigate to the downloaded folder, click on the **dist** (distribution) folder, and click **Select Folder**.
6. You can now access the extension by clicking on the puzzle piece beside the address bar.

## Usage
### Input field
1. Enter the URL that you wish to add as a shortcut.
2. You may add a title as an alias for the URL. If title is omitted, the URL becomes the title.
3. You can also colour code your link by selecting a colour from the dropdown list. Black is default.
4. Once completed, press **Add** to save your link to the extension.

### Accessing a link
1. Click on the URL or title. The extension opens the link in a new tab.

### Deleting a link
1. To delete a link, hover your mouse on the `🗑️` button. A pointer `➤` will appear indicating the selected link.
2. Click on the `🗑️` button to delete the selected link.

## Features
### Data persistence
- This application uses local extension storage so data is written to disk (non-volatile memory). Links are saved even when the browser session is closed or when the PC is powered off.
### Tooltip
- Hovering the cursor on a link, a tooltip containing the URL (the actual website) appears on the bottom right of the cursor for reference.
### Favicon
- On the left, the favicon (favourite icon) of the webpage is rendered for ease of reference when there are multiple links.
### Long links or titles
- If a URL or title is too long, the text becomes truncated with ellipses instead of overflowing to reduce visual clutter.

## Acknowledgements
- 
