import { createWooClientWrite, isWooCommerceConfigured, getWooCommerceSetupInstructions } from "./woocommerce";

export class WooCommerceCheckout {
  constructor() {
    this.api = null;
    this.isConfigured = isWooCommerceConfigured('write');
    this.setupInstructions = getWooCommerceSetupInstructions();
  }

  // Lazy API client initialization
  getApi() {
    if (this.api === null) {
      this.api = createWooClientWrite();
      if (this.api === null) {
        console.error('WooCommerce API client could not be created. Check your environment variables.');
      }
    }
    return this.api;
  }

  // Mock functionality for development
  createMockOrder(orderData) {
    const mockOrder = {
      id: Math.floor(Math.random() * 1000000) + 10000,
      number: `MOCK-${Date.now()}`,
      status: 'pending',
      currency: 'IDR',
      date_created: new Date().toISOString(),
      date_modified: new Date().toISOString(),
      total: orderData.total,
      customer_id: 0,
      billing: {
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
        address_1: orderData.billingAddress.street,
        city: orderData.billingAddress.city,
        state: orderData.billingAddress.province,
        postcode: orderData.billingAddress.postalCode,
        country: orderData.billingAddress.country
      },
      shipping: orderData.shippingSameAsBilling ? {
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        address_1: orderData.billingAddress.street,
        city: orderData.billingAddress.city,
        state: orderData.billingAddress.province,
        postcode: orderData.billingAddress.postalCode,
        country: orderData.billingAddress.country
      } : {
        first_name: orderData.firstName,
        last_name: orderData.lastName,
        address_1: orderData.shippingAddress.street,
        city: orderData.shippingAddress.city,
        state: orderData.shippingAddress.province,
        postcode: orderData.shippingAddress.postalCode,
        country: orderData.shippingAddress.country
      },
      line_items: orderData.items.map((item, index) => ({
        id: index + 1,
        name: item.name,
        product_id: item.id,
        quantity: item.quantity,
        price: (item.sale_price || item.price).toString(),
        total: ((item.sale_price || item.price) * item.quantity).toString()
      })),
      shipping_lines: [{
        method_id: 'flat_rate',
        method_title: 'Flat Rate',
        total: orderData.shippingCost.toString()
      }],
      payment_method: orderData.paymentMethod,
      payment_method_title: this.getPaymentMethodTitle(orderData.paymentMethod),
      customer_note: orderData.orderNotes || '',
      meta_data: [
        {
          key: '_order_total',
          value: orderData.total.toString()
        },
        {
          key: '_shipping_method',
          value: 'flat_rate'
        }
      ]
    };

    return mockOrder;
  }

  // Create a new order in WooCommerce
  async createOrder(orderData) {
    try {
      console.log('Creating WooCommerce order with data:', orderData);

      // Check if WooCommerce is configured
      if (!this.isConfigured) {
        console.log('⚠️  WooCommerce API not configured. Using mock order creation.');
        console.log('💡 Setup instructions:');
        this.setupInstructions.instructions.forEach(instruction => console.log(instruction));
        this.setupInstructions.missing.forEach(env => console.log(`   ${env}`));

        // Use mock order for development/testing
        const mockOrder = this.createMockOrder(orderData);

        // Simulate API delay for realistic experience
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          success: true,
          order: mockOrder,
          orderId: mockOrder.id,
          orderNumber: mockOrder.number,
          status: mockOrder.status,
          isMock: true
        };
      }

      // Real WooCommerce API call
      console.log('✅  WooCommerce API configured. Creating real order.');

      const api = this.getApi();
      if (!api) {
        throw new Error('Failed to initialize WooCommerce API client');
      }

      // Format order for WooCommerce API
      const wooOrder = {
        status: 'pending',
        currency: 'IDR',
        customer_id: orderData.customerId || 0,
        billing: {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          email: orderData.email,
          phone: orderData.phone,
          address_1: orderData.billingAddress.street,
          city: orderData.billingAddress.city,
          state: orderData.billingAddress.province,
          postcode: orderData.billingAddress.postalCode,
          country: orderData.billingAddress.country
        },
        shipping: orderData.shippingSameAsBilling ? {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          address_1: orderData.billingAddress.street,
          city: orderData.billingAddress.city,
          state: orderData.billingAddress.province,
          postcode: orderData.billingAddress.postalCode,
          country: orderData.billingAddress.country
        } : {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          address_1: orderData.shippingAddress.street,
          city: orderData.shippingAddress.city,
          state: orderData.shippingAddress.province,
          postcode: orderData.shippingAddress.postalCode,
          country: orderData.shippingAddress.country
        },
        line_items: orderData.items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.sale_price || item.price
        })),
        shipping_lines: [{
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: orderData.shippingCost.toString()
        }],
        payment_method: orderData.paymentMethod,
        payment_method_title: this.getPaymentMethodTitle(orderData.paymentMethod),
        customer_note: orderData.orderNotes || '',
        meta_data: [
          {
            key: '_order_total',
            value: orderData.total.toString()
          },
          {
            key: '_shipping_method',
            value: 'flat_rate'
          }
        ]
      };

      console.log('Formatted WooCommerce order:', wooOrder);

      const response = await api.post('orders', wooOrder);
      console.log('WooCommerce order created:', response.data);

      return {
        success: true,
        order: response.data,
        orderId: response.data.id,
        orderNumber: response.data.number,
        status: response.data.status,
        isMock: false
      };

    } catch (error) {
      console.error('WooCommerce order creation error:', error);
      return {
        success: false,
        error: error.message,
        details: error.response?.data
      };
    }
  }

  // Get available payment gateways
  async getPaymentGateways() {
    try {
      const response = await this.api.get('payment_gateways');
      return {
        success: true,
        gateways: response.data.filter(gateway => gateway.enabled)
      };
    } catch (error) {
      console.error('Error fetching payment gateways:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get available shipping methods
  async getShippingMethods() {
    try {
      const response = await this.api.get('shipping_methods');
      return {
        success: true,
        methods: response.data.filter(method => method.enabled)
      };
    } catch (error) {
      console.error('Error fetching shipping methods:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Create customer account (optional)
  async createCustomer(customerData) {
    try {
      const wooCustomer = {
        email: customerData.email,
        first_name: customerData.firstName,
        last_name: customerData.lastName,
        username: customerData.email.split('@')[0],
        password: customerData.password || this.generateRandomPassword(),
        billing: {
          first_name: customerData.firstName,
          last_name: customerData.lastName,
          address_1: customerData.address.street,
          city: customerData.address.city,
          state: customerData.address.province,
          postcode: customerData.address.postalCode,
          country: customerData.address.country,
          phone: customerData.phone
        }
      };

      const response = await this.api.post('customers', wooCustomer);
      return {
        success: true,
        customer: response.data
      };
    } catch (error) {
      console.error('Customer creation error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get payment method title
  getPaymentMethodTitle(methodId) {
    const methods = {
      'bacs': 'Direct Bank Transfer',
      'cod': 'Cash on Delivery',
      'cheque': 'Check Payment',
      'paypal': 'PayPal',
      'stripe': 'Credit Card (Stripe)',
      'midtrans': 'Midtrans',
      'bank_transfer': 'Bank Transfer'
    };

    return methods[methodId] || methodId;
  }

  // Generate random password for customer account
  generateRandomPassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  // Validate order data
  validateOrderData(orderData) {
    const errors = [];

    if (!orderData.firstName?.trim()) errors.push('First name is required');
    if (!orderData.lastName?.trim()) errors.push('Last name is required');
    if (!orderData.email?.trim()) errors.push('Email is required');
    if (!orderData.phone?.trim()) errors.push('Phone number is required');

    if (!orderData.billingAddress?.street?.trim()) errors.push('Billing street address is required');
    if (!orderData.billingAddress?.city?.trim()) errors.push('Billing city is required');
    if (!orderData.billingAddress?.province?.trim()) errors.push('Billing province is required');
    if (!orderData.billingAddress?.postalCode?.trim()) errors.push('Billing postal code is required');

    if (!orderData.shippingSameAsBilling) {
      if (!orderData.shippingAddress?.street?.trim()) errors.push('Shipping street address is required');
      if (!orderData.shippingAddress?.city?.trim()) errors.push('Shipping city is required');
      if (!orderData.shippingAddress?.province?.trim()) errors.push('Shipping province is required');
      if (!orderData.shippingAddress?.postalCode?.trim()) errors.push('Shipping postal code is required');
    }

    if (!orderData.items || orderData.items.length === 0) errors.push('No items in order');

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Process payment with external gateway
  async processPayment(orderData, paymentData) {
    switch (orderData.paymentMethod) {
      case 'midtrans':
        return this.processMidtransPayment(orderData, paymentData);
      case 'stripe':
        return this.processStripePayment(orderData, paymentData);
      case 'cod':
        return this.processCashOnDelivery(orderData);
      case 'bank_transfer':
        return this.processBankTransfer(orderData);
      default:
        return {
          success: false,
          error: 'Payment method not supported'
        };
    }
  }

  // Process Midtrans payment
  async processMidtransPayment(orderData, paymentData) {
    try {
      // This would integrate with Midtrans API
      // For now, return a mock response
      return {
        success: true,
        paymentUrl: 'https://mock-midtrans-payment-url.com/transaction/' + orderData.orderId,
        transactionId: 'MIDTRANS_' + Date.now()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Process Stripe payment
  async processStripePayment(orderData, paymentData) {
    try {
      // This would integrate with Stripe API
      // For now, return a mock response
      return {
        success: true,
        paymentIntentId: 'pi_' + Date.now(),
        clientSecret: 'pi_' + Date.now() + '_secret_' + Math.random().toString(36)
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Process Cash on Delivery
  async processCashOnDelivery(orderData) {
    return {
      success: true,
      message: 'Order placed successfully. Payment will be collected on delivery.'
    };
  }

  // Process Bank Transfer
  async processBankTransfer(orderData) {
    return {
      success: true,
      message: 'Order placed successfully. Please complete the bank transfer.',
      bankDetails: {
        bank: 'BCA',
        accountNumber: '1234567890',
        accountName: 'PT HomeDecor Indonesia',
        amount: orderData.total,
        notes: `Order #${orderData.orderId}`
      }
    };
  }
}

// Export singleton instance
export const wooCheckout = new WooCommerceCheckout();