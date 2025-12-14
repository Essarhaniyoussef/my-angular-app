import Dexie, { Table } from 'dexie';

// ===== Models =====
export interface User {
  id?: number;
  username: string;
  password: string;
  role: 'user' | 'admin'; // new role property
}

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  selectedQty?: number; 
}

// ===== Dexie DB =====
export class AppDB extends Dexie {
  users!: Table<User>;
  products!: Table<Product>;

  constructor() {
    super('AppDB');

    this.version(1).stores({
      users: '++id, username, password, role',
      products: '++id, name, price, quantity',
    });
  }
}

export const db = new AppDB();
