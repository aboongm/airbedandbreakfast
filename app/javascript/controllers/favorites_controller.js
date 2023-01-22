import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  favorite() {
    console.log('favorite button clicked!');
    if (this.element.dataset.favorited === 'true') {
      this.element.dataset.favorited = 'false';
      this.element.setAttribute('fill', 'lightgray');
    } else {
      this.element.setAttribute('fill', 'red');
      this.element.dataset.favorited = 'true';
    }
  }
}
