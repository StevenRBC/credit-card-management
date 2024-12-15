import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditCard } from '../model/credit-card.model';

@Injectable({
  providedIn: 'root' // Makes this service globally available in the application
})
export class CreditCardService {
  // Base URL for the credit card-related API endpoints
  private apiUrl = 'http://localhost:8080/api/credit-cards';

  /**
   * Constructor for dependency injection.
   * @param http HttpClient for making HTTP requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches all credit cards from the backend.
   * @returns An Observable of an array of `CreditCard` objects.
   */
  getAllCreditCards(): Observable<CreditCard[]> {
    return this.http.get<CreditCard[]>(this.apiUrl);
  }

  /**
   * Creates a new credit card by sending a POST request to the backend.
   * @param creditCard The `CreditCard` object to be created.
   * @returns An Observable of the newly created `CreditCard` object.
   */
  createCreditCard(creditCard: CreditCard): Observable<CreditCard> {
    return this.http.post<CreditCard>(this.apiUrl, creditCard);
  }

  /**
   * Deletes a credit card by its ID.
   * @param cardId The ID of the credit card to be deleted.
   * @returns An Observable of type `void`, indicating the operation result.
   */
  deleteCreditCard(cardId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${cardId}`);
  }

  /**
   * Updates a specific credit card by its ID.
   * @param cardId The ID of the credit card to be updated.
   * @param updatedCard A partial `CreditCard` object containing the updated fields.
   * @returns An Observable of the updated `CreditCard` object.
   */
  updateCreditCard(cardId: number, updatedCard: Partial<CreditCard>): Observable<CreditCard> {
    return this.http.put<CreditCard>(`${this.apiUrl}/${cardId}`, updatedCard);
  }
}
