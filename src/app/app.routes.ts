import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { CustomerListComponent } from './features/customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './features/customer/customer-form/customer-form.component';
import { CustomerDetailComponent } from './features/customer/customer-detail/customer-detail.component';

/**
 * Application Routes Configuration
 * Defines navigation paths for the Angular application.
 */
export const routes: Routes = [
  /** 
   * Root Path: Default route.
   * Maps to the HomeComponent.
   * This is the landing page of the application.
   */
  { path: '', component: HomeComponent },

  /** 
   * Customers List Route: '/customers'
   * Maps to the CustomerListComponent.
   * Displays a list of customers fetched from the backend.
   */
  { path: 'customers', component: CustomerListComponent },

  /** 
   * Customer Form Route: '/customers/form'
   * Maps to the CustomerFormComponent.
   * Used for creating a new customer.
   */
  { path: 'customers/form', component: CustomerFormComponent },

  /** 
   * Customer Detail Route: '/customers/:id'
   * Maps to the CustomerDetailComponent.
   * Displays detailed information about a specific customer.
   * ':id' is a dynamic route parameter that specifies the customer ID.
   */
  { path: 'customers/:id', component: CustomerDetailComponent },

  /** 
   * Wildcard Route: '**'
   * Redirects any unknown paths to the root path ('').
   * Acts as a fallback for invalid URLs.
   */
  { path: '**', redirectTo: '' }
];
