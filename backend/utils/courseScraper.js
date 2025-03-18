//courseScraper.js
const puppeteer = require("puppeteer");
const axios = require("axios");

// Helper function to introduce delays
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeUdemyCourses(searchQuery) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Set user-agent and disable automation flags
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, "webdriver", {
            get: () => undefined,
        });
    });

    const url = `https://www.udemy.com/courses/search/?q=${encodeURIComponent(searchQuery)}`;
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

    let courses = [];

    try {
        // **Approach 1: Scrape via API**
        console.log("Attempting to fetch data via API...");
        const apiUrl = `https://www.udemy.com/api-2.0/search-courses/?q=${encodeURIComponent(searchQuery)}`;
        const apiResponse = await axios.get(apiUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "en-US,en;q=0.5",
                "Referer": "https://www.udemy.com/",
                "Origin": "https://www.udemy.com",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
            },
        });

        if (apiResponse.data.results && apiResponse.data.results.length > 0) {
            courses = apiResponse.data.results.slice(0, 5).map(course => ({
                title: course.title || "No Title",
                link: `https://www.udemy.com${course.url || "#"}`,
                price: course.price || "No Price",
            }));
            console.log("Successfully fetched data via API.");
            console.log("Udemy Courses:", courses);
            return courses;
        } else {
            console.warn("No results found via API. Falling back to HTML scraping...");
        }
    } catch (apiError) {
        console.error("❌ Error fetching data via API:", apiError.message);
    }

    try {
        // **Approach 2: Wait for JavaScript rendering**
        console.log("Waiting for dynamic content to load...");
        await page.waitForFunction(() => {
            return document.querySelectorAll("h3[data-purpose='course-title-url']").length > 0;
        }, { timeout: 20000 });

        // **Approach 3: Use attribute-based selectors**
        console.log("Attempting to extract data using attribute-based selectors...");
        courses = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("div[data-purpose='search-results'] > div"))
                .slice(0, 5)
                .map(course => {
                    const titleElement = course.querySelector("h3[data-purpose='course-title-url'] a");
                    const priceElement = course.querySelector("div[data-purpose='price-text-container']");
                    return {
                        title: titleElement?.innerText || "No Title",
                        link: `https://www.udemy.com${titleElement?.getAttribute("href") || "#"}`,
                        price: priceElement?.innerText || "No Price",
                    };
                });
        });

        if (courses.length > 0) {
            console.log("Successfully extracted data using attribute-based selectors.");
            console.log("Udemy Courses:", courses);
            return courses;
        } else {
            console.warn("No results found using attribute-based selectors. Falling back to XPath...");
        }
    } catch (selectorError) {
        console.error("❌ Error extracting data using attribute-based selectors:", selectorError.message);
    }

    try {
        // **Approach 4: Use XPath**
        console.log("Attempting to extract data using XPath...");
        courses = await page.evaluate(() => {
            const results = [];
            const titleNodes = document.evaluate("//h3[@data-purpose='course-title-url']/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            const priceNodes = document.evaluate("//div[contains(@class, 'price-text-container')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            for (let i = 0; i < Math.min(10, titleNodes.snapshotLength); i++) {
                const titleElement = titleNodes.snapshotItem(i);
                const priceElement = priceNodes.snapshotItem(i);
                results.push({
                    title: titleElement?.innerText || "No Title",
                    link: `https://www.udemy.com${titleElement?.getAttribute("href") || "#"}`,
                    price: priceElement?.innerText || "No Price",
                });
            }

            return results;
        });

        if (courses.length > 0) {
            console.log("Successfully extracted data using XPath.");
            console.log("Udemy Courses:", courses);
            return courses;
        } else {
            console.warn("No results found using XPath. All approaches failed.");
        }
    } catch (xpathError) {
        console.error("❌ Error extracting data using XPath:", xpathError.message);
    } finally {
        await browser.close();
    }

    return courses;
}
async function scrapeCourses(searchQuery) {
    try {
        const [udemy, coursera] = await Promise.all([
            scrapeUdemyCourses(searchQuery),
            // scrapeCourseraCourses(searchQuery),
        ]);

        return { udemy, coursera };
    } catch (error) {
        console.error("Error scraping courses:", error);
        return { udemy: [], coursera: [] };
    }
}

module.exports = { scrapeCourses };

