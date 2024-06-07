# Tweet Vanisher

Bulk delete tweets and retweets from your profile with Tweet Vanisher.

## Overview

Tweet Vanisher is a powerful script designed to help you clean up your Twitter profile by deleting all tweets and retweets in bulk. Whether you're newly famous and wish to avoid scrutiny over past opinions, or you're preparing for a job interview and want to present a clean online image, Tweet Vanisher is the tool for you.

> "It is easier to live with a bad conscience than with a bad reputation." - Friedrich Nietzsche

## How to Use

### Prerequisites

- You must be logged into your Twitter account for the script to function correctly.

### Instructions

1. Navigate to your Twitter profile's replies page by replacing `USER` with your actual Twitter username in the following URL:

   ```
   https://x.com/USER/with_replies
   ```

2. Open the browser's console:
   - **Chrome**: Right-click on the page and select `Inspect`, then go to the `Console` tab.
   - **Firefox**: Right-click on the page and select `Inspect Element`, then go to the `Console` tab.
   - **Safari**: Right-click on the page, select `Inspect Element`, then go to the `Console` tab.
   - **Edge**: Right-click on the page and select `Inspect`, then go to the `Console` tab.

3. Copy and paste the script below into the console and press `Enter`:

   ```javascript
   const deleteAllTweets = async () => {
       const processedButtons = new Set();
       const getDeleteButtons = () => Array.from(document.querySelectorAll('[data-testid="tweet"] [data-testid="caret"]'));
       const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

       const deleteBatch = async (buttons) => {
           const deletePromises = buttons.map(async (button) => {
               button.click();
               await delay(250);

               const menuItems = Array.from(document.querySelectorAll('[role="menuitem"]'));
               const deleteOption = menuItems.find(item => item.textContent === 'Delete');

               if (deleteOption) {
                   deleteOption.click();
                   document.querySelector('[data-testid="confirmationSheetConfirm"]')?.click();
               } else {
                   const tweetContainer = button.closest('[data-testid="tweet"]');
                   const unretweetButton = tweetContainer?.querySelector('[data-testid="unretweet"]');

                   if (unretweetButton) {
                       unretweetButton.click();
                       await delay(250);
                       document.querySelector('[data-testid="unretweetConfirm"]')?.click();
                   }
               }
           });

           await Promise.all(deletePromises);
       };

       while (true) {
           const deleteButtons = getDeleteButtons().filter(button => !processedButtons.has(button));
           if (deleteButtons.length === 0) break;

           const batchSize = 10;
           for (let i = 0; i < deleteButtons.length; i += batchSize) {
               const batch = deleteButtons.slice(i, i + batchSize);
               await deleteBatch(batch);
               await delay(3000);
           }
       }

       console.log('All tweets deleted successfully!');
   };

   deleteAllTweets();
   ```

### Notes

- **Complete Deletion**: This script deletes all tweets and retweets from your profile.
- **Likes are not removed**: The script does not affect your liked tweets.

## Who Should Use This Script?

- **Newly Famous Individuals**: Avoid potential controversy by removing past tweets that might not align with your current public image.
- **Job Seekers**: Clean up your social media presence before job interviews to ensure your profile is professional.
- **And Many Others**: Anyone looking to start fresh on Twitter or concerned about their digital footprint.

## Disclaimer

Use this script responsibly. Ensure you have considered the implications of deleting your tweets, as this action cannot be undone.