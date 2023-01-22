import { Controller } from '@hotwired/stimulus';
import axios from 'axios';

export default class extends Controller {
  favorite() {
    console.log('favorite button clicked!');
    if (this.element.dataset.userLoggedIn === 'false') {
      document.querySelector('[data-header-target="userAuthLink"]').click();
    } else if (this.element.dataset.favorited === 'true') {
      this.element.dataset.favorited = 'false';
      this.element.setAttribute('fill', 'lightgray');

      axios
        .delete(
          this.element.dataset.unfavoritedUrl,
          {
            id: this.element.dataset.favoriteId,
          },
          {
            headers: {
              ACCEPT: 'application/json',
            },
          }
        )
        .then((response) => {
          this.element.dataset.favorited = 'false';
          this.element.setAttribute('fill', 'lightgray');
        });
    } else {
      // this.element.dataset.favorited = 'true';
      // this.element.setAttribute('fill', 'red');

      axios
        .post(this.element.dataset.favoriteUrl, {
          params: {
            user_id: this.element.dataset.userId,
            property_id: this.element.dataset.propertyId,
          },
          headers: {
            ACCEPT: 'application/json',
          },
        })
        .then((response) => {
          this.element.dataset.favorited = 'true';
          this.element.setAttribute('fill', 'red');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
