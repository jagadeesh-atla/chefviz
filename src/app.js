async function run(handel) {
    const pptr = require('puppeteer');
    const url = 'https://www.codechef.com/users/' + handel;
    const browser = await pptr.launch();
    const page = await browser.newPage();
    await page.goto(url);
    // const err = 'The username specified does not exist in our database.';
    const data = await page.$$eval('.content .user-profile-container', (elements) =>
        elements.map((e) => ({
            name: e.querySelector('.h2-style').innerText,   // name as per codechef
            handel: e.querySelector('.side-nav .m-username--link').innerText,   // handel
            country: e.querySelector('.side-nav .user-country-name').innerText, // country
            rating: Array.from(document.querySelectorAll('.rating-header div'), (el) => el.innerText),  // ratings
            maxRating: e.querySelector('.rating-header small').innerText.slice(1, -1),  // highest rating
            ranks: Array.from(document.querySelectorAll('.rating-ranks strong'), (el) => el.innerText), // ranks : global, country
            noOfContest: e.querySelector('.rating-title-container .contest-participated-count b').innerText, // #contests
            rGraph: e.querySelector('#cumulative-graph').outerHTML,    // rating graph
            sGraph: e.querySelector('#submissions-graph').outerHTML,    // submision graph
            contestsParticipated: Array.from(document.querySelectorAll('.rating-data-section .content p strong'), (el) => el.innerText.slice(0, -1)), // contents name
            solved: Array.from(document.querySelectorAll('.rating-data-section .content article a'), (el) => el.innerText), // solved problems names
            sLinks: Array.from(document.querySelectorAll('.rating-data-section .content article a'), (el) => el.href), // solved links
            totWork: Array.from(document.querySelectorAll('.rating-data-section .content h5'), (el) => el.innerText),   // total work
        })
        ),
    );
    await browser.close();
    if (!data[0]) {
        console.log('no user');
        return 'nouser';
    }
    else {
        console.log(data[0]);
        return data[0];
    }
}

module.exports = { run }

// // url: https://www.codechef.com/
// platform: 'CodeChef',
// // name
// name: e.querySelector('.h2-style').innerText,
// // username; url : https://www.codechef.com/users/{username}
// username: e.querySelector('.side-nav .m-username--link').innerText,
// // rating: e.querySelector('.side-nav .rating').innerText,
// rating: Array.from(document.querySelectorAll('.rating-header div'), (el) => el.innerText),
// highRating: e.querySelector('.rating-header small').innerText.slice(1, -1),
// // global: first, https://www.codechef.com/ratings/all ; country: second, https://www.codechef.com/ratings/all?filterBy=Country%3D{country};
// ranks: Array.from(document.querySelectorAll('.rating-ranks strong'), (el) => el.innerText),
// // country
// country: e.querySelector('.side-nav .user-country-name').innerText,
// // total no. of contest participated
// noOfContest: e.querySelector('.rating-title-container .contest-participated-count b').innerText,
// // rating graph
// ratingGraph: e.querySelector('#cumulative-graph').outerHTML,
// // submission graph
// submissionsGraph: e.querySelector('#submissions-graph').outerHTML,
// // name of contests participated
// contestsParticipated: Array.from(document.querySelectorAll('.rating-data-section .content p strong'), (el) => el.innerText.slice(0, -1)),
// // solved problems either full or partial
// solved: Array.from(document.querySelectorAll('.rating-data-section .content article a'), (el) => el.innerText),
// // and their links
// solvedLinks: Array.from(document.querySelectorAll('.rating-data-section .content article a'), (el) => el.href),
// // total no. of problems solved and contributions
// TotalWork: Array.from(document.querySelectorAll('.rating-data-section .content h5'), (el) => el.innerText),