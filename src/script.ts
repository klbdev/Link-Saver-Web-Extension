// Objects
const linkSaverForm = document.querySelector(".link-saver-form") as HTMLFormElement;
const urlInput = document.getElementById("url-input") as HTMLInputElement;
const anchorInput = document.getElementById("anchor-input") as HTMLInputElement;
const hexColorSelect = document.getElementById("color-select") as HTMLSelectElement;
const urlList = document.querySelector(".saved-url-list") as HTMLUListElement;
const toolTip = document.getElementById("cursor-tooltip") as HTMLDivElement;

// Displays all saved links on start
renderUI();


type Url = {
    url: string,
    anchor: string,
    hexColor: string
}

// Event listeners
linkSaverForm.addEventListener("submit", async (event) => {
    // Do not reload the extension
    event.preventDefault();

    // Insert data into extension storage array
    const cleanedUrl: string = urlInput.value.trim();
    const anchorText: string = anchorInput.value;
    const data: Url = {
        url: cleanedUrl,
        anchor: anchorText === "" ? cleanedUrl : anchorText,
        hexColor: hexColorSelect.value
    }
    addUrl(data);
    linkSaverForm.reset();
});


// Functions
async function getUrlArray(): Promise<Url[]> {
    const object = await browser.storage.local.get("urls");
    console.log(object.urls);
    return object.urls as Url[];
}


async function addUrl(data: Url): Promise<void> {
    const curArray = await getUrlArray();
    curArray.push(data);
    await browser.storage.local.set({ urls: curArray });
    renderUI();
}


async function removeUrl(index: number): Promise<void> {
    const curArray = await getUrlArray();
    curArray.splice(index, 1);
    await browser.storage.local.set({ urls: curArray });
    renderUI();
}


function configureTooltip(xOffset: number, yOffset: number): void {
    const links: HTMLCollectionOf<HTMLAnchorElement> = urlList.getElementsByTagName("a");
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


async function renderUI(): Promise<void> {
    const urlArray = await getUrlArray();
    urlList.innerHTML = "";
    urlArray.forEach((url: Url, idx: number) => {
        const li = document.createElement("li");
        // Create pointer
        const pointerDiv = document.createElement("div");
        pointerDiv.textContent = "➤";
        pointerDiv.classList.add("hidden");

        // Create favicon image
        const faviconImg = document.createElement("img");
        const domain: string = new URL(url.url).hostname;
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


