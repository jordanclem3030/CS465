
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>();

  email = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onLogin(): void {
    this.errorMessage = '';

    this.http.post<{ token: string }>(
      'http://localhost:3000/api/login',
      {
        email: this.email,
        password: this.password
      }
    ).subscribe({
      next: (response) => {
        sessionStorage.setItem('travlr-token', response.token);
        this.password = '';
        this.loginSuccess.emit();
      },
      error: () => {
        this.errorMessage = 'Invalid email or password.';
        this.password = '';
      }
    });
  }
}
