import { Injectable } from '@angular/core';
import { db, User } from '../db/app-db';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _currentUser: User | null = null;

  constructor() {
    const raw = localStorage.getItem('currentUser');
    if (raw) {
      try { this._currentUser = JSON.parse(raw) as User; } catch { this._currentUser = null; }
    }

  }

 async signup(username: string, password: string, role: 'user' | 'admin'): Promise<User | null> {
    await db.open();

    const existing = await db.users.where('username').equals(username).first();
    if (existing) return null; // already exists

    const id = await db.users.add({ username, password, role });
    const user: User = { id, username, password, role };
    // persist current user
    this._currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  async login(username: string, password: string): Promise<User | null> {
    await db.open();
    const user = (await db.users.where({ username, password }).first()) ?? null;
    if (user) {
      this._currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
    return user;
    }

      getCurrentUser(): User | null {
      return this._currentUser;
    }

  isAdmin(): boolean {
    return this._currentUser?.role === 'admin';
  }

  async getAllUsers(): Promise<User[]> {
    await db.open();
    return db.users.toArray();
  }

  logout(): void {
    this._currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
