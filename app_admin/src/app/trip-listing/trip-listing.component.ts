
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { EditTripComponent } from '../edit-trip/edit-trip.component';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent, EditTripComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: any[] = [];
  selectedTrip: any = null;

  constructor(private tripDataService: TripDataService) {}

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
      },
      error: (error) => {
        console.error('Error loading trips:', error);
      }
    });
  }

  editTrip(trip: any): void {
    this.selectedTrip = { ...trip };
  }

  cancelEdit(): void {
    this.selectedTrip = null;
  }
}
