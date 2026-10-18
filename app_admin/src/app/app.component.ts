
import { Component } from '@angular/core';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TripListingComponent, AddTripComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Getaways Administration';
}
