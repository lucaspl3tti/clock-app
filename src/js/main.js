// import scss files
import '../scss/main.scss';

// import js plugins
import GetTimezonePlugin from './plugins/get-timezone.plugin';
import ProgrammingQuotesPlugin from './plugins/programming-quotes.plugin';
import GetLocationPlugin from './plugins/get-location.plugin';

// register js plugins
const getTimezone = new GetTimezonePlugin('#app');
const programmingQuotes = new ProgrammingQuotesPlugin('#programmingQuote');
const getLocation = new GetLocationPlugin('#app');
