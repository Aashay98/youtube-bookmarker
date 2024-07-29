# YouTube Bookmarker Extension

## Overview

The YouTube Bookmarker extension is a handy tool that allows users to create, view, play, and manage bookmarks on YouTube videos. This extension enhances your YouTube viewing experience by enabling you to save specific timestamps, making it easier to return to important moments in your favorite videos.

## Features

- **Add Bookmarks:** Quickly add bookmarks at the current timestamp of any YouTube video.
- **View Bookmarks:** Easily view a list of all your saved bookmarks for the current video.
- **Play Bookmarks:** Jump directly to any saved bookmark with a single click.
- **Delete Bookmarks:** Remove bookmarks that are no longer needed.

## Installation

1. Clone or download the repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on the "Load unpacked" button and select the directory where you downloaded or cloned the repository.
5. The YouTube Bookmarker extension should now appear in your list of extensions.

## Usage

1. Navigate to a YouTube video.
2. Click on the bookmark icon that appears in the YouTube player controls to save the current timestamp.
3. Open the extension popup to view all your saved bookmarks.
4. Click the play icon next to a bookmark to jump to that timestamp in the video.
5. Click the delete icon next to a bookmark to remove it.

## How It Works

- **Content Script:** Injects a bookmark button into the YouTube player controls and handles bookmark creation.
- **Popup Script:** Manages the display of bookmarks in the extension popup, allowing for playing and deleting bookmarks.
- **Background Script:** Listens for messages and updates Chrome's storage with the current list of bookmarks.

## Development

- **JavaScript Modules:** The extension uses modern JavaScript practices with modular code for better maintainability.
- **Chrome APIs:** Utilizes Chrome's storage and messaging APIs to sync bookmarks and communicate between scripts.

## Contributing

Contributions are welcome! If you have suggestions for new features or improvements, feel free to create an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
