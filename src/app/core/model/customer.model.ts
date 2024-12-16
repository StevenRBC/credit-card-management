import { CreditCard } from "./credit-card.model";

/**
 * Interface representing a Customer.
 * Defines the structure for customer objects used throughout the application.
 */
export interface Customer {
  /**
   * Unique identifier for the customer.
   * Example: 1, 2, 3
   */
  customerId?: number;

  /**
   * First name of the customer.
   * Example: 'John'
   */
  firstName: string;

  /**
   * Last name of the customer.
   * Example: 'Doe'
   */
  lastName: string;

  /**
   * Email address of the customer.
   * Example: 'john.doe@example.com'
   */
  email: string;

  /**
   * List of credit cards associated with the customer.
   * This is an array of `CreditCard` objects.
   * Example: [ { cardId: 1, cardNumber: '1234', ... }, ... ]
   */
  creditCards: CreditCard[];
}