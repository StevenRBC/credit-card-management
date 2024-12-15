/**
 * Interface representing a Credit Card.
 * Defines the structure for credit card objects used throughout the application.
 */
export interface CreditCard {
  /** 
   * Unique identifier for the credit card.
   * Example: 1, 2, 3 
   */
  cardId: number;

  /**
   * Credit card number.
   * Example: '1234567812345678'
   */
  cardNumber: string;

  /**
   * Expiration date of the credit card in 'YYYY-MM-DD' format.
   * Example: '2025-12-31'
   */
  expirationDate: string;

  /**
   * Card Verification Value (CVV) - 3-digit security code.
   * Example: '123'
   */
  cvv: string;

  /**
   * Type of the credit card.
   * Possible values: 'Credit' or 'Debit'
   * Example: 'Credit'
   */
  cardType: string;

  /**
   * Maximum credit limit for the card.
   * Example: 5000.00
   */
  creditLimit: number;

  /**
   * Current balance on the credit card.
   * Example: 1000.00
   */
  currentBalance: number;

  /**
   * Identifier for the customer who owns the credit card.
   * Example: 101
   */
  customerId: number;
}