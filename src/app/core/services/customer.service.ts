import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root' // Makes this service globally available in the application
})
export class CustomerService {
  // Base URL for the customer-related API endpoints
  private apiUrl = 'http://localhost:8080/api/customers';

  /**
   * Constructor for dependency injection.
   * @param http HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches all customers from the backend.
   * @returns An Observable of an array of `Customer` objects.
   */
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  /**
   * Creates a new customer by sending a POST request to the backend.
   * @param customer The `Customer` object to be created.
   * @returns An Observable of the newly created `Customer` object.
   */
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  /**
   * Deletes a customer by their ID.
   * @param id The ID of the customer to be deleted.
   * @returns An Observable of type `void`, indicating the operation result.
   */
  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Fetches a specific customer's details by their ID.
   * @param id The ID of the customer to retrieve.
   * @returns An Observable of the `Customer` object.
   */
  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${id}`);
  }

  /**
   * Updates a specific customer's details by their ID.
   * @param customerId The ID of the customer to be updated.
   * @param updatedCustomer A partial `Customer` object containing the updated fields.
   * @returns An Observable of the updated `Customer` object.
   */
  updateCustomer(customerId: number, updatedCustomer: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${customerId}`, updatedCustomer);
  }
}
