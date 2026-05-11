import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  fullName = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  errorMessage = signal('');

  register() {
    const fullName = this.fullName();
    const email = this.email();
    const password = this.password();
    const confirmPassword = this.confirmPassword();

    if (!fullName || !email || !password || !confirmPassword) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match');
      this.password.set('');
      this.confirmPassword.set('');
      return;
    }

    if (password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters');
      return;
    }

    if (this.authService.register(email, password, fullName)) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage.set('Email already registered');
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
