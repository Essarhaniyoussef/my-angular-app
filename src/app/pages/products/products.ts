import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { Product } from '../../db/app-db';
import { UserService } from '../../services/user-service';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  cart: Product[] = [];
  currentUserName: string = '';

  newProduct: Product = { name: '', price: 0, quantity: 0 };
  editingProductId: number | null = null;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef, public userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    const user = this.userService.getCurrentUser();
    if (user) this.currentUserName = user.username;
    await this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productService.getAll();
    this.cdr.detectChanges();
  }

  // ================== CRUD METHODS ==================

  async addProduct() {
    if (!this.userService.isAdmin()) {
      alert('Only admins can add products!');
      return;
    }
    if (!this.newProduct.name) return;

    await this.productService.add(this.newProduct);
    this.newProduct = { name: '', price: 0, quantity: 0 };
    await this.loadProducts();
  }

  editProduct(product: Product) {
    if (!this.userService.isAdmin()) {
      alert('Only admins can edit products!');
      return;
    }
    this.editingProductId = product.id!;
    this.newProduct = { ...product };
  }

  async updateProduct() {
    if (!this.userService.isAdmin()) {
      alert('Only admins can update products!');
      return;
    }
    if (!this.newProduct.id) return;

    await this.productService.update(this.newProduct);
    this.editingProductId = null;
    this.newProduct = { name: '', price: 0, quantity: 0 };
    await this.loadProducts();
  }

  async deleteProduct(id: number) {
    if (!this.userService.isAdmin()) {
      alert('Only admins can delete products!');
      return;
    }

    await this.productService.delete(id);
    await this.loadProducts();
  }

  cancelEdit() {
    this.editingProductId = null;
    this.newProduct = { name: '', price: 0, quantity: 0 };
  }

  // ================== CART METHODS ==================

  addToCart(product: Product) {
    if (!product.selectedQty || product.selectedQty < 1) return;
    const existing = this.cart.find(p => p.id === product.id);
    if (existing) {
      existing.selectedQty! += product.selectedQty!;
    } else {
      this.cart.push({ ...product });
    }
    product.selectedQty = 0;
  }

  grandTotal(): number {
    return this.cart.reduce((sum, p) => sum + (p.price * (p.selectedQty || 0)), 0);
  }

  // ================== PDF ==================

  generatePDF() {
    if (!this.cart || this.cart.length === 0) return;

    const doc = new jsPDF();

    // Get logged-in user
    const user = this.userService.getCurrentUser();
    const username = user ? user.username : 'Guest';

    // Title & user info
    doc.setFontSize(16);
    doc.text('Invoice', 14, 15);
    doc.setFontSize(12);
    doc.text(`User: ${username}`, 14, 22);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

    // Table
    autoTable(doc, {
      startY: 40,
      head: [['Name', 'Price (MAD)', 'Quantity', 'Total (MAD)']],
      body: this.cart.map(item => [
        item.name,
        item.price,
        item.selectedQty ?? 0,
        item.price * (item.selectedQty ?? 0)
      ])
  });

      // Grand total below table
      const finalY = (doc as any).lastAutoTable?.finalY ?? 0;
      doc.text(`Grand Total: ${this.grandTotal()} MAD`, 14, finalY + 10);

      doc.save('invoice.pdf');
}


  incrementQty(product: Product) {
  if (!product.selectedQty) product.selectedQty = 0;
  if (product.selectedQty < (product.quantity || 100)) {
    product.selectedQty++;
    }
  }

  decrementQty(product: Product) {
    if (!product.selectedQty) product.selectedQty = 0;
    if (product.selectedQty > 0) {
      product.selectedQty--;
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
