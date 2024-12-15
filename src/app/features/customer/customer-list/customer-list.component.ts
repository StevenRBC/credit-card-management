import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/model/customer.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  // Holds the list of customers fetched from the backend
  customers: Customer[] = [];

  // Flags to manage UI states
  isLoading: boolean = true; // Indicates whether data is being fetched
  error: string | null = null; // Holds error messages for data fetching
  successMessage: string | null = null; // Holds success messages
  errorMessage: string | null = null; // Holds error messages for delete operation

  /**
   * Constructor for dependency injection
   * @param customerService Service to interact with customer-related API endpoints
   */
  constructor(private customerService: CustomerService) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * Fetches the customer list from the backend.
   */
  ngOnInit(): void {
    this.fetchCustomers();
  }

  /**
   * Fetches the list of customers from the backend.
   * Updates the `customers` array on success and handles errors.
   */
  fetchCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      // On successful API response
      next: (data) => {
        this.customers = data; // Update customers array with fetched data
        this.isLoading = false; // Hide the loading spinner
      },
      // On error during API call
      error: (err) => {
        console.error('Error fetching customers:', err);
        this.error = 'Error fetching customers. Please try again later.';
        this.isLoading = false; // Hide the loading spinner
      },
    });
  }

  /**
   * Deletes a specific customer after user confirmation.
   * @param id The ID of the customer to delete
   * @param firstName The first name of the customer (for confirmation message)
   * @param lastName The last name of the customer (for confirmation message)
   */
  deleteCustomer(
    id: number | undefined,
    firstName: string,
    lastName: string
  ): void {
    // Check if the customer ID is valid
    if (id === undefined) {
      this.errorMessage = 'Customer ID is invalid.'; // Show error message
      setTimeout(() => (this.errorMessage = null), 3000); // Clear message after 3 seconds
      return;
    }

    // Confirm deletion with the user
    if (confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) {
      this.customerService.deleteCustomer(id).subscribe({
        // On successful deletion
        next: () => {
          // Remove the deleted customer from the local list
          this.customers = this.customers.filter(
            (customer) => customer.customerId !== id
          );

          // Display a success message
          this.successMessage = `Customer (${firstName} ${lastName}) was deleted successfully.`;
          setTimeout(() => (this.successMessage = null), 3000); // Clear message after 3 seconds
        },
        // On error during deletion
        error: (err) => {
          this.errorMessage = `Failed to delete customer (${firstName} ${lastName}). Please try again.`; // Show error message
          console.error(err); // Log the error for debugging
          setTimeout(() => (this.errorMessage = null), 3000); // Clear message after 3 seconds
        },
      });
    }
  }
}
