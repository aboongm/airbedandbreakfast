import { Controller } from '@hotwired/stimulus';
import { toggle } from '../helpers/el-transition';

export default class extends Controller {
  static targets = ['openUserMenu', 'userAuthLink'];

  connect() {
    this.openUserMenuTarget.addEventListener('click', this.toggleDropdownMenu);

    this.userAuthLinkTargets.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('modal-wrapper').click();
      });
    });
  }

  toggleDropdownMenu() {
    toggle(document.getElementById('menu-dropdown-items'));
  }
}
