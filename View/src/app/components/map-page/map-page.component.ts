import { Component, OnInit } from '@angular/core';
export const environment = {
  googleMapsApiKey: '' 
};
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 30.0444, lng: 31.2357 };
  zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    scrollwheel: true,
    disableDefaultUI: false,
  };

  selectedPlace: { lat: number; lng: number } | null = null;

  restaurants = [
    { name: 'Restaurant 1', lat: 30.045, lng: 31.240, address: '123 Main St' },
    { name: 'Restaurant 2', lat: 30.040, lng: 31.230, address: '456 Elm St' },
    { name: 'Restaurant 3', lat: 30.050, lng: 31.250, address: '789 Pine St' },
  ];

  ngOnInit(): void {
    this.loadGoogleMapsScript();
  }


  loadGoogleMapsScript() {
    if (!document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);


      (window as any).initMap = () => {
        console.log('Google Maps script loaded');
        this.initMap();
      };
    }
  }

  initMap() {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: this.center,
      zoom: this.zoom,
      mapTypeId: this.options.mapTypeId,
    });

    this.restaurants.forEach((restaurant) => {
  const marker = new google.maps.Marker({
    position: { lat: restaurant.lat, lng: restaurant.lng },
    map: map,
    title: restaurant.name,
    icon: {
      url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',  // Use predefined restaurant icon or replace with custom icon URL
      scaledSize: new google.maps.Size(40, 40), 
    },
  });

  marker.addListener('click', () => {
    console.log(`Clicked on ${restaurant.name}`);
    alert(`Restaurant: ${restaurant.name}\nAddress: ${restaurant.address}`);
  });
});

    console.log('Google Map initialized with restaurant markers');
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.selectedPlace = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      console.log('Selected Coordinates:', this.selectedPlace);
    }
  }
}
