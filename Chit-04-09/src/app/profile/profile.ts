import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Profile {
  protected authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout();
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
