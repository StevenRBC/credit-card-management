import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/model/customer.model';
import { CommonModule } from '@angular/common';
import { CreditCard } from '../../../core/model/credit-card.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreditCardService } from '../../../core/services/credit-card.service';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {
  // Holds customer data
  customer: Customer | null = null;

  // Flags to manage loading and error states
  isLoading = true;
  error: string | null = null;

  // Flags for modals (Add Credit Card, Edit Customer, Edit Credit Card)
  isEditCardModalOpen = false;
  isEditModalOpen = false;
  isModalOpen = false;

  // Forms for handling Add/Edit Credit Cards and Edit Customer
  editCardForm: FormGroup;
  creditCardForm: FormGroup;
  editCustomerForm: FormGroup;

  // To keep track of the selected Credit Card ID for editing
  selectedCardId: number | null = null;

  // Constructor for injecting dependencies
  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private creditCardService: CreditCardService,
    private fb: FormBuilder
  ) {
    // Initialize the form for editing customer details
    this.editCustomerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // Initialize the form for adding a credit card
    this.creditCardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      cardType: ['Credit', Validators.required],
      creditLimit: [0, Validators.required],
      currentBalance: [0, Validators.required],
    });

    // Initialize the form for editing a credit card
    this.editCardForm = this.fb.group({
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      cardType: ['Credit', Validators.required],
      creditLimit: [0, Validators.required],
      currentBalance: [0, Validators.required],
    });
  }

  // Fetch customer details on component initialization
  ngOnInit(): void {
    const customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchCustomerDetails(customerId);
  }

  /**
   * Fetch customer details from the service.
   * @param id Customer ID to fetch data
   */
  fetchCustomerDetails(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: (data) => {
        this.customer = data;
        this.isLoading = false;
      },
      error: () => {
        this.error = 'Failed to load customer details.';
        this.isLoading = false;
      },
    });
  }

  /**
   * Deletes a credit card for the customer.
   * @param cardId The ID of the credit card to delete
   * @param index The index of the card in the local array
   */
  deleteCreditCard(cardId: number, index: number): void {
    if (confirm('Are you sure you want to delete this credit card?')) {
      this.creditCardService.deleteCreditCard(cardId).subscribe({
        next: () => {
          alert('Credit card deleted successfully.');
          this.customer?.creditCards?.splice(index, 1); // Remove card locally
        },
        error: () => {
          alert('Failed to delete credit card. Please try again.');
        },
      });
    }
  }

  // Opens the "Add Credit Card" modal
  openModal() {
    this.isModalOpen = true;
  }

  // Closes the "Add Credit Card" modal
  closeModal() {
    this.isModalOpen = false;
  }

  // Opens the "Edit Customer" modal with prefilled data
  openEditModal() {
    if (this.customer) {
      this.editCustomerForm.patchValue({
        firstName: this.customer.firstName,
        lastName: this.customer.lastName,
        email: this.customer.email,
      });
      this.isEditModalOpen = true;
    }
  }

  // Closes the "Edit Customer" modal
  closeEditModal() {
    this.isEditModalOpen = false;
  }

  /**
   * Opens the "Edit Credit Card" modal and pre-fills the form.
   * @param card The credit card to edit
   */
  openEditCardModal(card: CreditCard): void {
    this.selectedCardId = card.cardId;
    this.editCardForm.patchValue({
      cardNumber: card.cardNumber,
      expirationDate: card.expirationDate,
      cvv: card.cvv,
      cardType: card.cardType,
      creditLimit: card.creditLimit,
      currentBalance: card.currentBalance,
    });
    this.isEditCardModalOpen = true;
  }

  // Closes the "Edit Credit Card" modal
  closeEditCardModal(): void {
    this.isEditCardModalOpen = false;
    this.selectedCardId = null;
  }

  /**
   * Submits the updated customer details.
   */
  onEditSubmit() {
    if (this.customer && this.editCustomerForm.valid) {
      const updatedCustomer = this.editCustomerForm.value;
      this.customerService
        .updateCustomer(this.customer.customerId!, updatedCustomer)
        .subscribe({
          next: (data) => {
            this.customer = { ...this.customer, ...data }; // Update local data
            alert('Customer updated successfully!');
            this.isEditModalOpen = false;
          },
          error: () => {
            alert('Failed to update customer. Please try again.');
          },
        });
    }
  }

  /**
   * Submits the updated credit card details.
   */
  onEditCardSubmit(): void {
    if (this.selectedCardId && this.editCardForm.valid) {
      const updatedCard = this.editCardForm.value;
      this.creditCardService
        .updateCreditCard(this.selectedCardId, updatedCard)
        .subscribe({
          next: (updatedCardResponse) => {
            alert('Credit card updated successfully!');
            // Update the credit card in the local list
            const index = this.customer?.creditCards?.findIndex(
              (card) => card.cardId === this.selectedCardId
            );
            if (index !== undefined && index !== -1) {
              this.customer!.creditCards![index] = updatedCardResponse;
            }
            this.closeEditCardModal();
          },
          error: () => {
            alert('Failed to update credit card. Please try again.');
          },
        });
    }
  }

  /**
   * Submits the new credit card details.
   */
  onSubmit() {
    if (this.customer) {
      const creditCard: CreditCard = {
        ...this.creditCardForm.value,
        customerId: this.customer.customerId,
      };

      this.creditCardService.createCreditCard(creditCard).subscribe({
        next: (newCard) => {
          alert('Credit card added successfully!');
          this.isModalOpen = false;

          // Add the new card to the local list
          this.customer?.creditCards?.push(newCard);
          this.creditCardForm.reset(); // Reset the form
        },
        error: () => {
          alert('Failed to add credit card. Please try again.');
        },
      });
    }
  }
}
