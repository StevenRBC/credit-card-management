import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreditCardService } from './credit-card.service';
import { CreditCard } from '../model/credit-card.model';

describe('CreditCardService', () => {
  let service: CreditCardService;
  let httpMock: HttpTestingController;

  // Base API URL for CreditCardService
  const apiUrl = 'http://localhost:8080/api/credit-cards';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide HTTP testing module
      providers: [CreditCardService], // Inject CreditCardService for testing
    });
    service = TestBed.inject(CreditCardService); // Initialize service
    httpMock = TestBed.inject(HttpTestingController); // Mock HTTP requests
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should fetch all credit cards', () => {
    // Mock data to simulate API response
    const mockCreditCards: CreditCard[] = [
      { cardId: 1, cardNumber: '1234-5678-9012-3456', expirationDate: '2025-12-31', cvv: '123', cardType: 'Credit', creditLimit: 5000, currentBalance: 1000, customerId: 1 },
      { cardId: 2, cardNumber: '6543-2109-8765-4321', expirationDate: '2026-01-01', cvv: '456', cardType: 'Debit', creditLimit: 3000, currentBalance: 500, customerId: 2 },
    ];

    // Test service method for fetching all credit cards
    service.getAllCreditCards().subscribe((cards) => {
      expect(cards.length).toBe(2); // Expect correct number of cards
      expect(cards).toEqual(mockCreditCards); // Expect data to match mock data
    });

    // Mock the HTTP GET request and flush the mock data
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET'); // Ensure GET method is used
    req.flush(mockCreditCards); // Return the mock data
  });

  it('should create a credit card', () => {
    // Data for the new credit card
    const newCard: CreditCard = {
      cardId: 3,
      cardNumber: '1111-2222-3333-4444',
      expirationDate: '2027-12-31',
      cvv: '789',
      cardType: 'Credit',
      creditLimit: 7000,
      currentBalance: 0,
      customerId: 1,
    };

    // Test service method for creating a credit card
    service.createCreditCard(newCard).subscribe((card) => {
      expect(card).toEqual(newCard); // Expect the created card to match input
    });

    // Mock the HTTP POST request and check body content
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST'); // Ensure POST method is used
    expect(req.request.body).toEqual(newCard); // Verify request payload
    req.flush(newCard); // Simulate successful creation response
  });

  it('should delete a credit card', () => {
    const cardId = 1; // ID of the card to be deleted

    // Test service method for deleting a credit card
    service.deleteCreditCard(cardId).subscribe((response) => {
      expect(response).toBeNull(); // Expect no content in the response
    });

    // Mock the HTTP DELETE request
    const req = httpMock.expectOne(`${apiUrl}/${cardId}`);
    expect(req.request.method).toBe('DELETE'); // Ensure DELETE method is used
    req.flush(null); // Simulate successful deletion response
  });

  it('should update a credit card', () => {
    const cardId = 1; // ID of the card to update
    const updatedCard: Partial<CreditCard> = {
      currentBalance: 1500, // Field to update
    };

    // Mock response for the updated credit card
    const updatedCardResponse: CreditCard = {
      cardId: 1,
      cardNumber: '1234-5678-9012-3456',
      expirationDate: '2025-12-31',
      cvv: '123',
      cardType: 'Credit',
      creditLimit: 5000,
      currentBalance: 1500,
      customerId: 1,
    };

    // Test service method for updating a credit card
    service.updateCreditCard(cardId, updatedCard).subscribe((card) => {
      expect(card).toEqual(updatedCardResponse); // Expect updated card to match response
    });

    // Mock the HTTP PUT request
    const req = httpMock.expectOne(`${apiUrl}/${cardId}`);
    expect(req.request.method).toBe('PUT'); // Ensure PUT method is used
    expect(req.request.body).toEqual(updatedCard); // Verify request payload
    req.flush(updatedCardResponse); // Simulate successful update response
  });
});
