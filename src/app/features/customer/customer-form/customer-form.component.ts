import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/model/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent {
  // Main form group for customer creation
  customerForm: FormGroup;

  /**
   * Constructor for injecting services.
   * @param fb FormBuilder for building reactive forms
   * @param customerService Service for handling customer API operations
   * @param router Router for navigation after form submission
   */
  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) {
    // Initialize the main form group
    this.customerForm = this.fb.group({
      firstName: ['', Validators.required], // Customer's first name (required)
      lastName: ['', Validators.required], // Customer's last name (required)
      email: ['', [Validators.required, Validators.email]], // Customer's email (required and valid email format)
      creditCards: this.fb.array([]), // Optional array for credit cards
    });
  }

  /**
   * Getter to retrieve the FormArray of credit cards from the main form group.
   */
  get creditCards(): FormArray {
    return this.customerForm.get('creditCards') as FormArray;
  }

  /**
   * Helper method to cast any control as a FormGroup.
   * @param control The control to cast
   * @returns FormGroup instance
   */
  asFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }

  /**
   * Method to dynamically add a new credit card form group to the creditCards FormArray.
   */
  addCreditCard() {
    const creditCardForm = this.fb.group({
      cardNumber: ['', Validators.required], // Card number (required)
      expirationDate: ['', Validators.required], // Expiration date (required)
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ], // CVV (required, 3 characters)
      cardType: ['', Validators.required], // Card type (required: Credit/Debit)
      creditLimit: [0, [Validators.required, Validators.min(0)]], // Credit limit (required, must be positive)
      currentBalance: [0, [Validators.required, Validators.min(0)]], // Current balance (required, must be positive)
    });
    // Push the new form group into the creditCards array
    this.creditCards.push(creditCardForm);
  }

  /**
   * Method to remove a credit card form group from the creditCards FormArray by index.
   * @param index The index of the form group to remove
   */
  removeCreditCard(index: number) {
    this.creditCards.removeAt(index);
  }

  /**
   * Submit handler for the form. Sends the data to the backend if the form is valid.
   */
  onSubmit() {
    if (this.customerForm.invalid) {
      // If form is invalid, mark all controls as touched to display validation errors
      this.customerForm.markAllAsTouched();
      return;
    }

    // Extract form values and cast them to the Customer interface
    const customer: Customer = this.customerForm.value;

    // Call the service to create the customer
    this.customerService.createCustomer(customer).subscribe({
      next: (response) => {
        console.log('Customer created successfully:', response);
        this.router.navigate(['/customers']); // Navigate back to the customer list page
      },
      error: (err) => {
        console.error('Error creating customer:', err);
      },
    });
  }

  /**
   * Handler for the cancel button. Navigates back to the customer list.
   */
  onCancel() {
    this.router.navigate(['/customers']);
  }
}
