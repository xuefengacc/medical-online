import { Injectable, NgZone } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { GoogleMapsAPIWrapper, MapsAPILoader } from '@agm/core';
import { google } from 'google-maps';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService extends GoogleMapsAPIWrapper{

  

  constructor(private __loader: MapsAPILoader, private __zone: NgZone) {
    super(__loader, __zone);
  }

  getGeoLocation(address: string): Observable<any> {
    console.log('Getting address: ', address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
        geocoder.geocode({
            'address': address
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                observer.next(results[0].geometry.location);
                observer.complete();
            } else {
                console.log('Error: ', results, ' & Status: ', status);
                observer.error();
            }
        });
    });
}
  
}
