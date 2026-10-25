
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {

  newTrip = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: '',
    description: ''
  };

  constructor(private tripDataService: TripDataService) {}

  addTrip(): void {
    this.tripDataService.addTrip(this.newTrip).subscribe({
      next: () => {
        alert('Trip added successfully!');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error adding trip:', error);
        alert('Unable to add trip. Please check the API.');
      }
    });
  }
}
