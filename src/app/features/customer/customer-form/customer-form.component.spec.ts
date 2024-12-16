import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { CustomerFormComponent } from './customer-form.component';
import { CustomerService } from '../../../core/services/customer.service';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent; // Component under test
  let fixture: ComponentFixture<CustomerFormComponent>; // Fixture to access the component instance
  let mockCustomerService: jasmine.SpyObj<CustomerService>; // Mock for the CustomerService
  let mockRouter: jasmine.SpyObj<Router>; // Mock for the Angular Router

  beforeEach(async () => {
    // Create spies for the CustomerService and Router
    mockCustomerService = jasmine.createSpyObj('CustomerService', ['createCustomer']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the testing module
    await TestBed.configureTestingModule({
      imports: [CustomerFormComponent, ReactiveFormsModule], // Import the form module and the component
      providers: [
        { provide: CustomerService, useValue: mockCustomerService }, // Provide the mocked service
        { provide: Router, useValue: mockRouter }, // Provide the mocked router
        provideRouter([]), // Provide a basic router configuration
      ],
    }).compileComponents(); // Compile the component and its dependencies
  });

  beforeEach(() => {
    // Initialize the component and trigger change detection
    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger initial change detection
  });

  it('should create the component', () => {
    // Verify that the component is created
    expect(component).toBeTruthy();
  });

  it('should initialize the form group with default values', () => {
    // Verify that the form is initialized with default values
    const customerForm = component.customerForm;
    expect(customerForm).toBeDefined(); // Ensure the form group is defined
    expect(customerForm.get('firstName')?.value).toBe(''); // Check initial values
    expect(customerForm.get('lastName')?.value).toBe('');
    expect(customerForm.get('email')?.value).toBe('');
    expect(customerForm.get('creditCards')?.value.length).toBe(0); // Ensure no credit cards initially
  });

  it('should add a credit card to the form array', () => {
    // Verify that a credit card can be added to the form
    component.addCreditCard(); // Call method to add a credit card
    expect(component.creditCards.length).toBe(1); // Ensure the form array has one entry
    expect(component.creditCards.at(0).value).toEqual({ // Verify default values for the credit card
      cardNumber: '',
      expirationDate: '',
      cvv: '',
      cardType: '',
      creditLimit: 0,
      currentBalance: 0,
    });
  });

  it('should remove a credit card from the form array', () => {
    // Verify that a credit card can be removed from the form
    component.addCreditCard(); // Add a credit card first
    expect(component.creditCards.length).toBe(1); // Ensure the card is added
    component.removeCreditCard(0); // Remove the card
    expect(component.creditCards.length).toBe(0); // Verify the card is removed
  });

  it('should mark the form as touched and not submit if invalid', () => {
    // Verify that the form submission is blocked if invalid
    spyOn(component, 'onSubmit').and.callThrough(); // Spy on the `onSubmit` method
    component.onSubmit(); // Attempt to submit the form

    expect(component.customerForm.touched).toBeTrue(); // Ensure the form is marked as "touched"
    expect(component.onSubmit).toHaveBeenCalled(); // Verify the method was called
    expect(mockCustomerService.createCustomer).not.toHaveBeenCalled(); // Ensure the service was not called
  });

  it('should call the service and navigate on successful submission', () => {
    // Mock successful customer creation
    mockCustomerService.createCustomer.and.returnValue(of({
      customerId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      creditCards: []
    }));

    // Set valid values for the form
    component.customerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      creditCards: [],
    });

    component.onSubmit(); // Submit the form

    // Verify the service call with the correct payload
    expect(mockCustomerService.createCustomer).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      creditCards: [],
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customers']); // Verify navigation to the customer list
  });

  it('should navigate back to the customer list on cancel', () => {
    // Verify that canceling navigates back to the customer list
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customers']);
  });
});
