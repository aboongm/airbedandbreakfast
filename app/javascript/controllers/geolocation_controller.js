import { Controller } from '@hotwired/stimulus';
import { getDistance, convertDistance } from 'geolib';

export default class extends Controller {
  static targets = ['property'];
  connect() {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      console.log('geolib: ', getDistance);
      this.element.dataset.latitude = pos.coords.latitude;
      this.element.dataset.longitude = pos.coords.longitude;

      this.propertyTargets.forEach((propertyTarget) => {
        let distanceFrom = getDistance(
          { latitude: pos.coords.latitude, longitude: pos.coords.longitude },
          {
            latitude: propertyTarget.dataset.latitude,
            longitude: propertyTarget.dataset.longitude,
          }
        );
        let distance = convertDistance(distanceFrom, 'km');
        propertyTarget.querySelector(
          '[data-distance-away]'
        ).innerHTML = `${Math.ceil(distance)} kms away`;
      });
    });
  }
}
