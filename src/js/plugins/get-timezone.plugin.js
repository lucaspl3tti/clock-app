/**
 * This plugin gets the users timezone using the WorldTime API
 */
export default class GetTimezonePlugin {
    constructor(el) {
        this.el = document.querySelector(el);

        // get background image elements
        this.backgroundDaytime = this.el.querySelector('#backgroundDaytime');
        this.backgroundNighttime = this.el.querySelector('#backgroundNighttime');

        // get main content elements
        this.mainContent = this.el.querySelector('#time');
        this.greeting = this.mainContent.querySelector('.greeting');
        this.iconSun = this.greeting.querySelector('.icon--sun');
        this.iconMoon = this.greeting.querySelector('.icon--moon');
        this.greetingText = this.greeting.querySelector('#greetingText');
        this.currentTimeEl = this.mainContent.querySelector('#currentTime');
        this.timezone = this.mainContent.querySelector('#timezone');

        // get all elements for the more information section
        this.mainSection = this.el.querySelector('#main');
        this.moreInfoBtn = this.mainSection.querySelector('#openMoreInformation');
        this.sidebar = this.el.querySelector('#moreInformation');
        this.sidebarContent = this.sidebar.querySelector('.sidebar-content');

        this.currentTimezone = this.sidebar.querySelector('#currentTimezone');
        this.currentTimezoneCopy = this.currentTimezone.querySelector('.sidebar__copy');

        this.yearDay = this.sidebar.querySelector('#yearDay');
        this.yearDayCopy = this.yearDay.querySelector('.sidebar__copy');

        this.weekDay = this.sidebar.querySelector('#weekDay');
        this.weekDayCopy = this.weekDay.querySelector('.sidebar__copy');

        this.weekNumber = this.sidebar.querySelector('#weekNumber');
        this.weekNumberCopy = this.weekNumber.querySelector('.sidebar__copy');

        // define variables
        this.currentTime = null;
        this.currentHour = null;
        this.sidebarIsOpen = false;

        this.fetchTimezone();
        this.registerEvents();
    }

    fetchTimezone() {
        fetch('https://worldtimeapi.org/api/ip')
            .then((response) => {
                if (!response.ok) return alert('Timezone could not get fetched');

                return response.json();
            })
            .then((data) => {
                this.getTimedateAndHour(data, data.datetime);
                this.updatePageContent();
                this.updateMoreInformation(data);
            });
    }

    registerEvents() {
        this.moreInfoBtn.addEventListener('click', () => this.openMoreInformation());
    }

    getTimedateAndHour(data, time) {
        // get string length for the first slice
        const stringLength = time.length;
        this.currentTime = time.slice(11, stringLength);

        // get current time with a second slice
        this.currentTime = this.currentTime.slice(0, 5);

        // get current hour
        this.currentHour = time.slice(0, 2);

        this.updateClock(this.currentTime, data.abbreviation);
    }

    updateClock(currentTime, timezone) {
        this.currentTimeEl.textContent = currentTime;
        this.timezone.textContent = timezone;
    }

    updateMoreInformation(data) {
        this.currentTimezoneCopy.textContent = data.timezone;
        this.yearDayCopy.textContent = data.day_of_year;
        this.weekDayCopy.textContent = data.day_of_week;
        this.weekNumberCopy.textContent = data.week_number;
    }

    updatePageContent() {
        this.currentHour = parseInt(this.currentHour);

        // if currentHour is not a valid time of day return error
        if (this.currentHour > 23 || this.currentHour < 0) {
            return alert(`ERROR: currentHour with value ${this.currentHour} is not valid`);
        }

        // if it's between 12pm and 6pm set time to afternoon
        if (this.currentHour >= 12 && this.currentHour <= 18) {
            this.updateContentAfternoon();
            return;
        }

        // if it's between 7pm and 4am set time to night
        if (this.currentHour >= 19 || this.currentHour <= 4) {
            this.updateContentNight();
            return;
        }

        // if it's between 5am and 11am set time to morning
        this.updateContentMorning();
    }

    updateContentMorning() {
        this.el.classList.add('app--morning');
        this.greetingText.innerHTML = 'Good Morning, it\'s currently';

        this.backgroundDaytime.classList.add('active');
        this.backgroundNighttime.classList.remove('active');

        this.iconSun.classList.add('active');
        this.iconMoon.classList.remove('active');
    }

    updateContentAfternoon() {
        this.el.classList.add('app--afternoon');
        this.greetingText.innerHTML = 'Good Afternoon, it\'s currently';

        this.backgroundDaytime.classList.add('active');
        this.backgroundNighttime.classList.remove('active');

        this.iconSun.classList.add('active');
        this.iconMoon.classList.remove('active');
    }

    updateContentNight() {
        this.el.classList.add('app--night');
        this.greetingText.innerHTML = 'Good Evening, it\'s currently';

        this.backgroundDaytime.classList.remove('active');
        this.backgroundNighttime.classList.add('active');

        this.iconSun.classList.remove('active');
        this.iconMoon.classList.add('active');
    }

    openMoreInformation() {
        if (this.sidebarIsOpen) {
            this.sidebarIsOpen = false;
            this.mainSection.classList.remove('main--more-information-is-open');
            this.sidebarContent.classList.remove('sidebar--is-open');
            this.changeMoreInfoBtn();
            return;
        }

        this.sidebarIsOpen = true;
        this.mainSection.classList.add('main--more-information-is-open');
        this.sidebarContent.classList.add('sidebar--is-open');
        this.changeMoreInfoBtn();
    }

    changeMoreInfoBtn() {
        const btnText = this.moreInfoBtn.querySelector('.btn__text');

        if (this.sidebarIsOpen) {
            btnText.textContent = 'Less';
            this.moreInfoBtn.classList.add('btn-primary--active');
            return;
        }

        btnText.textContent = 'More';
        this.moreInfoBtn.classList.remove('btn-primary--active');
    }
}
