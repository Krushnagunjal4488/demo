import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  errorMessage = signal('');

  login() {
    const email = this.email();
    const password = this.password();

    if (!email || !password) {
      this.errorMessage.set('Please fill in all fields');
      return;
    }

    if (this.authService.login(email, password)) {
      this.router.navigate(['/profile']);
    } else {
      this.errorMessage.set('Invalid email or password');
      this.password.set('');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
