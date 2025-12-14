import { Injectable } from '@angular/core';
import { db, Product } from '../db/app-db';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbReady = false;

  // Ensure DB is open and preloaded
  async ensureDB() {
    if (!this.dbReady) {
      await db.open();
      const count = await db.products.count();
      if (count === 0) {
        await db.products.bulkAdd([
          { name: 'Laptop', price: 800, quantity: 5 },
          { name: 'Mouse', price: 50, quantity: 20 },
          { name: 'Keyboard', price: 120, quantity: 10 },
          { name: 'Monitor', price: 500, quantity: 7 }
        ]);
      }
      this.dbReady = true;
    }
  }

  // ================== CRUD ==================

  async getAll(): Promise<Product[]> {
    await this.ensureDB(); 
    return db.products.toArray();
  }

  async add(product: Product): Promise<number> {
    await this.ensureDB();
    return db.products.add(product);
  }

  async update(product: Product): Promise<number> {
    if (!product.id) throw new Error('Product ID is required for update');
    await this.ensureDB();
    return db.products.update(product.id, {
      name: product.name,
      price: product.price,
      quantity: product.quantity
    });
  }

  async delete(id: number): Promise<void> {
    await this.ensureDB();
    return db.products.delete(id);
  }
}
