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
        this.setUserCoordinates(pos.coords);
        this.setDistanceText();
      });
    } else {
      this.setDistanceText();
    }
  }

  setUserCoordinates(coordinates) {
    this.element.dataset.latitude = coordinates.latitude;
    this.element.dataset.longitude = coordinates.longitude;
  }

  getUserCoordinates() {
    return {
      latitude: this.element.dataset.latitude,
      longitude: this.element.dataset.longitude,
    };
  }

  setDistanceText() {
    this.propertyTargets.forEach((propertyTarget) => {
      let distanceFrom = getDistance(
        this.getUserCoordinates(),

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
