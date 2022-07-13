/**
 * This plugin handles the generating of a random programming quote
 */
export default class ProgrammingQuotesPlugin {
    constructor(el) {
        this.el = document.querySelector(el);

        // get all important elements
        this.quoteTextEl = this.el.querySelector('#quoteText');
        this.quoteAuthorEl = this.el.querySelector('#quoteAuthor');
        this.newQuoteBtn = this.el.querySelector('#refreshQuote');

        this.fetchQuote();
        this.registerEvents();
    }

    registerEvents() {
        this.newQuoteBtn.addEventListener('click', () => this.fetchQuote());
    }

    fetchQuote() {
        fetch('https://programming-quotes-api.herokuapp.com/Quotes/random')
            .then((response) => {
                if (!response.ok) return alert('Quote could not get fetched');

                return response.json();
            })
            .then((data) => {
                this.updateQuote(data.en, data.author);
            });
    }

    updateQuote(text, author) {
        this.quoteTextEl.textContent = text;
        this.quoteAuthorEl.textContent = author;
    }
}
