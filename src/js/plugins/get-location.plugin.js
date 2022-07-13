/**
 * This plugin handles the generating of a random programming quote
 */
export default class GetLocationPlugin {
    constructor(el) {
        this.el = document.querySelector(el);

        // get all important elements
        this.mainContent = this.el.querySelector('#time');
        this.city = this.mainContent.querySelector('#city');
        this.country = this.mainContent.querySelector('#country');

        this.fetchLocation();
    }

    fetchLocation() {
        fetch('https://api.ipbase.com/v2/info?apikey=C2kOLOORogBnhk20DuRu3PbNiC1J5stlHa3wHA32')
            .then((response) => {
                if (!response.ok) return alert('Location could not get fetched');

                return response.json();
            })
            .then((response) => {
                this.city.textContent = response.data.location.city.name;
                this.country.textContent = response.data.location.country.name;
            });
    }
}
