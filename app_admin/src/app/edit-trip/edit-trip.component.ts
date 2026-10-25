
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent {
  @Input() trip: any;

  constructor(private tripDataService: TripDataService) {}

  saveTrip(): void {
    this.tripDataService.updateTrip(this.trip).subscribe({
      next: () => {
        alert('Trip updated successfully!');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error updating trip:', error);
        alert('Unable to update trip.');
      }
    });
  }
}
