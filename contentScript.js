(() => {
    // Variables for YouTube controls and player elements, and current video/bookmarks information
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    // Function to fetch bookmarks from Chrome's storage
    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    // Event handler to add a new bookmark at the current video time
    const addNewBookmarkEventHandler = async () => {
        if (!youtubePlayer) return; 

        const currentTime = youtubePlayer.currentTime; // Get current time of the video
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime), // Create a bookmark object with a description
        };

        currentVideoBookmarks = await fetchBookmarks(); // Fetch existing bookmarks

        // Update bookmarks with the new one and sort by time
        const updatedBookmarks = [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time);

        // Save updated bookmarks to Chrome's storage
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify(updatedBookmarks)
        });
    };

    // Function to handle new video loaded event
    const newVideoLoaded = async () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0]; // Check if bookmark button already exists

        // If bookmark button doesn't exist, create it
        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png"); // Set button image
            bookmarkBtn.className = "ytp-button bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0]; // Get YouTube controls
            youtubePlayer = document.getElementsByClassName('video-stream')[0]; // Get YouTube player

            if (youtubeLeftControls && youtubePlayer) {
                youtubeLeftControls.appendChild(bookmarkBtn); // Add button to controls
                bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler); // Add click event listener to button
            }
        }
        currentVideoBookmarks = await fetchBookmarks(); // Fetch bookmarks for the new video
    };

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        // Handle different message types
        if (type === "NEW") {
            currentVideo = videoId; // Set current video ID
            newVideoLoaded(); // Load new video bookmarks
        } else if (type === "PLAY") {
            if (youtubePlayer) {
                youtubePlayer.currentTime = value; // Set video time to the specified value
            }
        } else if (type === "DELETE") {
            // Delete the specified bookmark and update storage
            currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
            chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

            response(currentVideoBookmarks); // Respond with updated bookmarks
        }
    });

    // Add event listener for YouTube navigation finish event to load new video bookmarks
    document.addEventListener('yt-navigate-finish', newVideoLoaded);

    // Utility function to format time in HH:MM:SS format
    const getTime = t => {
        const date = new Date(0);
        date.setSeconds(t);
        return date.toISOString().substring(11, 19); 
    };
})();
