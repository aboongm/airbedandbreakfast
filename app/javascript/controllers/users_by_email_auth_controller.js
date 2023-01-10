import { Controller } from '@hotwired/stimulus';
import axios from 'axios';

export default class extends Controller {
  static targets = ['email', 'submit'];

  connect() {
    this.submitTarget.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('After axios');

      if (this.emailTarget.value.length === 0) {
        console.log('clicked');
      } else {
        axios
          .get('/api/users_by_email', {
            params: {
              email: this.emailTarget.value,
            },
            headers: {
              ACCEPT: 'application/json',
            },
          })
          .then((response) => {
            Turbo.visit('/users/sign_in');
          })
          .catch((response) => {
            Turbo.visit('/users/sign_up');
          });
      }
    });
  }
}
