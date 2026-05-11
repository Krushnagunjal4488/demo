import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
  fullName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  
  private currentUserSignal = signal<User | null>(null);
  public currentUser = computed(() => this.currentUserSignal());
  public isLoggedIn = computed(() => this.currentUserSignal() !== null);

  constructor() {
    this.loadUserFromStorage();
  }

  register(email: string, password: string, fullName: string): boolean {
    const users = this.getStoredUsers();
    
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }

    const newUser: User = { email, password, fullName };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      this.currentUserSignal.set(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUserSignal.set(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  private getStoredUsers(): User[] {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  }
}
