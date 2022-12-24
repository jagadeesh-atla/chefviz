const fs = require('fs');
const pptr = require('puppeteer');

async function run() {
    const browser = await pptr.launch();
    const page = await browser.newPage();
    await page.goto('https://www.codechef.com/users/aviral19');

    const data = await page.$$eval('.content .user-profile-container', (elements) =>
        elements.map((e) => ({
            // url: https://www.codechef.com/
            platform: 'CodeChef',
            // name
            name: e.querySelector('.h2-style').innerText,
            // username; url : https://www.codechef.com/users/{username}
            username: e.querySelector('.side-nav .m-username--link').innerText,
            // rating: e.querySelector('.side-nav .rating').innerText,
            rating: Array.from(document.querySelectorAll('.rating-header div'), (el) => el.innerText),
            highRating: e.querySelector('.rating-header small').innerText.slice(1, -1),
            // global: first, https://www.codechef.com/ratings/all ; country: second, https://www.codechef.com/ratings/all?filterBy=Country%3D{country}; 
            ranks: Array.from(document.querySelectorAll('.rating-ranks strong'), (el) => el.innerText),
            // country
            country: e.querySelector('.side-nav .user-country-name').innerText,
            // total no. of contest participated
            noOfContest: e.querySelector('.rating-title-container .contest-participated-count b').innerText,
            // rating graph
            ratingGraph: e.querySelector('#cumulative-graph').outerHTML,
            // submission graph
            submissionsGraph: e.querySelector('#submissions-graph').outerHTML,
            // name of contests participated
            contestsParticipated: Array.from(document.querySelectorAll('.rating-data-section .content p strong'), (el) => el.innerText.slice(0, -1)),
            // solved problems either full or partial
            solved: Array.from(document.querySelectorAll('.rating-data-section .content article a'), (el) => el.innerText),
            // and their links
            solvedLinks: Array.from(document.querySelectorAll('.rating-data-section .content article a'), (el) => el.href),
            // total no. of problems solved and contributions
            TotalWork: Array.from(document.querySelectorAll('.rating-data-section .content h5'), (el) => el.innerText),
        })
        ),
    );

    console.log(data[0]);

    fs.writeFile('codechefDATA.json', JSON.stringify(data[0]), (err) => {
        if (err) throw err;
        console.log('File saved');
    });

    await browser.close();
}

run();
