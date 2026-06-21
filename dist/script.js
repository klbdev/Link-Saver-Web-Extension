// Objects
const linkSaverForm = document.querySelector(".link-saver-form");
const urlInput = document.getElementById("url-input");
const anchorInput = document.getElementById("anchor-input");
const hexColorSelect = document.getElementById("color-select");
const urlList = document.querySelector(".saved-url-list");
const toolTip = document.getElementById("cursor-tooltip");
// Displays all saved links on start
renderUI();
// Event listeners
linkSaverForm.addEventListener("submit", async (event) => {
    // Do not reload the extension
    event.preventDefault();
    // Insert data into extension storage array
    const cleanedUrl = urlInput.value.trim();
    const anchorText = anchorInput.value;
    const data = {
        url: cleanedUrl,
        anchor: anchorText === "" ? cleanedUrl : anchorText,
        hexColor: hexColorSelect.value
    };
    addUrl(data);
    linkSaverForm.reset();
});
// Functions
async function getUrlArray() {
    const object = await browser.storage.local.get("urls");
    console.log(object.urls);
    return object.urls;
}
async function addUrl(data) {
    const curArray = await getUrlArray();
    curArray.push(data);
    await browser.storage.local.set({ urls: curArray });
    renderUI();
}
async function removeUrl(index) {
    const curArray = await getUrlArray();
    curArray.splice(index, 1);
    await browser.storage.local.set({ urls: curArray });
    renderUI();
}
function configureTooltip(xOffset, yOffset) {
    const links = urlList.getElementsByTagName("a");
    Array.from(links).forEach(link => {
        // On hover, unhide tooltip and show href value
        link.addEventListener("mouseenter", () => {
            toolTip.textContent = link.href;
            toolTip.classList.remove("hidden");
        });
        // On movement, update the coordinates of the tooltip to always be on the bottom right
        link.addEventListener("mousemove", (e) => {
            toolTip.style.left = `${e.clientX + xOffset}px`;
            toolTip.style.top = `${e.clientY + yOffset}px`;
        });
        // On leave, hide the tooltip
        link.addEventListener("mouseleave", () => {
            toolTip.classList.add("hidden");
        });
    });
}
async function renderUI() {
    const urlArray = await getUrlArray();
    urlList.innerHTML = "";
    urlArray.forEach((url, idx) => {
        const li = document.createElement("li");
        // Create pointer
        const pointerDiv = document.createElement("div");
        pointerDiv.textContent = "➤";
        pointerDiv.classList.add("hidden");
        // Create favicon image
        const faviconImg = document.createElement("img");
        const domain = new URL(url.url).hostname;
        // Google's shared favicon service
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=16`;
        faviconImg.src = faviconUrl;
        faviconImg.classList.add("favicon");
        faviconImg.alt = "";
        // Create anchor, embed link and title
        const a = document.createElement("a");
        a.href = url.url;
        a.target = "_blank";
        a.textContent = url.anchor;
        a.style.color = url.hexColor;
        // Create the delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑️";
        deleteBtn.addEventListener("click", () => {
            removeUrl(idx);
        });
        li.appendChild(pointerDiv);
        li.appendChild(faviconImg);
        li.appendChild(a);
        li.appendChild(deleteBtn);
        urlList.appendChild(li);
    });
    // Add event listeners for tooltip
    configureTooltip(12, 10);
}
export {};
//# sourceMappingURL=script.js.map