
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TripListingComponent,
    AddTripComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Travlr Getaways Administration';

  isLoggedIn = !!sessionStorage.getItem('travlr-token');

  onLoginSuccess(): void {
    this.isLoggedIn = true;
  }

  logout(): void {
    sessionStorage.removeItem('travlr-token');
    this.isLoggedIn = false;
  }
}
