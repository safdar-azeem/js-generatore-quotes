const getQuoteBtn = document.querySelector('.getQuoteBtn');
const tweetBtn = document.querySelector('.tweetBtn');
const qoutContainer = document.querySelector('.qoutContainer');
let data;

async function getQuote() {
	try {
		// load spinner
		qoutContainer.innerHTML = ' <div class="loader " role="status"> </div>';

		//  promises
		const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
		const apiUrl =
			'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
		const responce = await fetch(proxyUrl + apiUrl);
		data = await responce.json();

		// load qoutes
		const markUp = `
        <h2 class="text_quotes">
        ${data.quoteText}
        </h2>
        <div class="side-center mt-8">
        <i class="fas fa-user me-3 fs-20"></i>
        <h5 class="author fs-19 m-0">
        ${data.quoteAuthor === '' ? 'unknown' : data.quoteAuthor}
        </h5>
        </div>
        `;

		qoutContainer.innerHTML = markUp;
	} catch (err) {
		getQuote();
	}
}

getQuote();

// upload tweet
function tweet() {
	const quote = data.quoteText;
	const author = ` ${data.quoteAuthor === '' ? 'unknown' : data.quoteAuthor}`;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

// event handlers
getQuoteBtn.addEventListener('click', getQuote);
tweetBtn.addEventListener('click', tweet);
