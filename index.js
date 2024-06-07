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