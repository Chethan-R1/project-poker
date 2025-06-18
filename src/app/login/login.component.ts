import { Component } from '@angular/core';
import { UserService, UserDetails } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  username: string = '';

  constructor(private userService: UserService,private route:Router) {}


 getNextUserId(): string {
  const key = 'planitpoker_user_counter';
  let counter = Number(localStorage.getItem(key)) || 1;
  localStorage.setItem(key, String(counter + 1));
  return `user-${counter}`;
}

 login(): void {
  const trimmed = this.username.trim();
  if (trimmed) {
    const user: UserDetails = {
      userId: this.getNextUserId(),
      username: trimmed,
      firstUser: false // temporary default
    };

    this.userService.addUser(user).subscribe({
      next: (savedUser) => {
        // Save user details in local storage
        localStorage.setItem('currentUser', trimmed);
        localStorage.setItem('currentUserId', savedUser.userId);

        // ✅ Check using backend if this is first user
        this.userService.isFirstUser(savedUser.userId).subscribe((isFirst: boolean) => {
          if (isFirst) {
            this.route.navigate(['/room']); // Admin view
          } else {
            const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
            localStorage.removeItem('redirectAfterLogin');
            this.route.navigateByUrl(redirectUrl); // Join vote room via link
          }
        });
      },
      error: (err) => {
        console.error('Failed to add user:', err);
        alert('Login failed!');
      }
    });
  }
}

  
}


