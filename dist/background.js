browser.runtime.onInstalled.addListener(async (details) => {
    // Initialise empty array on install
    if (details.reason === "install") {
        await browser.storage.local.set({ urls: [] });
    }
});
export {};
//# sourceMappingURL=background.js.map