import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { User } from '../../db/app-db';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class Auth {
  username = '';
  password = '';
  error = '';
  isLogin = true; // toggle between login/signup
  role: 'user' | 'admin' = 'user'; // default role for signup
  loggedInUser: User | null = null; // <-- add this


  constructor(private userService: UserService, private router: Router) {}

    async submit() {
    this.error = '';

    if (this.isLogin) {
      const user = await this.userService.login(this.username, this.password);
      if (!user) {
        this.error = 'Invalid username or password';
        return;
      }
      this.loggedInUser = user;
      // navigate so components read current user on init
      await this.router.navigate(['/products']);
    } else {
      const user = await this.userService.signup(this.username, this.password, this.role);
      if (!user) {
        this.error = 'Username already exists';
        return;
      }
      this.loggedInUser = user;
      await this.router.navigate(['/products']);
    }

    // clear sensitive field
    this.password = '';
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
    this.error = '';
  }
}


