import { Controller } from '@hotwired/stimulus';
import { getDistance, convertDistance } from 'geolib';
import { isEmpty } from 'lodash-es';

export default class extends Controller {
  static targets = ['property'];
  connect() {
    if (
      isEmpty(this.element.dataset.latitude) &&
      isEmpty(this.element.dataset.longitude)
    ) {
      window.navigator.geolocation.getCurrentPosition((pos) => {
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
    } else {
      this.propertyTargets.forEach((propertyTarget) => {
        let distanceFrom = getDistance(
          {
            latitude: this.element.dataset.latitude,
            longitude: this.element.dataset.longitude,
          },
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
    }
  }
}
