import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'clover-platform/3.0 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Get a single merchant
   *
   */
  merchantGetMerchant(metadata: types.MerchantGetMerchantMetadataParam): Promise<FetchResponse<200, types.MerchantGetMerchantResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}', 'get', metadata);
  }

  /**
   * Update a merchant
   *
   */
  merchantUpdateMerchant(body: types.MerchantUpdateMerchantBodyParam, metadata: types.MerchantUpdateMerchantMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}', 'post', body, metadata);
  }

  /**
   * Get a merchant's address
   *
   */
  merchantGetMerchantAddress(metadata: types.MerchantGetMerchantAddressMetadataParam): Promise<FetchResponse<200, types.MerchantGetMerchantAddressResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/address', 'get', metadata);
  }

  /**
   * Get a merchant's payment gateway configuration
   *
   */
  merchantGetMerchantGateway(metadata: types.MerchantGetMerchantGatewayMetadataParam): Promise<FetchResponse<200, types.MerchantGetMerchantGatewayResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/gateway', 'get', metadata);
  }

  /**
   * Get a merchant's properties
   *
   */
  merchantGetMerchantProperties(metadata: types.MerchantGetMerchantPropertiesMetadataParam): Promise<FetchResponse<200, types.MerchantGetMerchantPropertiesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/properties', 'get', metadata);
  }

  /**
   * Update merchant properties
   *
   */
  merchantUpdateMerchantProperties(body: types.MerchantUpdateMerchantPropertiesBodyParam, metadata: types.MerchantUpdateMerchantPropertiesMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantUpdateMerchantProperties(metadata: types.MerchantUpdateMerchantPropertiesMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantUpdateMerchantProperties(body?: types.MerchantUpdateMerchantPropertiesBodyParam | types.MerchantUpdateMerchantPropertiesMetadataParam, metadata?: types.MerchantUpdateMerchantPropertiesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/properties', 'post', body, metadata);
  }

  /**
   * The Merchant's default service charge, set via the Setup App
   * (https://www.clover.com/setupapp).
   *
   * @summary Get default service charge for a merchant
   */
  merchantGetDefaultServiceCharge(metadata: types.MerchantGetDefaultServiceChargeMetadataParam): Promise<FetchResponse<200, types.MerchantGetDefaultServiceChargeResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/default_service_charge', 'get', metadata);
  }

  /**
   * Get a sync token (deprecated)
   *
   */
  syncGetSyncToken(metadata: types.SyncGetSyncTokenMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/sync/{table}', 'get', metadata);
  }

  /**
   * Retrieves all tip suggestions for a merchant, for example: flat tip or percentage.
   *
   * @summary Get all tip suggestions for a merchant
   */
  merchantGetTipSuggestions(metadata: types.MerchantGetTipSuggestionsMetadataParam): Promise<FetchResponse<200, types.MerchantGetTipSuggestionsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tip_suggestions', 'get', metadata);
  }

  /**
   * Get a single tip suggestion
   *
   */
  merchantGetTipSuggestion(metadata: types.MerchantGetTipSuggestionMetadataParam): Promise<FetchResponse<200, types.MerchantGetTipSuggestionResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tip_suggestions/{tId}', 'get', metadata);
  }

  /**
   * Update a single tip suggestion
   *
   */
  merchantUpdateTipSuggestion(body: types.MerchantUpdateTipSuggestionBodyParam, metadata: types.MerchantUpdateTipSuggestionMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantUpdateTipSuggestion(metadata: types.MerchantUpdateTipSuggestionMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantUpdateTipSuggestion(body?: types.MerchantUpdateTipSuggestionBodyParam | types.MerchantUpdateTipSuggestionMetadataParam, metadata?: types.MerchantUpdateTipSuggestionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tip_suggestions/{tId}', 'post', body, metadata);
  }

  /**
   * Retrieves all order types for a merchant.
   *  Merchants can create custom order types using the [Clover Setup
   * App](https://www.clover.com/setupapp). These custom order types can be associated with a
   * system order type. See [Return a list of system order
   * types](https://docs.clover.com/reference/merchantgetsystemordertypes).
   *  Custom order types can support items in:
   * - all categories (filterCategories=false). To view the categories, send a GET request to
   * [Get all categories](https://docs.clover.com/reference/categorygetcategories).
   * - a subset of the merchant’s categories (filterCategories=true and categories property
   * contains the list of supported categories). Categories display when an order type that
   * supports a subset of the categories is expanded.
   *
   * @summary Get all order types for a merchant
   */
  merchantGetOrderTypes(metadata: types.MerchantGetOrderTypesMetadataParam): Promise<FetchResponse<200, types.MerchantGetOrderTypesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/order_types', 'get', metadata);
  }

  /**
   * Create Order Type For Merchant
   *
   */
  merchantCreateOrderType(body: types.MerchantCreateOrderTypeBodyParam, metadata: types.MerchantCreateOrderTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantCreateOrderType(metadata: types.MerchantCreateOrderTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantCreateOrderType(body?: types.MerchantCreateOrderTypeBodyParam | types.MerchantCreateOrderTypeMetadataParam, metadata?: types.MerchantCreateOrderTypeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/order_types', 'post', body, metadata);
  }

  /**
   * Get a single order type
   *
   */
  merchantGetOrderType(metadata: types.MerchantGetOrderTypeMetadataParam): Promise<FetchResponse<200, types.MerchantGetOrderTypeResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/order_types/{orderTypeId}', 'get', metadata);
  }

  /**
   * Update a single order type
   *
   */
  merchantUpdateOrderType(body: types.MerchantUpdateOrderTypeBodyParam, metadata: types.MerchantUpdateOrderTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantUpdateOrderType(metadata: types.MerchantUpdateOrderTypeMetadataParam): Promise<FetchResponse<number, unknown>>;
  merchantUpdateOrderType(body?: types.MerchantUpdateOrderTypeBodyParam | types.MerchantUpdateOrderTypeMetadataParam, metadata?: types.MerchantUpdateOrderTypeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/order_types/{orderTypeId}', 'post', body, metadata);
  }

  /**
   * Delete an order type
   *
   */
  merchantDeleteOrderType(metadata: types.MerchantDeleteOrderTypeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/order_types/{orderTypeId}', 'delete', metadata);
  }

  /**
   * Create or delete associations between order types and categories
   *
   */
  orderCreateOrDeleteOrderTypeCategories(metadata: types.OrderCreateOrDeleteOrderTypeCategoriesMetadataParam): Promise<FetchResponse<200, types.OrderCreateOrDeleteOrderTypeCategoriesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/order_type_categories', 'post', metadata);
  }

  /**
   * Merchants can create custom Order Types via "/v3/merchants/{mId}/order_types". It is
   * useful to associate these custom order types with particular system order types in order
   * to group things functionally. For example, a merchant may have a "Lunch Take-Out" order
   * type and a "Dinner Take-Out" order type. These two order types can be associated with
   * the "TAKE-OUT-TYPE" system order type so that applications can understand that they are
   * both take-out order types.
   *
   * @summary Return a list of system order types
   */
  merchantGetSystemOrderTypes(metadata: types.MerchantGetSystemOrderTypesMetadataParam): Promise<FetchResponse<200, types.MerchantGetSystemOrderTypesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/system_order_types', 'get', metadata);
  }

  /**
   * Retrieves all system and employee roles for a merchant's business.
   *
   * @summary Get all roles for a merchant
   */
  roleGetRoles(metadata: types.RoleGetRolesMetadataParam): Promise<FetchResponse<200, types.RoleGetRolesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/roles', 'get', metadata);
  }

  /**
   * Create a role
   *
   */
  roleCreateRole(body: types.RoleCreateRoleBodyParam, metadata: types.RoleCreateRoleMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/roles', 'post', body, metadata);
  }

  /**
   * Get a single role
   *
   */
  roleGetRole(metadata: types.RoleGetRoleMetadataParam): Promise<FetchResponse<200, types.RoleGetRoleResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/roles/{roleId}', 'get', metadata);
  }

  /**
   * Update a single role
   *
   */
  roleUpdateRole(body: types.RoleUpdateRoleBodyParam, metadata: types.RoleUpdateRoleMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/roles/{roleId}', 'post', body, metadata);
  }

  /**
   * Delete a role
   *
   */
  roleDeleteRole(metadata: types.RoleDeleteRoleMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/roles/{roleId}', 'delete', metadata);
  }

  /**
   * Retrieves all tenders for a merchant.
   *
   * @summary Get all tenders for a merchant
   */
  payGetMerchantTenders(metadata: types.PayGetMerchantTendersMetadataParam): Promise<FetchResponse<200, types.PayGetMerchantTendersResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tenders', 'get', metadata);
  }

  /**
   * Returns an object representing newly added merchant tender, with a generated ID.
   *
   * @summary Adds a new tender
   */
  payCreateMerchantTender(body: types.PayCreateMerchantTenderBodyParam, metadata: types.PayCreateMerchantTenderMetadataParam): Promise<FetchResponse<200, types.PayCreateMerchantTenderResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tenders', 'post', body, metadata);
  }

  /**
   * Get a single merchant tender
   *
   */
  payGetMerchantTender(metadata: types.PayGetMerchantTenderMetadataParam): Promise<FetchResponse<200, types.PayGetMerchantTenderResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tenders/{tenderId}', 'get', metadata);
  }

  /**
   * Returns an object representing updated merchant tender.
   *
   * @summary Updates an existing tender
   */
  payUpdateMerchantTender(body: types.PayUpdateMerchantTenderBodyParam, metadata: types.PayUpdateMerchantTenderMetadataParam): Promise<FetchResponse<number, unknown>>;
  payUpdateMerchantTender(metadata: types.PayUpdateMerchantTenderMetadataParam): Promise<FetchResponse<number, unknown>>;
  payUpdateMerchantTender(body?: types.PayUpdateMerchantTenderBodyParam | types.PayUpdateMerchantTenderMetadataParam, metadata?: types.PayUpdateMerchantTenderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tenders/{tenderId}', 'post', body, metadata);
  }

  /**
   * Deletes an existing tender
   *
   */
  payDeleteMerchantTender(metadata: types.PayDeleteMerchantTenderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tenders/{tenderId}', 'delete', metadata);
  }

  /**
   * Get a list this merchant opening hours
   *
   */
  merchantGetAllMerchantOpeningHours(metadata: types.MerchantGetAllMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantGetAllMerchantOpeningHoursResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/opening_hours', 'get', metadata);
  }

  /**
   * Create a set of merchant opening hours
   *
   */
  merchantCreateMerchantOpeningHours(body: types.MerchantCreateMerchantOpeningHoursBodyParam, metadata: types.MerchantCreateMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantCreateMerchantOpeningHoursResponse200>>;
  merchantCreateMerchantOpeningHours(metadata: types.MerchantCreateMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantCreateMerchantOpeningHoursResponse200>>;
  merchantCreateMerchantOpeningHours(body?: types.MerchantCreateMerchantOpeningHoursBodyParam | types.MerchantCreateMerchantOpeningHoursMetadataParam, metadata?: types.MerchantCreateMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantCreateMerchantOpeningHoursResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/opening_hours', 'post', body, metadata);
  }

  /**
   * Get a specific set of merchant opening hours
   *
   */
  merchantGetMerchantOpeningHours(metadata: types.MerchantGetMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantGetMerchantOpeningHoursResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/opening_hours/{hId}', 'get', metadata);
  }

  /**
   * Update a set of merchant opening hours
   *
   */
  merchantUpdateMerchantOpeningHours(body: types.MerchantUpdateMerchantOpeningHoursBodyParam, metadata: types.MerchantUpdateMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantUpdateMerchantOpeningHoursResponse200>>;
  merchantUpdateMerchantOpeningHours(metadata: types.MerchantUpdateMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantUpdateMerchantOpeningHoursResponse200>>;
  merchantUpdateMerchantOpeningHours(body?: types.MerchantUpdateMerchantOpeningHoursBodyParam | types.MerchantUpdateMerchantOpeningHoursMetadataParam, metadata?: types.MerchantUpdateMerchantOpeningHoursMetadataParam): Promise<FetchResponse<200, types.MerchantUpdateMerchantOpeningHoursResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/opening_hours/{hId}', 'post', body, metadata);
  }

  /**
   * Delete a set of merchant opening hours
   *
   */
  merchantDeleteMerchantOpeningHours(metadata: types.MerchantDeleteMerchantOpeningHoursMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/opening_hours/{hId}', 'delete', metadata);
  }

  /**
   * Returns a list of all devices that are provisioned to the a merchant. This list can be
   * viewed from the Setup App on the merchant's device or web dashboard
   * (https://www.clover.com/setupapp/m/{mId}/devices).
   *
   * @summary Get all devices provisioned to a merchant
   */
  deviceGetMerchantDevices(metadata: types.DeviceGetMerchantDevicesMetadataParam): Promise<FetchResponse<200, types.DeviceGetMerchantDevicesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/devices', 'get', metadata);
  }

  /**
   * Returns a single device that is provisioned to a merchant.
   *
   * @summary Get a single device provisioned to a merchant
   */
  deviceGetMerchantDevice(metadata: types.DeviceGetMerchantDeviceMetadataParam): Promise<FetchResponse<200, types.DeviceGetMerchantDeviceResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/devices/{deviceId}', 'get', metadata);
  }

  /**
   * Retrieve all cash events for this merchant. Cash events can also be consumed by
   * registering a Webhook callback. See https://docs.clover.com/build/webhooks/
   *
   * @summary Get all cash events
   */
  cashGetAllCashEvents(metadata: types.CashGetAllCashEventsMetadataParam): Promise<FetchResponse<200, types.CashGetAllCashEventsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/cash_events', 'get', metadata);
  }

  /**
   * Retrieve cash events filtered by employee ID. Cash events can also be consumed by
   * registering a Webhook callback. See https://docs.clover.com/build/webhooks/
   *
   * @summary Get all cash events for an employee
   */
  cashGetEmployeeCashEvents(metadata: types.CashGetEmployeeCashEventsMetadataParam): Promise<FetchResponse<200, types.CashGetEmployeeCashEventsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/cash_events', 'get', metadata);
  }

  /**
   * Retrieve cash events filtered by device ID. Cash events can also be consumed by
   * registering a Webhook callback. See https://docs.clover.com/build/webhooks/
   *
   * @summary Get all cash events for a device
   */
  cashGetDeviceCashEvents(metadata: types.CashGetDeviceCashEventsMetadataParam): Promise<FetchResponse<200, types.CashGetDeviceCashEventsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/devices/{deviceId}/cash_events', 'get', metadata);
  }

  /**
   * Gives information for every customer of a merchant by default.
   *
   * @summary Get a list of customers in CSV format
   */
  handlersGetCustomersCsv(metadata: types.HandlersGetCustomersCsvMetadataParam): Promise<FetchResponse<200, types.HandlersGetCustomersCsvResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/customers.csv', 'get', metadata);
  }

  /**
   * Gives information for every customer of a merchant by default.
   *
   * @summary Get a list of customers
   */
  customersGetCustomers(metadata: types.CustomersGetCustomersMetadataParam): Promise<FetchResponse<200, types.CustomersGetCustomersResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/customers', 'get', metadata);
  }

  /**
   * Creates customer record for a merchant. Note that the request body cannot be null.
   *
   * @summary Create a customer
   */
  customersCreateCustomer(body: types.CustomersCreateCustomerBodyParam, metadata: types.CustomersCreateCustomerMetadataParam): Promise<FetchResponse<200, types.CustomersCreateCustomerResponse200>>;
  customersCreateCustomer(metadata: types.CustomersCreateCustomerMetadataParam): Promise<FetchResponse<200, types.CustomersCreateCustomerResponse200>>;
  customersCreateCustomer(body?: types.CustomersCreateCustomerBodyParam | types.CustomersCreateCustomerMetadataParam, metadata?: types.CustomersCreateCustomerMetadataParam): Promise<FetchResponse<200, types.CustomersCreateCustomerResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/customers', 'post', body, metadata);
  }

  /**
   * Returns information for a single customer.
   *
   * @summary Get a single customer
   */
  customersGetCustomer(metadata: types.CustomersGetCustomerMetadataParam): Promise<FetchResponse<200, types.CustomersGetCustomerResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}', 'get', metadata);
  }

  /**
   * Updates information for a single customer.
   *
   * @summary Update a customer
   */
  customersUpdateCustomer(body: types.CustomersUpdateCustomerBodyParam, metadata: types.CustomersUpdateCustomerMetadataParam): Promise<FetchResponse<200, types.CustomersUpdateCustomerResponse200>>;
  customersUpdateCustomer(metadata: types.CustomersUpdateCustomerMetadataParam): Promise<FetchResponse<200, types.CustomersUpdateCustomerResponse200>>;
  customersUpdateCustomer(body?: types.CustomersUpdateCustomerBodyParam | types.CustomersUpdateCustomerMetadataParam, metadata?: types.CustomersUpdateCustomerMetadataParam): Promise<FetchResponse<200, types.CustomersUpdateCustomerResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}', 'post', body, metadata);
  }

  /**
   * Deletes a single customer from a merchant.
   *
   * @summary Delete a customer
   */
  customersDeleteCustomer(metadata: types.CustomersDeleteCustomerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}', 'delete', metadata);
  }

  /**
   * Creates a phone number associated to a merchant's customer.
   *
   * @summary Create a phone number for a customer
   */
  customersCreateCustomerPhoneNumber(body: types.CustomersCreateCustomerPhoneNumberBodyParam, metadata: types.CustomersCreateCustomerPhoneNumberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/phone_numbers', 'post', body, metadata);
  }

  /**
   * Updates a merchant's customer's phone number.
   *
   * @summary Update a phone number for a customer
   */
  customersUpdateCustomerPhoneNumber(body: types.CustomersUpdateCustomerPhoneNumberBodyParam, metadata: types.CustomersUpdateCustomerPhoneNumberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/phone_numbers/{phoneId}', 'post', body, metadata);
  }

  /**
   * Deletes a merchant's customer's phone number.
   *
   * @summary Delete a customer phone number
   */
  customersDeleteCustomerPhoneNumber(metadata: types.CustomersDeleteCustomerPhoneNumberMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/phone_numbers/{phoneId}', 'delete', metadata);
  }

  /**
   * Creates an email address associated to a merchant's customer.
   *
   * @summary Create an email address for a customer
   */
  customersCreateCustomerEmailAddress(body: types.CustomersCreateCustomerEmailAddressBodyParam, metadata: types.CustomersCreateCustomerEmailAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/email_addresses', 'post', body, metadata);
  }

  /**
   * Updates a merchant's customer's email address.
   *
   * @summary Update an email address for a customer
   */
  customersUpdateCustomerEmailAddress(body: types.CustomersUpdateCustomerEmailAddressBodyParam, metadata: types.CustomersUpdateCustomerEmailAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/email_addresses/{emailId}', 'post', body, metadata);
  }

  /**
   * Deletes a merchant's customer's email address.
   *
   * @summary Delete a customer email address
   */
  customersDeleteCustomerEmailAddress(metadata: types.CustomersDeleteCustomerEmailAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/email_addresses/{emailId}', 'delete', metadata);
  }

  /**
   * Creates an address associated to a merchant's customer.
   *
   * @summary Create an address for a customer
   */
  customersCreateCustomerAddress(body: types.CustomersCreateCustomerAddressBodyParam, metadata: types.CustomersCreateCustomerAddressMetadataParam): Promise<FetchResponse<number, unknown>>;
  customersCreateCustomerAddress(metadata: types.CustomersCreateCustomerAddressMetadataParam): Promise<FetchResponse<number, unknown>>;
  customersCreateCustomerAddress(body?: types.CustomersCreateCustomerAddressBodyParam | types.CustomersCreateCustomerAddressMetadataParam, metadata?: types.CustomersCreateCustomerAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/addresses', 'post', body, metadata);
  }

  /**
   * Updates a merchant's customer's address.
   *
   * @summary Update an address for a customer
   */
  customersUpdateCustomerAddress(body: types.CustomersUpdateCustomerAddressBodyParam, metadata: types.CustomersUpdateCustomerAddressMetadataParam): Promise<FetchResponse<number, unknown>>;
  customersUpdateCustomerAddress(metadata: types.CustomersUpdateCustomerAddressMetadataParam): Promise<FetchResponse<number, unknown>>;
  customersUpdateCustomerAddress(body?: types.CustomersUpdateCustomerAddressBodyParam | types.CustomersUpdateCustomerAddressMetadataParam, metadata?: types.CustomersUpdateCustomerAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/addresses/{addressId}', 'post', body, metadata);
  }

  /**
   * Deletes a merchant's customer's address.
   *
   * @summary Delete a customer address
   */
  customersDeleteCustomerAddress(metadata: types.CustomersDeleteCustomerAddressMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/addresses/{addressId}', 'delete', metadata);
  }

  /**
   * "first6" and "last4" fields are required.
   *
   * @summary Create a credit/debit card entry for a customer
   */
  customersCreateCustomerCard(body: types.CustomersCreateCustomerCardBodyParam, metadata: types.CustomersCreateCustomerCardMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/cards', 'post', body, metadata);
  }

  /**
   * Update a credit/debit card record for a customer
   *
   */
  customersUpdateCustomerCard(body: types.CustomersUpdateCustomerCardBodyParam, metadata: types.CustomersUpdateCustomerCardMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/cards/{cardId}', 'post', body, metadata);
  }

  /**
   * Delete a customer card
   *
   */
  customersDeleteCustomerCard(metadata: types.CustomersDeleteCustomerCardMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/cards/{cardId}', 'delete', metadata);
  }

  /**
   * Creates note, birthday, business name associated to a merchant's customer.
   *
   * @summary Create note, birthday, business name for a customer
   */
  customersCreateOrUpdateCustomerMetadata(body: types.CustomersCreateOrUpdateCustomerMetadataBodyParam, metadata: types.CustomersCreateOrUpdateCustomerMetadataMetadataParam): Promise<FetchResponse<number, unknown>>;
  customersCreateOrUpdateCustomerMetadata(metadata: types.CustomersCreateOrUpdateCustomerMetadataMetadataParam): Promise<FetchResponse<number, unknown>>;
  customersCreateOrUpdateCustomerMetadata(body?: types.CustomersCreateOrUpdateCustomerMetadataBodyParam | types.CustomersCreateOrUpdateCustomerMetadataMetadataParam, metadata?: types.CustomersCreateOrUpdateCustomerMetadataMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/customers/{customerId}/metadata', 'post', body, metadata);
  }

  /**
   * Retrieves information about employees associated with a merchant.
   *
   * @summary Get all employees
   */
  employeeGetEmployees(metadata: types.EmployeeGetEmployeesMetadataParam): Promise<FetchResponse<200, types.EmployeeGetEmployeesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/employees', 'get', metadata);
  }

  /**
   * Creates an employee for a merchant. Accepts optional expand parameters.
   *
   * @summary Create an employee
   */
  employeeCreateEmployee(body: types.EmployeeCreateEmployeeBodyParam, metadata: types.EmployeeCreateEmployeeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/employees', 'post', body, metadata);
  }

  /**
   * Returns information for a single employee.  Accepts optional expand query parameters
   *
   * @summary Get a single employee
   */
  employeeGetEmployee(metadata: types.EmployeeGetEmployeeMetadataParam): Promise<FetchResponse<200, types.EmployeeGetEmployeeResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}', 'get', metadata);
  }

  /**
   * Updates information for a single employee. Accepts optional expand query params.
   *
   * @summary Update an employee
   */
  employeeUpdateEmployee(body: types.EmployeeUpdateEmployeeBodyParam, metadata: types.EmployeeUpdateEmployeeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}', 'post', body, metadata);
  }

  /**
   * Deletes a single employee from a merchant, also can't delete the 'owner' employee.
   *
   * @summary Delete an employee
   */
  employeeDeleteEmployee(metadata: types.EmployeeDeleteEmployeeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}', 'delete', metadata);
  }

  /**
   * Get all shifts
   *
   */
  merchantGetAllShifts(metadata: types.MerchantGetAllShiftsMetadataParam): Promise<FetchResponse<200, types.MerchantGetAllShiftsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/shifts', 'get', metadata);
  }

  /**
   * Get a single shift
   *
   */
  merchantGetShift(metadata: types.MerchantGetShiftMetadataParam): Promise<FetchResponse<200, types.MerchantGetShiftResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/shifts/{shiftId}', 'get', metadata);
  }

  /**
   * Get .csv of all shifts
   *
   */
  merchantGetAllShiftsCSV(metadata: types.MerchantGetAllShiftsCsvMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/shifts.csv', 'get', metadata);
  }

  /**
   * Get all shifts for an employee
   *
   */
  employeeGetEmployeeShifts(metadata: types.EmployeeGetEmployeeShiftsMetadataParam): Promise<FetchResponse<200, types.EmployeeGetEmployeeShiftsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/shifts', 'get', metadata);
  }

  /**
   * Create shift for an employee
   *
   */
  employeeCreateShift(body: types.EmployeeCreateShiftBodyParam, metadata: types.EmployeeCreateShiftMetadataParam): Promise<FetchResponse<number, unknown>>;
  employeeCreateShift(metadata: types.EmployeeCreateShiftMetadataParam): Promise<FetchResponse<number, unknown>>;
  employeeCreateShift(body?: types.EmployeeCreateShiftBodyParam | types.EmployeeCreateShiftMetadataParam, metadata?: types.EmployeeCreateShiftMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/shifts', 'post', body, metadata);
  }

  /**
   * Get a single shift
   *
   */
  employeeGetEmployeeShift(metadata: types.EmployeeGetEmployeeShiftMetadataParam): Promise<FetchResponse<200, types.EmployeeGetEmployeeShiftResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/shifts/{shiftId}', 'get', metadata);
  }

  /**
   * Update a single shift
   *
   */
  employeeUpdateShift(body: types.EmployeeUpdateShiftBodyParam, metadata: types.EmployeeUpdateShiftMetadataParam): Promise<FetchResponse<number, unknown>>;
  employeeUpdateShift(metadata: types.EmployeeUpdateShiftMetadataParam): Promise<FetchResponse<number, unknown>>;
  employeeUpdateShift(body?: types.EmployeeUpdateShiftBodyParam | types.EmployeeUpdateShiftMetadataParam, metadata?: types.EmployeeUpdateShiftMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/shifts/{shiftId}', 'post', body, metadata);
  }

  /**
   * When sending a request, you must include an X-Clover-Account-Id header. The value of the
   * header must be the ID of an employee with the permission to edit shifts.
   *
   * @summary Delete a single shift
   */
  employeeDeleteShift(metadata: types.EmployeeDeleteShiftMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/shifts/{shiftId}', 'delete', metadata);
  }

  /**
   * Get all orders for an employee
   *
   */
  employeeGetEmployeeOrders(metadata: types.EmployeeGetEmployeeOrdersMetadataParam): Promise<FetchResponse<200, types.EmployeeGetEmployeeOrdersResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/orders', 'get', metadata);
  }

  /**
   * Displays line items for each category in the inventory for an order.
   *
   * @summary Get all inventory items
   */
  inventoryGetItems(metadata: types.InventoryGetItemsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/items', 'get', metadata);
  }

  /**
   * Creates an inventory item.
   *
   * @summary Create an inventory item
   */
  inventoryCreateItem(body: types.InventoryCreateItemBodyParam, metadata: types.InventoryCreateItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/items', 'post', body, metadata);
  }

  /**
   * Deletes multiple inventory items in a single request. Add a query string with the
   * parameter `itemIds` and a comma-separated list of one or more `itemId` values.
   *
   * Use this example to create a request to delete three items: 
   *  {merchantId}/items?itemIds={itemId},{itemId},{itemId}
   *
   * @summary Delete multiple inventory items
   */
  inventoryBulkDeleteItems(metadata: types.InventoryBulkDeleteItemsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/items', 'delete', metadata);
  }

  /**
   * Retrieves inventory items without a tag or revenue class.
   *  `Note:` A revenue class tracks and compares revenue streams and sales of items taxed at
   * variable rates. Tag items you want to track as part of a revenue class.
   *
   * @summary Get all inventory without a revenue class
   */
  inventoryGetItemsNoRevenueClass(metadata: types.InventoryGetItemsNoRevenueClassMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/items_no_revenue_class', 'get', metadata);
  }

  /**
   * Get a single inventory item
   *
   */
  inventoryGetItem(metadata: types.InventoryGetItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/items/{itemId}', 'get', metadata);
  }

  /**
   * Updates an existing inventory item. Use the POST HTTP method to [create an inventory
   * item](https://docs.clover.com/reference/inventorycreateitem).
   *
   * @summary Update an existing inventory item
   */
  inventoryUpdateItem(body: types.InventoryUpdateItemBodyParam, metadata: types.InventoryUpdateItemMetadataParam): Promise<FetchResponse<200, types.InventoryUpdateItemResponse200>>;
  inventoryUpdateItem(metadata: types.InventoryUpdateItemMetadataParam): Promise<FetchResponse<200, types.InventoryUpdateItemResponse200>>;
  inventoryUpdateItem(body?: types.InventoryUpdateItemBodyParam | types.InventoryUpdateItemMetadataParam, metadata?: types.InventoryUpdateItemMetadataParam): Promise<FetchResponse<200, types.InventoryUpdateItemResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/items/{itemId}', 'post', body, metadata);
  }

  /**
   * Delete an inventory item
   *
   */
  inventoryDeleteItem(metadata: types.InventoryDeleteItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/items/{itemId}', 'delete', metadata);
  }

  /**
   * Updates only the changes in the payload without replacing existing inventory items. Use
   * the POST HTTP method to [create multiple inventory
   * items](https://docs.clover.com/reference/inventorybulkcreateinventoryitems). 
   *
   * @summary Update existing inventory items
   */
  inventoryBulkPatchInventoryItems(body: types.InventoryBulkPatchInventoryItemsBodyParam, metadata: types.InventoryBulkPatchInventoryItemsMetadataParam): Promise<FetchResponse<200, types.InventoryBulkPatchInventoryItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/bulk_items', 'put', body, metadata);
  }

  /**
   * Creates multiple inventory items in a single request. Use the PUT HTTP method to [update
   * existing inventory
   * items](https://docs.clover.com/reference/inventorybulkpatchinventoryitems).
   *
   * @summary Create multiple inventory items
   */
  inventoryBulkCreateInventoryItems(body: types.InventoryBulkCreateInventoryItemsBodyParam, metadata: types.InventoryBulkCreateInventoryItemsMetadataParam): Promise<FetchResponse<200, types.InventoryBulkCreateInventoryItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/bulk_items', 'post', body, metadata);
  }

  /**
   * Get the stock of all inventory items
   *
   */
  inventoryGetItemStocks(metadata: types.InventoryGetItemStocksMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/item_stocks', 'get', metadata);
  }

  /**
   * Get the stock of an inventory item
   *
   */
  inventoryGetItemStock(metadata: types.InventoryGetItemStockMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/item_stocks/{itemId}', 'get', metadata);
  }

  /**
   * Update the stock of an inventory item
   *
   */
  inventoryUpdateItemStock(body: types.InventoryUpdateItemStockBodyParam, metadata: types.InventoryUpdateItemStockMetadataParam): Promise<FetchResponse<number, unknown>>;
  inventoryUpdateItemStock(metadata: types.InventoryUpdateItemStockMetadataParam): Promise<FetchResponse<number, unknown>>;
  inventoryUpdateItemStock(body?: types.InventoryUpdateItemStockBodyParam | types.InventoryUpdateItemStockMetadataParam, metadata?: types.InventoryUpdateItemStockMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/item_stocks/{itemId}', 'post', body, metadata);
  }

  /**
   * Delete the stock of an inventory item
   *
   */
  inventoryDeleteItemStock(metadata: types.InventoryDeleteItemStockMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/item_stocks/{itemId}', 'delete', metadata);
  }

  /**
   * Retrieves item groups that allow merchants to create and manage large groups of related
   * items, also known as **Item with variants**.
   *  `For example:` A merchant sells a T-shirt that is available in various sizes and
   * colors. Each of the T-shirt variations is an item within the T-shirt item group. When an
   * item group is created, it appears in the Register app as a single button, and tapping it
   * displays a choice of variations for sale.
   *  Before adding items to an item group, you need to create the:
   * 1. Item group.
   * 2. Attributes, such as size and color.
   * 3. Options for each attribute, such as small and blue.
   * 4. Individual items and include the item group ID to associate the items with the group.
   * 5. Associate the options with an item.
   *  - An item can only belong to an item group if the item group ID is entered when the
   * item is created.
   *  - An item can only be a member of a single item group, and once it is part of an item
   * group, it can never be removed or moved to another item group; it can only be deleted.
   *  `Note:` The item number of the item group is automatically generated by the Clover
   * server as a combination of the item group name and the names of all the options
   * associated with that item. This item number is not editable. If the item group name or
   * option name is changed, then the item names are automatically regenerated.
   *
   * @summary Get all item groups
   */
  inventoryGetItemGroups(metadata: types.InventoryGetItemGroupsMetadataParam): Promise<FetchResponse<200, types.InventoryGetItemGroupsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/item_groups', 'get', metadata);
  }

  /**
   * Create an item group
   *
   */
  inventoryCreateItemGroup(body: types.InventoryCreateItemGroupBodyParam, metadata: types.InventoryCreateItemGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/item_groups', 'post', body, metadata);
  }

  /**
   * Get a single item group
   *
   */
  inventoryGetItemGroup(metadata: types.InventoryGetItemGroupMetadataParam): Promise<FetchResponse<200, types.InventoryGetItemGroupResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/item_groups/{itemGroupId}', 'get', metadata);
  }

  /**
   * Update an item group
   *
   */
  inventoryUpdateItemGroup(body: types.InventoryUpdateItemGroupBodyParam, metadata: types.InventoryUpdateItemGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/item_groups/{itemGroupId}', 'post', body, metadata);
  }

  /**
   * Delete an item group
   *
   */
  inventoryDeleteItemGroup(metadata: types.InventoryDeleteItemGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/item_groups/{itemGroupId}', 'delete', metadata);
  }

  /**
   * Retrieves all tags for an order.
   *  `Note:` In the REST API, a merchant uses two types of tags:
   * 1. Tags, also known as item labels, are used to keep track of these items in reports.
   * 2. Tags associated with the printer work as a printer label.
   *  `Example:` If a tag is associated with both an item and a printer, when the order is
   * printed, the tagged items are printed only on the associated printer.
   *
   * @summary Get all tags
   */
  tagGetTags(metadata: types.TagGetTagsMetadataParam): Promise<FetchResponse<200, types.TagGetTagsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tags', 'get', metadata);
  }

  /**
   * Create a tag
   *
   */
  tagCreateTag(body: types.TagCreateTagBodyParam, metadata: types.TagCreateTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tags', 'post', body, metadata);
  }

  /**
   * Deletes multiple tags in a single request. Add a query string with the parameter
   * `tagIds` and a comma-separated list of one or more `tagIds` values.
   *
   * Use this example to create a request to delete three tags: 
   * {merchantId}/tags?tagIds={tagId1},{tagId2},{tagId3}
   *
   * @summary Delete tags
   */
  tagBulkDeleteTags(metadata: types.TagBulkDeleteTagsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tags', 'delete', metadata);
  }

  /**
   * Get a single tag
   *
   */
  tagGetTag(metadata: types.TagGetTagMetadataParam): Promise<FetchResponse<200, types.TagGetTagResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tags/{tagId}', 'get', metadata);
  }

  /**
   * Update a single tag
   *
   */
  tagUpdateTag(body: types.TagUpdateTagBodyParam, metadata: types.TagUpdateTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tags/{tagId}', 'post', body, metadata);
  }

  /**
   * Delete a tag
   *
   */
  tagDeleteTag(metadata: types.TagDeleteTagMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tags/{tagId}', 'delete', metadata);
  }

  /**
   * Get tags for a single item
   *
   */
  tagGetItemTags(metadata: types.TagGetItemTagsMetadataParam): Promise<FetchResponse<200, types.TagGetItemTagsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/items/{itemId}/tags', 'get', metadata);
  }

  /**
   * Get all items for a single tag
   *
   */
  tagGetTaggedItems(metadata: types.TagGetTaggedItemsMetadataParam): Promise<FetchResponse<200, types.TagGetTaggedItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tags/{tagId}/items', 'get', metadata);
  }

  /**
   * Get a list of all tag to item mappings
   *
   */
  tagGetTagItems(metadata: types.TagGetTagItemsMetadataParam): Promise<FetchResponse<200, types.TagGetTagItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tag_items', 'get', metadata);
  }

  /**
   * Create or delete associations between tags and items
   *
   */
  tagCreateOrDeleteTagItems(metadata: types.TagCreateOrDeleteTagItemsMetadataParam): Promise<FetchResponse<200, types.TagCreateOrDeleteTagItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tag_items', 'post', metadata);
  }

  /**
   * Retrieves all tax rates applicable on an order. A tax rate is a percentage or a flat fee
   * at which an item is taxed.
   *
   * @summary Get all tax rates
   */
  taxrateGetTaxRates(metadata: types.TaxrateGetTaxRatesMetadataParam): Promise<FetchResponse<200, types.TaxrateGetTaxRatesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rates', 'get', metadata);
  }

  /**
   * Create a tax rate for a merchant
   *
   */
  taxrateCreateTaxRate(body: types.TaxrateCreateTaxRateBodyParam, metadata: types.TaxrateCreateTaxRateMetadataParam): Promise<FetchResponse<200, types.TaxrateCreateTaxRateResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rates', 'post', body, metadata);
  }

  /**
   * Get a single tax rate
   *
   */
  taxrateGetTaxRate(metadata: types.TaxrateGetTaxRateMetadataParam): Promise<FetchResponse<200, types.TaxrateGetTaxRateResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rates/{taxId}', 'get', metadata);
  }

  /**
   * Update a single tax rate
   *
   */
  taxrateUpdateTaxRate(body: types.TaxrateUpdateTaxRateBodyParam, metadata: types.TaxrateUpdateTaxRateMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rates/{taxId}', 'post', body, metadata);
  }

  /**
   * Delete a single tax rate
   *
   */
  taxrateDeleteTaxRate(metadata: types.TaxrateDeleteTaxRateMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rates/{taxId}', 'delete', metadata);
  }

  /**
   * Retrieves all categories. Items display on the Register app within categories in the
   * order in which they are added to a category. Items may be associated with one or more
   * categories or may not be associated with any category. Categories display in the
   * Register app based on the sort order value for each category.
   *
   * @summary Get all categories
   */
  categoryGetCategories(metadata: types.CategoryGetCategoriesMetadataParam): Promise<FetchResponse<200, types.CategoryGetCategoriesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/categories', 'get', metadata);
  }

  /**
   * Create an item category
   *
   */
  categoryCreateCategory(body: types.CategoryCreateCategoryBodyParam, metadata: types.CategoryCreateCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/categories', 'post', body, metadata);
  }

  /**
   * Deletes multiple categories in a single request. Add a query string with the parameter
   * `categoryIds` and a comma-separated list of one or more `categoryIds` values.
   *
   * Use this example to create a request to delete three categories: 
   *  {merchantId}/categories?categoryIds={categoryId},{categoryId},{categoryId}
   *
   * @summary Delete categories
   */
  categoryBulkDeleteCategories(metadata: types.CategoryBulkDeleteCategoriesMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/categories', 'delete', metadata);
  }

  /**
   * Get a category
   *
   */
  categoryGetCategory(metadata: types.CategoryGetCategoryMetadataParam): Promise<FetchResponse<200, types.CategoryGetCategoryResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/categories/{catId}', 'get', metadata);
  }

  /**
   * Update a category
   *
   */
  categoryUpdateCategory(body: types.CategoryUpdateCategoryBodyParam, metadata: types.CategoryUpdateCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/categories/{catId}', 'post', body, metadata);
  }

  /**
   * Delete a single item category
   *
   */
  categoryDeleteCategory(metadata: types.CategoryDeleteCategoryMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/categories/{catId}', 'delete', metadata);
  }

  /**
   * Update the order for categories on the menu at a time, up to 1000 categories.
   *
   */
  categoryUpdateCategorySortOrders(body: types.CategoryUpdateCategorySortOrdersBodyParam, metadata: types.CategoryUpdateCategorySortOrdersMetadataParam): Promise<FetchResponse<number, unknown>>;
  categoryUpdateCategorySortOrders(metadata: types.CategoryUpdateCategorySortOrdersMetadataParam): Promise<FetchResponse<number, unknown>>;
  categoryUpdateCategorySortOrders(body?: types.CategoryUpdateCategorySortOrdersBodyParam | types.CategoryUpdateCategorySortOrdersMetadataParam, metadata?: types.CategoryUpdateCategorySortOrdersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/categories/bulk_sort_orders', 'post', body, metadata);
  }

  /**
   * Retrieves all items in a category.
   *
   * @summary Get all items in a single category
   */
  categoryGetCategoryItems(metadata: types.CategoryGetCategoryItemsMetadataParam): Promise<FetchResponse<200, types.CategoryGetCategoryItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/categories/{catId}/items', 'get', metadata);
  }

  /**
   * Retrieves all categories of an item.
   *
   * @summary Get all categories of a single item
   */
  categoryGetItemCategories(metadata: types.CategoryGetItemCategoriesMetadataParam): Promise<FetchResponse<200, types.CategoryGetItemCategoriesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/items/{itemId}/categories', 'get', metadata);
  }

  /**
   * Create or delete associations between items and categories
   *
   */
  categoryCreateOrDeleteCategoryItems(metadata: types.CategoryCreateOrDeleteCategoryItemsMetadataParam): Promise<FetchResponse<200, types.CategoryCreateOrDeleteCategoryItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/category_items', 'post', metadata);
  }

  /**
   * Creates or deletes association between line items and tax rates. For more information,
   * see [Use object associations](https://docs.clover.com/docs/using-object-associations).
   *
   * @summary Create or delete association between items and tax rates
   */
  taxrateCreateOrDeleteTaxRateItems(body: types.TaxrateCreateOrDeleteTaxRateItemsBodyParam, metadata: types.TaxrateCreateOrDeleteTaxRateItemsMetadataParam): Promise<FetchResponse<200, types.TaxrateCreateOrDeleteTaxRateItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rate_items', 'post', body, metadata);
  }

  /**
   * Get items by tax rate
   *
   */
  taxrateGetItemsByTaxRate(metadata: types.TaxrateGetItemsByTaxRateMetadataParam): Promise<FetchResponse<200, types.TaxrateGetItemsByTaxRateResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rates/{taxId}/items', 'get', metadata);
  }

  /**
   * Retrieves all modifier groups. Modifier groupings are the categories to which different
   * modifiers belong. Modifier groups can be made available for specific inventory Items by
   * creating an item to a modifier group association.
   *
   * @summary Get all modifier groups
   */
  modifierGetModifierGroups(metadata: types.ModifierGetModifierGroupsMetadataParam): Promise<FetchResponse<200, types.ModifierGetModifierGroupsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups', 'get', metadata);
  }

  /**
   * Creates a new modifier group. After you create a modifier group, you can associate
   * modifiers with the group.
   *
   * @summary Create a modifier group
   */
  modifierCreateModifierGroup(body: types.ModifierCreateModifierGroupBodyParam, metadata: types.ModifierCreateModifierGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups', 'post', body, metadata);
  }

  /**
   * Deletes multiple modifier groups in a single request. Add a query string with the
   * parameter `modifierGroupIds` and a comma-separated list of one or more `modifierGroupId`
   * values.
   *
   * Use this example to create a request to delete three modifierGroups: 
   *  {merchantId}/modifierGroups?modifierGroupIds={modifierGroupId},{modifierGroupId},{modifierGroupId}
   *
   * @summary Delete modifier groups
   */
  modifierBulkDeleteModifierGroups(metadata: types.ModifierBulkDeleteModifierGroupsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups', 'delete', metadata);
  }

  /**
   * Get a single modifier group by it's UUID
   *
   * @summary Get a modifier group
   */
  modifierGetModifierGroup(metadata: types.ModifierGetModifierGroupMetadataParam): Promise<FetchResponse<200, types.ModifierGetModifierGroupResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}', 'get', metadata);
  }

  /**
   * Update a modifier group. In order to add modifiers use the create modifiers endpoint.
   *
   * @summary Update a modifier group
   */
  modifierUpdateModifierGroup(body: types.ModifierUpdateModifierGroupBodyParam, metadata: types.ModifierUpdateModifierGroupMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierUpdateModifierGroup(metadata: types.ModifierUpdateModifierGroupMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierUpdateModifierGroup(body?: types.ModifierUpdateModifierGroupBodyParam | types.ModifierUpdateModifierGroupMetadataParam, metadata?: types.ModifierUpdateModifierGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}', 'post', body, metadata);
  }

  /**
   * Delete an existing modifier group, identified by UUID. This also deletes all modifiers
   * within that group.
   *
   * @summary Delete a modifier group
   */
  modifierDeleteModifierGroup(metadata: types.ModifierDeleteModifierGroupMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}', 'delete', metadata);
  }

  /**
   * Creates or deletes the association between inventory items and modifier groups.
   * Modifiers can only be applied to inventory items associated with that modifier group.
   * For more information, see [Use object
   * associations](https://docs.clover.com/docs/using-object-associations).
   *
   * @summary Create or delete associations between inventory items and modifier groups
   */
  modifierCreateOrDeleteItemModifierGroups(body: types.ModifierCreateOrDeleteItemModifierGroupsBodyParam, metadata: types.ModifierCreateOrDeleteItemModifierGroupsMetadataParam): Promise<FetchResponse<200, types.ModifierCreateOrDeleteItemModifierGroupsResponse200>>;
  modifierCreateOrDeleteItemModifierGroups(metadata: types.ModifierCreateOrDeleteItemModifierGroupsMetadataParam): Promise<FetchResponse<200, types.ModifierCreateOrDeleteItemModifierGroupsResponse200>>;
  modifierCreateOrDeleteItemModifierGroups(body?: types.ModifierCreateOrDeleteItemModifierGroupsBodyParam | types.ModifierCreateOrDeleteItemModifierGroupsMetadataParam, metadata?: types.ModifierCreateOrDeleteItemModifierGroupsMetadataParam): Promise<FetchResponse<200, types.ModifierCreateOrDeleteItemModifierGroupsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/item_modifier_groups', 'post', body, metadata);
  }

  /**
   * Update the priorities for a collection of up to 200 modifier groups at a time
   *
   */
  modifierUpdateModifierGroupSortOrders(body: types.ModifierUpdateModifierGroupSortOrdersBodyParam, metadata: types.ModifierUpdateModifierGroupSortOrdersMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierUpdateModifierGroupSortOrders(metadata: types.ModifierUpdateModifierGroupSortOrdersMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierUpdateModifierGroupSortOrders(body?: types.ModifierUpdateModifierGroupSortOrdersBodyParam | types.ModifierUpdateModifierGroupSortOrdersMetadataParam, metadata?: types.ModifierUpdateModifierGroupSortOrdersMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_group_sort_orders', 'post', body, metadata);
  }

  /**
   * Reorder modifiers in the modifier group based on the ordering of the incoming modifier
   * id list. Remove deleted modifiers. Add missing modifiers.
   *
   */
  modifierReorderModifiers(body: types.ModifierReorderModifiersBodyParam, metadata: types.ModifierReorderModifiersMetadataParam): Promise<FetchResponse<200, types.ModifierReorderModifiersResponse200>>;
  modifierReorderModifiers(metadata: types.ModifierReorderModifiersMetadataParam): Promise<FetchResponse<200, types.ModifierReorderModifiersResponse200>>;
  modifierReorderModifiers(body?: types.ModifierReorderModifiersBodyParam | types.ModifierReorderModifiersMetadataParam, metadata?: types.ModifierReorderModifiersMetadataParam): Promise<FetchResponse<200, types.ModifierReorderModifiersResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}/layout', 'put', body, metadata);
  }

  /**
   * Retrieves a list of all items in a single modifier group.
   *
   * @summary Get all items in a single modifier group
   */
  modifierGetModifierGroupItems(metadata: types.ModifierGetModifierGroupItemsMetadataParam): Promise<FetchResponse<200, types.ModifierGetModifierGroupItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}/items', 'get', metadata);
  }

  /**
   * Retrieves all modifiers from all modifier groups.
   *
   * @summary Get all modifiers
   */
  modifierGetModifiers(metadata: types.ModifierGetModifiersMetadataParam): Promise<FetchResponse<200, types.ModifierGetModifiersResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/modifiers', 'get', metadata);
  }

  /**
   * Retrieves a list of modifiers in a single modifier group.
   *
   * @summary Get all modifiers in a single modifier group
   */
  modifierGetModifiersByGroup(metadata: types.ModifierGetModifiersByGroupMetadataParam): Promise<FetchResponse<200, types.ModifierGetModifiersByGroupResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}/modifiers', 'get', metadata);
  }

  /**
   * Create a modifier object belonging to the modifier group identified in the URL.
   *
   * @summary Create a modifier
   */
  modifierCreateModifier(body: types.ModifierCreateModifierBodyParam, metadata: types.ModifierCreateModifierMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierCreateModifier(metadata: types.ModifierCreateModifierMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierCreateModifier(body?: types.ModifierCreateModifierBodyParam | types.ModifierCreateModifierMetadataParam, metadata?: types.ModifierCreateModifierMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}/modifiers', 'post', body, metadata);
  }

  /**
   * Get a single modifier by it's group, and it's UUID
   *
   * @summary Get a single modifier
   */
  modifierGetModifier(metadata: types.ModifierGetModifierMetadataParam): Promise<FetchResponse<200, types.ModifierGetModifierResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}/modifiers/{modId}', 'get', metadata);
  }

  /**
   * Update a modifier. Note that once it has been created, it is not possible to change a
   * modifier's group.
   *
   * @summary Update a single modifier
   */
  modifierUpdateModifier(body: types.ModifierUpdateModifierBodyParam, metadata: types.ModifierUpdateModifierMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierUpdateModifier(metadata: types.ModifierUpdateModifierMetadataParam): Promise<FetchResponse<number, unknown>>;
  modifierUpdateModifier(body?: types.ModifierUpdateModifierBodyParam | types.ModifierUpdateModifierMetadataParam, metadata?: types.ModifierUpdateModifierMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}/modifiers/{modId}', 'post', body, metadata);
  }

  /**
   * Delete a single modifier by it's UUID
   *
   * @summary Delete a single modifier
   */
  modifierDeleteModifier(metadata: types.ModifierDeleteModifierMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/modifier_groups/{modGroupId}/modifiers/{modId}', 'delete', metadata);
  }

  /**
   * Retrieves item attributes, for example: size and color of a t-shirt.
   *
   * @summary Get all attributes
   */
  inventoryGetAttributes(metadata: types.InventoryGetAttributesMetadataParam): Promise<FetchResponse<200, types.InventoryGetAttributesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes', 'get', metadata);
  }

  /**
   * Create an attribute
   *
   */
  inventoryCreateAttribute(body: types.InventoryCreateAttributeBodyParam, metadata: types.InventoryCreateAttributeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes', 'post', body, metadata);
  }

  /**
   * Get a single attribute
   *
   */
  inventoryGetAttribute(metadata: types.InventoryGetAttributeMetadataParam): Promise<FetchResponse<200, types.InventoryGetAttributeResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}', 'get', metadata);
  }

  /**
   * Update a single attribute
   *
   */
  inventoryUpdateAttribute(body: types.InventoryUpdateAttributeBodyParam, metadata: types.InventoryUpdateAttributeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}', 'post', body, metadata);
  }

  /**
   * Delete a single attribute
   *
   */
  inventoryDeleteAttribute(metadata: types.InventoryDeleteAttributeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}', 'delete', metadata);
  }

  /**
   * Retrieves all available item variants or options. For more information, see [Get all
   * item groups](https://docs.clover.com/reference/inventorygetitemgroups).
   *
   * @summary Get all options
   */
  inventoryGetOptions(metadata: types.InventoryGetOptionsMetadataParam): Promise<FetchResponse<200, types.InventoryGetOptionsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/options', 'get', metadata);
  }

  /**
   * Retrieves all available variants or options associated with an attribute.
   *
   * @summary Get all options for an attribute
   */
  inventoryGetOptionsByAttribute(metadata: types.InventoryGetOptionsByAttributeMetadataParam): Promise<FetchResponse<200, types.InventoryGetOptionsByAttributeResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}/options', 'get', metadata);
  }

  /**
   * Create an option
   *
   */
  inventoryCreateOption(body: types.InventoryCreateOptionBodyParam, metadata: types.InventoryCreateOptionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}/options', 'post', body, metadata);
  }

  /**
   * Get an attribute and option by ID
   *
   */
  inventoryGetOptionById(metadata: types.InventoryGetOptionByIdMetadataParam): Promise<FetchResponse<200, types.InventoryGetOptionByIdResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}/options/{optionId}', 'get', metadata);
  }

  /**
   * Update an option
   *
   */
  inventoryUpdateOption(body: types.InventoryUpdateOptionBodyParam, metadata: types.InventoryUpdateOptionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}/options/{optionId}', 'post', body, metadata);
  }

  /**
   * Delete an option
   *
   */
  inventoryDeleteOption(metadata: types.InventoryDeleteOptionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/attributes/{attributeId}/options/{optionId}', 'delete', metadata);
  }

  /**
   * See the description for 'get all item groups'.
   *
   * @summary Create or delete item/option association
   */
  inventoryCreateOrDeleteOptionItems(metadata: types.InventoryCreateOrDeleteOptionItemsMetadataParam): Promise<FetchResponse<200, types.InventoryCreateOrDeleteOptionItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/option_items', 'post', metadata);
  }

  /**
   * Retrieves all discounts associated with an inventory item.
   *
   * @summary Get all discounts
   */
  inventoryGetDiscounts(metadata: types.InventoryGetDiscountsMetadataParam): Promise<FetchResponse<200, types.InventoryGetDiscountsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/discounts', 'get', metadata);
  }

  /**
   * Create a discount
   *
   */
  inventoryCreateDiscount(body: types.InventoryCreateDiscountBodyParam, metadata: types.InventoryCreateDiscountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/discounts', 'post', body, metadata);
  }

  /**
   * Get a single discount
   *
   */
  inventoryGetDiscount(metadata: types.InventoryGetDiscountMetadataParam): Promise<FetchResponse<200, types.InventoryGetDiscountResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/discounts/{discountId}', 'get', metadata);
  }

  /**
   * Update an discount
   *
   */
  inventoryUpdateDiscount(body: types.InventoryUpdateDiscountBodyParam, metadata: types.InventoryUpdateDiscountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/discounts/{discountId}', 'post', body, metadata);
  }

  /**
   * Delete a discount
   *
   */
  inventoryDeleteDiscount(metadata: types.InventoryDeleteDiscountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/discounts/{discountId}', 'delete', metadata);
  }

  /**
   * Get a list of tax exemption rules which links order types to items in an order to
   * exclude certain tax rates from those items
   *
   * @summary Get all tax exemption rules
   */
  taxrulesGetTaxRules(metadata: types.TaxrulesGetTaxRulesMetadataParam): Promise<FetchResponse<200, types.TaxrulesGetTaxRulesResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rules', 'get', metadata);
  }

  /**
   * Returns the tax exemption rule specified in the request
   *
   * @summary Get an individual tax exemption rule
   */
  taxrulesGetTaxRule(metadata: types.TaxrulesGetTaxRuleMetadataParam): Promise<FetchResponse<200, types.TaxrulesGetTaxRuleResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/tax_rules/{taxRuleId}', 'get', metadata);
  }

  /**
   * Send a message to a device that has your app installed and is listening for
   * notifications. For details on how to use Clover's Android SDK to receive notifications,
   * see: https://github.com/clover/android-examples/tree/master/pushnotificationexample.
   *
   * @summary Create a notification for an app
   */
  appsCreateMerchantAppNotification(body: types.AppsCreateMerchantAppNotificationBodyParam, metadata: types.AppsCreateMerchantAppNotificationMetadataParam): Promise<FetchResponse<number, unknown>>;
  appsCreateMerchantAppNotification(metadata: types.AppsCreateMerchantAppNotificationMetadataParam): Promise<FetchResponse<number, unknown>>;
  appsCreateMerchantAppNotification(body?: types.AppsCreateMerchantAppNotificationBodyParam | types.AppsCreateMerchantAppNotificationMetadataParam, metadata?: types.AppsCreateMerchantAppNotificationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/apps/{appId}/merchants/{mId}/notifications', 'post', body, metadata);
  }

  /**
   * Push a message to a device that has your app installed and is listening for
   * notifications.  For details on how to use Clover's Android SDK to receive notifications
   * see: https://github.com/clover/android-examples/tree/master/pushnotificationexample
   *
   * @summary Create a notification for a device
   */
  appsCreateDeviceAppNotification(body: types.AppsCreateDeviceAppNotificationBodyParam, metadata: types.AppsCreateDeviceAppNotificationMetadataParam): Promise<FetchResponse<number, unknown>>;
  appsCreateDeviceAppNotification(metadata: types.AppsCreateDeviceAppNotificationMetadataParam): Promise<FetchResponse<number, unknown>>;
  appsCreateDeviceAppNotification(body?: types.AppsCreateDeviceAppNotificationBodyParam | types.AppsCreateDeviceAppNotificationMetadataParam, metadata?: types.AppsCreateDeviceAppNotificationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/apps/{appId}/devices/{deviceId}/notifications', 'post', body, metadata);
  }

  /**
   * Creates a complete order—including line items, modifiers, discounts, and service
   * charges—with a single API call. If you need to create an order with custom or ad-hoc
   * line items, then you must use the `/v3/orders` endpoint. See the documentation for
   * [Working with orders](https://docs.clover.com/docs/working-with-orders).
   *
   * See the documentation for [400 Bad Request
   * errors](https://docs.clover.com/docs/working-with-orders#handling-400-bad-request-errors).
   *
   * @summary Create an atomic order
   */
  orderCreateAtomicOrder(body: types.OrderCreateAtomicOrderBodyParam, metadata: types.OrderCreateAtomicOrderMetadataParam): Promise<FetchResponse<200, types.OrderCreateAtomicOrderResponse200>>;
  orderCreateAtomicOrder(metadata: types.OrderCreateAtomicOrderMetadataParam): Promise<FetchResponse<200, types.OrderCreateAtomicOrderResponse200>>;
  orderCreateAtomicOrder(body?: types.OrderCreateAtomicOrderBodyParam | types.OrderCreateAtomicOrderMetadataParam, metadata?: types.OrderCreateAtomicOrderMetadataParam): Promise<FetchResponse<200, types.OrderCreateAtomicOrderResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/atomic_order/orders', 'post', body, metadata);
  }

  /**
   * Build an order; calculate totals, taxes, discounts, and service charges, and display
   * summary information. The response includes order cart information, the order total, and
   * taxes. See the documentation for [Working with
   * orders](https://docs.clover.com/docs/working-with-orders).
   *
   * See the documentation for [400 Bad Request
   * errors](https://docs.clover.com/docs/working-with-orders#handling-400-bad-request-errors).
   *
   * @summary Checkout an atomic order
   */
  orderCheckoutAtomicOrder(body: types.OrderCheckoutAtomicOrderBodyParam, metadata: types.OrderCheckoutAtomicOrderMetadataParam): Promise<FetchResponse<200, types.OrderCheckoutAtomicOrderResponse200>>;
  orderCheckoutAtomicOrder(metadata: types.OrderCheckoutAtomicOrderMetadataParam): Promise<FetchResponse<200, types.OrderCheckoutAtomicOrderResponse200>>;
  orderCheckoutAtomicOrder(body?: types.OrderCheckoutAtomicOrderBodyParam | types.OrderCheckoutAtomicOrderMetadataParam, metadata?: types.OrderCheckoutAtomicOrderMetadataParam): Promise<FetchResponse<200, types.OrderCheckoutAtomicOrderResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/atomic_order/checkouts', 'post', body, metadata);
  }

  /**
   * Displays a list of orders. See [Manage orders
   * data](https://docs.clover.com/build/working-with-orders/) for more details.
   *
   * @summary Gets a list of orders
   */
  orderGetOrders(metadata: types.OrderGetOrdersMetadataParam): Promise<FetchResponse<200, types.OrderGetOrdersResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/orders', 'get', metadata);
  }

  /**
   * Creates or updates orders with a non-Clover inventory and dynamically calculates taxes.
   * Valid fields are: taxRemoved, note, title, state, testMode, manualTransaction,
   * groupLineItems, and orderType. Use separate API calls to add line items. See the
   * tutorial [Create custom orders](https://docs.clover.com/docs/creating-custom-orders).
   *  To create orders with Clover inventory and leverage real-time totals and tax
   * calculation features, use the [Create an atomic
   * order](https://docs.clover.com/docs/creating-custom-orders) endpoint and see the
   * tutorial to [Manage orders data](https://docs.clover.com/docs/working-with-orders).
   *
   * @summary Create custom orders
   */
  orderCreateOrder(body: types.OrderCreateOrderBodyParam, metadata: types.OrderCreateOrderMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderCreateOrder(metadata: types.OrderCreateOrderMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderCreateOrder(body?: types.OrderCreateOrderBodyParam | types.OrderCreateOrderMetadataParam, metadata?: types.OrderCreateOrderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders', 'post', body, metadata);
  }

  /**
   * Returns a single order. See https://docs.clover.com/build/working-with-orders/ for more
   * details. 
   *
   * @summary Get a single order
   */
  orderGetOrder(metadata: types.OrderGetOrderMetadataParam): Promise<FetchResponse<200, types.OrderGetOrderResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}', 'get', metadata);
  }

  /**
   * Updates a single order. See
   * [working-with-orders](https://docs.clover.com/build/working-with-orders/) for more
   * details.
   *
   * @summary Update an order
   */
  orderUpdateOrder(body: types.OrderUpdateOrderBodyParam, metadata: types.OrderUpdateOrderMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderUpdateOrder(metadata: types.OrderUpdateOrderMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderUpdateOrder(body?: types.OrderUpdateOrderBodyParam | types.OrderUpdateOrderMetadataParam, metadata?: types.OrderUpdateOrderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}', 'post', body, metadata);
  }

  /**
   * Deletes a single order. See https://docs.clover.com/build/working-with-orders/ for more
   * details.
   *
   * @summary Delete an order
   */
  orderDeleteOrder(metadata: types.OrderDeleteOrderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}', 'delete', metadata);
  }

  /**
   * Deletes an order. See https://docs.clover.com/build/working-with-orders/ for more
   * details.
   *
   * @summary Delete an order
   */
  orderDeleteOrderWithReasonHandler(metadata: types.OrderDeleteOrderWithReasonHandlerMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders_v2/{orderId}', 'delete', metadata);
  }

  /**
   * Returns all discount details for an `orderid`.
   *
   * @summary Get all discounts for an order
   */
  orderGetOrderDiscounts(metadata: types.OrderGetOrderDiscountsMetadataParam): Promise<FetchResponse<200, types.OrderGetOrderDiscountsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/discounts', 'get', metadata);
  }

  /**
   * Creates a discount for an order.
   *
   * @summary Create a discount on an order
   */
  orderCreateDiscount(body: types.OrderCreateDiscountBodyParam, metadata: types.OrderCreateDiscountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/discounts', 'post', body, metadata);
  }

  /**
   * Deletes discount on an order.
   *
   * @summary Delete an order discount
   */
  orderRemoveOrderDiscount(metadata: types.OrderRemoveOrderDiscountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/discounts/{discountId}', 'delete', metadata);
  }

  /**
   * Returns all line items for an order.
   *
   * @summary Get all line items for an order
   */
  orderGetOrderLineItems(metadata: types.OrderGetOrderLineItemsMetadataParam): Promise<FetchResponse<200, types.OrderGetOrderLineItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items', 'get', metadata);
  }

  /**
   * Creates a new item list for an order. However, requests must include a price or
   * inventory item id.
   *
   * @summary Create a new line item
   */
  orderCreateLineItem(body: types.OrderCreateLineItemBodyParam, metadata: types.OrderCreateLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderCreateLineItem(metadata: types.OrderCreateLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderCreateLineItem(body?: types.OrderCreateLineItemBodyParam | types.OrderCreateLineItemMetadataParam, metadata?: types.OrderCreateLineItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items', 'post', body, metadata);
  }

  /**
   * Deletes all line items for an order.
   *
   * @summary Delete all the line items in an order
   */
  orderDeleteLineItems(metadata: types.OrderDeleteLineItemsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items', 'delete', metadata);
  }

  /**
   * Returns a line item for an order.
   *
   * @summary Get a line item
   */
  orderGetOrderLineItem(metadata: types.OrderGetOrderLineItemMetadataParam): Promise<FetchResponse<200, types.OrderGetOrderLineItemResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}', 'get', metadata);
  }

  /**
   * Updates a line item for an order.
   *
   * @summary Update a line item
   */
  orderUpdateOrderLineItem(body: types.OrderUpdateOrderLineItemBodyParam, metadata: types.OrderUpdateOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderUpdateOrderLineItem(metadata: types.OrderUpdateOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderUpdateOrderLineItem(body?: types.OrderUpdateOrderLineItemBodyParam | types.OrderUpdateOrderLineItemMetadataParam, metadata?: types.OrderUpdateOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}', 'post', body, metadata);
  }

  /**
   * Deletes a line item for an order.
   *
   * @summary Void a line item
   */
  orderDeleteOrderLineItem(metadata: types.OrderDeleteOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}', 'delete', metadata);
  }

  /**
   * Creates a discount on a line item for an order.
   *
   * @summary Create a discount on a line item
   */
  orderCreateLineItemDiscount(body: types.OrderCreateLineItemDiscountBodyParam, metadata: types.OrderCreateLineItemDiscountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}/discounts', 'post', body, metadata);
  }

  /**
   * Deletes a discount on a line item for an order.
   *
   * @summary Delete a discount
   */
  orderRemoveDiscount(metadata: types.OrderRemoveDiscountMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}/discounts/{discountId}', 'delete', metadata);
  }

  /**
   * Creates a modification, a record of a modifier as it exists at the time it is applied to
   * the lineItem. To view current modifications, use the 'expand=modifications' query
   * parameter on the lineItem. To learn more about applying a modification, see:
   * https://docs.clover.com/build/working-with-orders/#add-item-modifiers.
   *
   * @summary Apply a modification to a line item
   */
  orderApplyModification(body: types.OrderApplyModificationBodyParam, metadata: types.OrderApplyModificationMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderApplyModification(metadata: types.OrderApplyModificationMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderApplyModification(body?: types.OrderApplyModificationBodyParam | types.OrderApplyModificationMetadataParam, metadata?: types.OrderApplyModificationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}/modifications', 'post', body, metadata);
  }

  /**
   * Deletes a modification by UUID, removing the record of an applied modification.
   *
   * @summary Remove a modification from a line item
   */
  orderRemoveModification(metadata: types.OrderRemoveModificationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{lineItemId}/modifications/{modificationId}', 'delete', metadata);
  }

  /**
   * Creates multiple line items in a single request. Each item must include a price for the
   * request to succeed. The maximum number of line items per request is 100. See [Create
   * multiple
   * lineitems](https://docs.clover.com/docs/creating-custom-orders#create-multiple-line-items)
   * tutorial.
   *
   * @summary Create multiple line items
   */
  orderBulkCreateLineItems(body: types.OrderBulkCreateLineItemsBodyParam, metadata: types.OrderBulkCreateLineItemsMetadataParam): Promise<FetchResponse<200, types.OrderBulkCreateLineItemsResponse200>>;
  orderBulkCreateLineItems(metadata: types.OrderBulkCreateLineItemsMetadataParam): Promise<FetchResponse<200, types.OrderBulkCreateLineItemsResponse200>>;
  orderBulkCreateLineItems(body?: types.OrderBulkCreateLineItemsBodyParam | types.OrderBulkCreateLineItemsMetadataParam, metadata?: types.OrderBulkCreateLineItemsMetadataParam): Promise<FetchResponse<200, types.OrderBulkCreateLineItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/bulk_line_items', 'post', body, metadata);
  }

  /**
   * Displays payment information, including the total amount, tip amount, tax amount, and
   * result status for an `order`.
   *
   * @summary Get all payments for an order
   */
  payGetOrderPayments(metadata: types.PayGetOrderPaymentsMetadataParam): Promise<FetchResponse<200, types.PayGetOrderPaymentsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/payments', 'get', metadata);
  }

  /**
   * Payment must include a `positive amount` and a valid `tender ID`.
   *  `Note`: This endpoint references external tenders and logs them for bookkeeping
   * purposes. This is not for Clover credits/debit tenders. A merchant's tenders and their
   * IDs can be retrieved from /v3/merchants/mId/tenders.
   *
   * @summary Create a payment record on an order
   */
  orderCreatePaymentForOrder(body: types.OrderCreatePaymentForOrderBodyParam, metadata: types.OrderCreatePaymentForOrderMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderCreatePaymentForOrder(metadata: types.OrderCreatePaymentForOrderMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderCreatePaymentForOrder(body?: types.OrderCreatePaymentForOrderBodyParam | types.OrderCreatePaymentForOrderMetadataParam, metadata?: types.OrderCreatePaymentForOrderMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/payments', 'post', body, metadata);
  }

  /**
   * Request body must include the merchant's `service charge ID`. This ID can be retrieved
   * from /v3/merchants/mId/default_service_charge. Each request can set a different name and
   * percentageDecimal as needed for an order.
   *
   * @summary Apply a service charge to an order
   */
  orderApplyServiceCharge(body: types.OrderApplyServiceChargeBodyParam, metadata: types.OrderApplyServiceChargeMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderApplyServiceCharge(metadata: types.OrderApplyServiceChargeMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderApplyServiceCharge(body?: types.OrderApplyServiceChargeBodyParam | types.OrderApplyServiceChargeMetadataParam, metadata?: types.OrderApplyServiceChargeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/service_charge/', 'post', body, metadata);
  }

  /**
   * Removes service charge from an order. Request body must include the merchant's `service
   * charge ID`. This ID can be retrieved from /v3/merchants/mId/default_service_charge. Each
   * request can set a `different name` and `percentageDecimal` as needed for an order.
   *
   * @summary Remove service charge from an order
   */
  orderRemoveServiceCharge(metadata: types.OrderRemoveServiceChargeMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/service_charge/{chargeId}', 'delete', metadata);
  }

  /**
   * Creates a list of voided line items for an order.
   *
   * @summary Create a list of voided line items
   */
  orderVoidOrderLineItem(body: types.OrderVoidOrderLineItemBodyParam, metadata: types.OrderVoidOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderVoidOrderLineItem(metadata: types.OrderVoidOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderVoidOrderLineItem(body?: types.OrderVoidOrderLineItemBodyParam | types.OrderVoidOrderLineItemMetadataParam, metadata?: types.OrderVoidOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/voided_line_items', 'post', body, metadata);
  }

  /**
   * Retrieves a list of line items from voided orders, along with the reason for the void.
   *
   * @summary Get a list of line items from voided orders
   */
  lineitemGetVoidedOrderLineItems(metadata: types.LineitemGetVoidedOrderLineItemsMetadataParam): Promise<FetchResponse<200, types.LineitemGetVoidedOrderLineItemsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/voided_line_items', 'get', metadata);
  }

  /**
   * Returns detailed information about line items and orders which were deleted.
   *
   * @summary Get summary about line items and orders which were deleted
   */
  handlerGetVoidedLineItemsTotals(metadata: types.HandlerGetVoidedLineItemsTotalsMetadataParam): Promise<FetchResponse<200, types.HandlerGetVoidedLineItemsTotalsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/voided_line_items/totals', 'get', metadata);
  }

  /**
   * Creates or exchange line items for an order.
   *
   * @summary Create or exchange a line item
   */
  orderSetOrderLineItem(body: types.OrderSetOrderLineItemBodyParam, metadata: types.OrderSetOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderSetOrderLineItem(metadata: types.OrderSetOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>>;
  orderSetOrderLineItem(body?: types.OrderSetOrderLineItemBodyParam | types.OrderSetOrderLineItemMetadataParam, metadata?: types.OrderSetOrderLineItemMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/orders/{orderId}/line_items/{oldLineItemId}/exchange/{lineItemId}', 'post', body, metadata);
  }

  /**
   * An authorization is a permission by a card issuer that a merchant can charge the
   * customer in the future up to the specified amount. An authorization is created when a
   * merchant uses the Bar Tabs and Authorizations apps.
   *
   * @summary Get all authorizations
   */
  payGetAuthorizations(metadata: types.PayGetAuthorizationsMetadataParam): Promise<FetchResponse<200, types.PayGetAuthorizationsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/authorizations', 'get', metadata);
  }

  /**
   * An authorization must reference a payment, have an amount greater than 0, and have a
   * type.
   *
   * @summary Create an authorization on a Payment
   */
  payCreateAuthorization(body: types.PayCreateAuthorizationBodyParam, metadata: types.PayCreateAuthorizationMetadataParam): Promise<FetchResponse<200, types.PayCreateAuthorizationResponse200>>;
  payCreateAuthorization(metadata: types.PayCreateAuthorizationMetadataParam): Promise<FetchResponse<200, types.PayCreateAuthorizationResponse200>>;
  payCreateAuthorization(body?: types.PayCreateAuthorizationBodyParam | types.PayCreateAuthorizationMetadataParam, metadata?: types.PayCreateAuthorizationMetadataParam): Promise<FetchResponse<200, types.PayCreateAuthorizationResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/authorizations', 'post', body, metadata);
  }

  /**
   * Retrieve an authorization for a payment, have an amount greater than 0, and have a type.
   *
   * @summary Get a single authorization
   */
  payGetAuthorization(metadata: types.PayGetAuthorizationMetadataParam): Promise<FetchResponse<200, types.PayGetAuthorizationResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/authorizations/{authId}', 'get', metadata);
  }

  /**
   * Creates an authorization for a payment, have an amount greater than 0, and have a type.
   *
   * @summary Update an authorization
   */
  payUpdateAuthorization(body: types.PayUpdateAuthorizationBodyParam, metadata: types.PayUpdateAuthorizationMetadataParam): Promise<FetchResponse<number, unknown>>;
  payUpdateAuthorization(metadata: types.PayUpdateAuthorizationMetadataParam): Promise<FetchResponse<number, unknown>>;
  payUpdateAuthorization(body?: types.PayUpdateAuthorizationBodyParam | types.PayUpdateAuthorizationMetadataParam, metadata?: types.PayUpdateAuthorizationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/authorizations/{authId}', 'post', body, metadata);
  }

  /**
   * Deletes an authorization for a payment, have an amount greater than 0, and have a type.
   *
   * @summary Delete an authorization
   */
  payDeleteAuthorization(metadata: types.PayDeleteAuthorizationMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/authorizations/{authId}', 'delete', metadata);
  }

  /**
   * Retrieves payment information, including the total amount, tip amount, tax amount, and
   * result status.
   *
   * @summary Get all payments
   */
  payGetPayments(metadata: types.PayGetPaymentsMetadataParam): Promise<FetchResponse<200, types.PayGetPaymentsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/payments', 'get', metadata);
  }

  /**
   * Retrieve a single payment information, including the total amount, tip amount, tax
   * amount, and result status.
   *
   * @summary Get a single payment
   */
  payGetPayment(metadata: types.PayGetPaymentMetadataParam): Promise<FetchResponse<200, types.PayGetPaymentResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/payments/{payId}', 'get', metadata);
  }

  /**
   * This endpoint can only be used to update the following information:
   * 1. `lineItemPayments`
   * 2. `employee.id` (if the payment is a preauth with `captured` currently set to `null)`.
   *
   * All other properties in the request are ignored.
   *
   * @summary Update a payment
   */
  payUpdatePayment(body: types.PayUpdatePaymentBodyParam, metadata: types.PayUpdatePaymentMetadataParam): Promise<FetchResponse<number, unknown>>;
  payUpdatePayment(metadata: types.PayUpdatePaymentMetadataParam): Promise<FetchResponse<number, unknown>>;
  payUpdatePayment(body?: types.PayUpdatePaymentBodyParam | types.PayUpdatePaymentMetadataParam, metadata?: types.PayUpdatePaymentMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/payments/{payId}', 'post', body, metadata);
  }

  /**
   * Displays payment information, including the total amount, tip amount, tax amount, and
   * result status for an `employee`.
   *
   * @summary Get all payments under an employee
   */
  payGetEmployeePayments(metadata: types.PayGetEmployeePaymentsMetadataParam): Promise<FetchResponse<200, types.PayGetEmployeePaymentsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/employees/{empId}/payments', 'get', metadata);
  }

  /**
   * Displays refunds for a merchant associated with a payment, including taxes and tips.
   *
   * @summary Get all refunds for a merchant
   */
  payGetRefunds(metadata: types.PayGetRefundsMetadataParam): Promise<FetchResponse<200, types.PayGetRefundsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/refunds', 'get', metadata);
  }

  /**
   * Displays a single refund associated with a payment, including taxes and tips.
   *
   * @summary Get a single refund
   */
  payGetRefund(metadata: types.PayGetRefundMetadataParam): Promise<FetchResponse<200, types.PayGetRefundResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/refunds/{refundId}', 'get', metadata);
  }

  /**
   * Get a list of credits
   *
   */
  payGetCredits(metadata: types.PayGetCreditsMetadataParam): Promise<FetchResponse<200, types.PayGetCreditsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/credits', 'get', metadata);
  }

  /**
   * Get a single credit
   *
   */
  payGetCredit(metadata: types.PayGetCreditMetadataParam): Promise<FetchResponse<200, types.PayGetCreditResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/credits/{creditId}', 'get', metadata);
  }

  /**
   * Displays a list of credit refunds associated with a payment, including taxes and tips.
   *
   * @summary Get a list of credit refunds
   */
  payGetCreditRefunds(metadata: types.PayGetCreditRefundsMetadataParam): Promise<FetchResponse<200, types.PayGetCreditRefundsResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/credit_refunds', 'get', metadata);
  }

  /**
   * Displays a credit refund associated with a payment, including taxes and tips.
   *
   * @summary Get a credit refund
   */
  payGetCreditRefund(metadata: types.PayGetCreditRefundMetadataParam): Promise<FetchResponse<200, types.PayGetCreditRefundResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/credit_refunds/{crId}', 'get', metadata);
  }

  payGetStatus(metadata: types.PayGetStatusMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v3/merchants/{mId}/payments/{payId}/status', 'get', metadata);
  }

  /**
   * Retrieves the status of a merchant's app billing, including the current subscription
   * tier and trial status. Requires an [OAuth-generated
   * token](https://docs.clover.com/docs/using-oauth-20).
   *
   * @summary Get merchant app billing information
   */
  appsGetMerchantBillingInfo(metadata: types.AppsGetMerchantBillingInfoMetadataParam): Promise<FetchResponse<200, types.AppsGetMerchantBillingInfoResponse200>> {
    return this.core.fetch('/v3/apps/{appId}/merchants/{mId}/billing_info', 'get', metadata);
  }

  /**
   * Retrieves all billing events for app metered event types such as `reservation`. Requires
   * an OAuth-generated token. See [Set up
   * pricing](https://docs.clover.com/docs/configuring-billing#metered-pricing).
   *
   * @summary Get all events for an app metered event type
   */
  appsGetMerchantAppMeteredEvents(metadata: types.AppsGetMerchantAppMeteredEventsMetadataParam): Promise<FetchResponse<200, types.AppsGetMerchantAppMeteredEventsResponse200>> {
    return this.core.fetch('/v3/apps/{appId}/merchants/{mId}/metereds/{meteredId}', 'get', metadata);
  }

  /**
   * Creates an app billing metered event. Clover charges the merchant for each action they
   * take on the app based on the amount specified on the app's [Pricing &
   * Distribution](https://docs.clover.com/docs/configuring-billing#subscription-pricing)
   * page. Pass `count` as a query parameter to bill the merchant for the number of metered
   * events. `count` is ignored if you pass it in the request body. Otherwise, `count`
   * defaults to 1. Requires an OAuth-generated token. See [Set up pricing
   * tiers](https://docs.clover.com/docs/configuring-billing#metered-pricing).
   *
   * @summary Create an app billing metered event
   */
  appsCreateMerchantAppMeteredEvent(metadata: types.AppsCreateMerchantAppMeteredEventMetadataParam): Promise<FetchResponse<200, types.AppsCreateMerchantAppMeteredEventResponse200>> {
    return this.core.fetch('/v3/apps/{appId}/merchants/{mId}/metereds/{meteredId}', 'post', metadata);
  }

  /**
   * Retrieves the event details on a merchant's app billing metered event. Requires an
   * OAuth-generated token. See [Set up pricing
   * tiers](https://docs.clover.com/docs/configuring-billing#metered-pricing).
   *
   * @summary Get an app billing metered event
   */
  appsGetMerchantAppMeteredEvent(metadata: types.AppsGetMerchantAppMeteredEventMetadataParam): Promise<FetchResponse<200, types.AppsGetMerchantAppMeteredEventResponse200>> {
    return this.core.fetch('/v3/apps/{appId}/merchants/{mId}/metereds/{meteredId}/events/{eventId}', 'get', metadata);
  }

  /**
   * Deletes an app metered event if the event was not already billed. Requires an
   * [OAuth-generated token](https://docs.clover.com/docs/using-oauth-20).
   *
   * @summary Delete app billing metered event
   */
  appsDeleteMerchantAppMeteredEvent(metadata: types.AppsDeleteMerchantAppMeteredEventMetadataParam): Promise<FetchResponse<200, types.AppsDeleteMerchantAppMeteredEventResponse200>> {
    return this.core.fetch('/v3/apps/{appId}/merchants/{mId}/metereds/{meteredId}/events/{eventId}', 'delete', metadata);
  }

  /**
   * Submits the `Printrequest` associated with the specific `merchantid`.
   *
   * @summary Submit a print request to the merchant's default order printer
   */
  orderCreatePrintEvent(body: types.OrderCreatePrintEventBodyParam, metadata: types.OrderCreatePrintEventMetadataParam): Promise<FetchResponse<200, types.OrderCreatePrintEventResponse200>>;
  orderCreatePrintEvent(metadata: types.OrderCreatePrintEventMetadataParam): Promise<FetchResponse<200, types.OrderCreatePrintEventResponse200>>;
  orderCreatePrintEvent(body?: types.OrderCreatePrintEventBodyParam | types.OrderCreatePrintEventMetadataParam, metadata?: types.OrderCreatePrintEventMetadataParam): Promise<FetchResponse<200, types.OrderCreatePrintEventResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/print_event', 'post', body, metadata);
  }

  /**
   * Returns the `PrintOrder` associated with the specified `eventId`. A complete response,
   * which contains the printing device, print category, and job state, is returned If the
   * state of the print event is CREATED, PRINTING, or FAILED. Once the job is successfully
   * printed, it is discarded and cannot be replayed.
   *
   * @summary Get a print event by its ID
   */
  orderGetPrintEvent(metadata: types.OrderGetPrintEventMetadataParam): Promise<FetchResponse<200, types.OrderGetPrintEventResponse200>> {
    return this.core.fetch('/v3/merchants/{mId}/print_event/{eventId}', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { AppsCreateDeviceAppNotificationBodyParam, AppsCreateDeviceAppNotificationMetadataParam, AppsCreateMerchantAppMeteredEventMetadataParam, AppsCreateMerchantAppMeteredEventResponse200, AppsCreateMerchantAppNotificationBodyParam, AppsCreateMerchantAppNotificationMetadataParam, AppsDeleteMerchantAppMeteredEventMetadataParam, AppsDeleteMerchantAppMeteredEventResponse200, AppsGetMerchantAppMeteredEventMetadataParam, AppsGetMerchantAppMeteredEventResponse200, AppsGetMerchantAppMeteredEventsMetadataParam, AppsGetMerchantAppMeteredEventsResponse200, AppsGetMerchantBillingInfoMetadataParam, AppsGetMerchantBillingInfoResponse200, CashGetAllCashEventsMetadataParam, CashGetAllCashEventsResponse200, CashGetDeviceCashEventsMetadataParam, CashGetDeviceCashEventsResponse200, CashGetEmployeeCashEventsMetadataParam, CashGetEmployeeCashEventsResponse200, CategoryBulkDeleteCategoriesMetadataParam, CategoryCreateCategoryBodyParam, CategoryCreateCategoryMetadataParam, CategoryCreateOrDeleteCategoryItemsMetadataParam, CategoryCreateOrDeleteCategoryItemsResponse200, CategoryDeleteCategoryMetadataParam, CategoryGetCategoriesMetadataParam, CategoryGetCategoriesResponse200, CategoryGetCategoryItemsMetadataParam, CategoryGetCategoryItemsResponse200, CategoryGetCategoryMetadataParam, CategoryGetCategoryResponse200, CategoryGetItemCategoriesMetadataParam, CategoryGetItemCategoriesResponse200, CategoryUpdateCategoryBodyParam, CategoryUpdateCategoryMetadataParam, CategoryUpdateCategorySortOrdersBodyParam, CategoryUpdateCategorySortOrdersMetadataParam, CustomersCreateCustomerAddressBodyParam, CustomersCreateCustomerAddressMetadataParam, CustomersCreateCustomerBodyParam, CustomersCreateCustomerCardBodyParam, CustomersCreateCustomerCardMetadataParam, CustomersCreateCustomerEmailAddressBodyParam, CustomersCreateCustomerEmailAddressMetadataParam, CustomersCreateCustomerMetadataParam, CustomersCreateCustomerPhoneNumberBodyParam, CustomersCreateCustomerPhoneNumberMetadataParam, CustomersCreateCustomerResponse200, CustomersCreateOrUpdateCustomerMetadataBodyParam, CustomersCreateOrUpdateCustomerMetadataMetadataParam, CustomersDeleteCustomerAddressMetadataParam, CustomersDeleteCustomerCardMetadataParam, CustomersDeleteCustomerEmailAddressMetadataParam, CustomersDeleteCustomerMetadataParam, CustomersDeleteCustomerPhoneNumberMetadataParam, CustomersGetCustomerMetadataParam, CustomersGetCustomerResponse200, CustomersGetCustomersMetadataParam, CustomersGetCustomersResponse200, CustomersUpdateCustomerAddressBodyParam, CustomersUpdateCustomerAddressMetadataParam, CustomersUpdateCustomerBodyParam, CustomersUpdateCustomerCardBodyParam, CustomersUpdateCustomerCardMetadataParam, CustomersUpdateCustomerEmailAddressBodyParam, CustomersUpdateCustomerEmailAddressMetadataParam, CustomersUpdateCustomerMetadataParam, CustomersUpdateCustomerPhoneNumberBodyParam, CustomersUpdateCustomerPhoneNumberMetadataParam, CustomersUpdateCustomerResponse200, DeviceGetMerchantDeviceMetadataParam, DeviceGetMerchantDeviceResponse200, DeviceGetMerchantDevicesMetadataParam, DeviceGetMerchantDevicesResponse200, EmployeeCreateEmployeeBodyParam, EmployeeCreateEmployeeMetadataParam, EmployeeCreateShiftBodyParam, EmployeeCreateShiftMetadataParam, EmployeeDeleteEmployeeMetadataParam, EmployeeDeleteShiftMetadataParam, EmployeeGetEmployeeMetadataParam, EmployeeGetEmployeeOrdersMetadataParam, EmployeeGetEmployeeOrdersResponse200, EmployeeGetEmployeeResponse200, EmployeeGetEmployeeShiftMetadataParam, EmployeeGetEmployeeShiftResponse200, EmployeeGetEmployeeShiftsMetadataParam, EmployeeGetEmployeeShiftsResponse200, EmployeeGetEmployeesMetadataParam, EmployeeGetEmployeesResponse200, EmployeeUpdateEmployeeBodyParam, EmployeeUpdateEmployeeMetadataParam, EmployeeUpdateShiftBodyParam, EmployeeUpdateShiftMetadataParam, HandlerGetVoidedLineItemsTotalsMetadataParam, HandlerGetVoidedLineItemsTotalsResponse200, HandlersGetCustomersCsvMetadataParam, HandlersGetCustomersCsvResponse200, InventoryBulkCreateInventoryItemsBodyParam, InventoryBulkCreateInventoryItemsMetadataParam, InventoryBulkCreateInventoryItemsResponse200, InventoryBulkDeleteItemsMetadataParam, InventoryBulkPatchInventoryItemsBodyParam, InventoryBulkPatchInventoryItemsMetadataParam, InventoryBulkPatchInventoryItemsResponse200, InventoryCreateAttributeBodyParam, InventoryCreateAttributeMetadataParam, InventoryCreateDiscountBodyParam, InventoryCreateDiscountMetadataParam, InventoryCreateItemBodyParam, InventoryCreateItemGroupBodyParam, InventoryCreateItemGroupMetadataParam, InventoryCreateItemMetadataParam, InventoryCreateOptionBodyParam, InventoryCreateOptionMetadataParam, InventoryCreateOrDeleteOptionItemsMetadataParam, InventoryCreateOrDeleteOptionItemsResponse200, InventoryDeleteAttributeMetadataParam, InventoryDeleteDiscountMetadataParam, InventoryDeleteItemGroupMetadataParam, InventoryDeleteItemMetadataParam, InventoryDeleteItemStockMetadataParam, InventoryDeleteOptionMetadataParam, InventoryGetAttributeMetadataParam, InventoryGetAttributeResponse200, InventoryGetAttributesMetadataParam, InventoryGetAttributesResponse200, InventoryGetDiscountMetadataParam, InventoryGetDiscountResponse200, InventoryGetDiscountsMetadataParam, InventoryGetDiscountsResponse200, InventoryGetItemGroupMetadataParam, InventoryGetItemGroupResponse200, InventoryGetItemGroupsMetadataParam, InventoryGetItemGroupsResponse200, InventoryGetItemMetadataParam, InventoryGetItemStockMetadataParam, InventoryGetItemStocksMetadataParam, InventoryGetItemsMetadataParam, InventoryGetItemsNoRevenueClassMetadataParam, InventoryGetOptionByIdMetadataParam, InventoryGetOptionByIdResponse200, InventoryGetOptionsByAttributeMetadataParam, InventoryGetOptionsByAttributeResponse200, InventoryGetOptionsMetadataParam, InventoryGetOptionsResponse200, InventoryUpdateAttributeBodyParam, InventoryUpdateAttributeMetadataParam, InventoryUpdateDiscountBodyParam, InventoryUpdateDiscountMetadataParam, InventoryUpdateItemBodyParam, InventoryUpdateItemGroupBodyParam, InventoryUpdateItemGroupMetadataParam, InventoryUpdateItemMetadataParam, InventoryUpdateItemResponse200, InventoryUpdateItemStockBodyParam, InventoryUpdateItemStockMetadataParam, InventoryUpdateOptionBodyParam, InventoryUpdateOptionMetadataParam, LineitemGetVoidedOrderLineItemsMetadataParam, LineitemGetVoidedOrderLineItemsResponse200, MerchantCreateMerchantOpeningHoursBodyParam, MerchantCreateMerchantOpeningHoursMetadataParam, MerchantCreateMerchantOpeningHoursResponse200, MerchantCreateOrderTypeBodyParam, MerchantCreateOrderTypeMetadataParam, MerchantDeleteMerchantOpeningHoursMetadataParam, MerchantDeleteOrderTypeMetadataParam, MerchantGetAllMerchantOpeningHoursMetadataParam, MerchantGetAllMerchantOpeningHoursResponse200, MerchantGetAllShiftsCsvMetadataParam, MerchantGetAllShiftsMetadataParam, MerchantGetAllShiftsResponse200, MerchantGetDefaultServiceChargeMetadataParam, MerchantGetDefaultServiceChargeResponse200, MerchantGetMerchantAddressMetadataParam, MerchantGetMerchantAddressResponse200, MerchantGetMerchantGatewayMetadataParam, MerchantGetMerchantGatewayResponse200, MerchantGetMerchantMetadataParam, MerchantGetMerchantOpeningHoursMetadataParam, MerchantGetMerchantOpeningHoursResponse200, MerchantGetMerchantPropertiesMetadataParam, MerchantGetMerchantPropertiesResponse200, MerchantGetMerchantResponse200, MerchantGetOrderTypeMetadataParam, MerchantGetOrderTypeResponse200, MerchantGetOrderTypesMetadataParam, MerchantGetOrderTypesResponse200, MerchantGetShiftMetadataParam, MerchantGetShiftResponse200, MerchantGetSystemOrderTypesMetadataParam, MerchantGetSystemOrderTypesResponse200, MerchantGetTipSuggestionMetadataParam, MerchantGetTipSuggestionResponse200, MerchantGetTipSuggestionsMetadataParam, MerchantGetTipSuggestionsResponse200, MerchantUpdateMerchantBodyParam, MerchantUpdateMerchantMetadataParam, MerchantUpdateMerchantOpeningHoursBodyParam, MerchantUpdateMerchantOpeningHoursMetadataParam, MerchantUpdateMerchantOpeningHoursResponse200, MerchantUpdateMerchantPropertiesBodyParam, MerchantUpdateMerchantPropertiesMetadataParam, MerchantUpdateOrderTypeBodyParam, MerchantUpdateOrderTypeMetadataParam, MerchantUpdateTipSuggestionBodyParam, MerchantUpdateTipSuggestionMetadataParam, ModifierBulkDeleteModifierGroupsMetadataParam, ModifierCreateModifierBodyParam, ModifierCreateModifierGroupBodyParam, ModifierCreateModifierGroupMetadataParam, ModifierCreateModifierMetadataParam, ModifierCreateOrDeleteItemModifierGroupsBodyParam, ModifierCreateOrDeleteItemModifierGroupsMetadataParam, ModifierCreateOrDeleteItemModifierGroupsResponse200, ModifierDeleteModifierGroupMetadataParam, ModifierDeleteModifierMetadataParam, ModifierGetModifierGroupItemsMetadataParam, ModifierGetModifierGroupItemsResponse200, ModifierGetModifierGroupMetadataParam, ModifierGetModifierGroupResponse200, ModifierGetModifierGroupsMetadataParam, ModifierGetModifierGroupsResponse200, ModifierGetModifierMetadataParam, ModifierGetModifierResponse200, ModifierGetModifiersByGroupMetadataParam, ModifierGetModifiersByGroupResponse200, ModifierGetModifiersMetadataParam, ModifierGetModifiersResponse200, ModifierReorderModifiersBodyParam, ModifierReorderModifiersMetadataParam, ModifierReorderModifiersResponse200, ModifierUpdateModifierBodyParam, ModifierUpdateModifierGroupBodyParam, ModifierUpdateModifierGroupMetadataParam, ModifierUpdateModifierGroupSortOrdersBodyParam, ModifierUpdateModifierGroupSortOrdersMetadataParam, ModifierUpdateModifierMetadataParam, OrderApplyModificationBodyParam, OrderApplyModificationMetadataParam, OrderApplyServiceChargeBodyParam, OrderApplyServiceChargeMetadataParam, OrderBulkCreateLineItemsBodyParam, OrderBulkCreateLineItemsMetadataParam, OrderBulkCreateLineItemsResponse200, OrderCheckoutAtomicOrderBodyParam, OrderCheckoutAtomicOrderMetadataParam, OrderCheckoutAtomicOrderResponse200, OrderCreateAtomicOrderBodyParam, OrderCreateAtomicOrderMetadataParam, OrderCreateAtomicOrderResponse200, OrderCreateDiscountBodyParam, OrderCreateDiscountMetadataParam, OrderCreateLineItemBodyParam, OrderCreateLineItemDiscountBodyParam, OrderCreateLineItemDiscountMetadataParam, OrderCreateLineItemMetadataParam, OrderCreateOrDeleteOrderTypeCategoriesMetadataParam, OrderCreateOrDeleteOrderTypeCategoriesResponse200, OrderCreateOrderBodyParam, OrderCreateOrderMetadataParam, OrderCreatePaymentForOrderBodyParam, OrderCreatePaymentForOrderMetadataParam, OrderCreatePrintEventBodyParam, OrderCreatePrintEventMetadataParam, OrderCreatePrintEventResponse200, OrderDeleteLineItemsMetadataParam, OrderDeleteOrderLineItemMetadataParam, OrderDeleteOrderMetadataParam, OrderDeleteOrderWithReasonHandlerMetadataParam, OrderGetOrderDiscountsMetadataParam, OrderGetOrderDiscountsResponse200, OrderGetOrderLineItemMetadataParam, OrderGetOrderLineItemResponse200, OrderGetOrderLineItemsMetadataParam, OrderGetOrderLineItemsResponse200, OrderGetOrderMetadataParam, OrderGetOrderResponse200, OrderGetOrdersMetadataParam, OrderGetOrdersResponse200, OrderGetPrintEventMetadataParam, OrderGetPrintEventResponse200, OrderRemoveDiscountMetadataParam, OrderRemoveModificationMetadataParam, OrderRemoveOrderDiscountMetadataParam, OrderRemoveServiceChargeMetadataParam, OrderSetOrderLineItemBodyParam, OrderSetOrderLineItemMetadataParam, OrderUpdateOrderBodyParam, OrderUpdateOrderLineItemBodyParam, OrderUpdateOrderLineItemMetadataParam, OrderUpdateOrderMetadataParam, OrderVoidOrderLineItemBodyParam, OrderVoidOrderLineItemMetadataParam, PayCreateAuthorizationBodyParam, PayCreateAuthorizationMetadataParam, PayCreateAuthorizationResponse200, PayCreateMerchantTenderBodyParam, PayCreateMerchantTenderMetadataParam, PayCreateMerchantTenderResponse200, PayDeleteAuthorizationMetadataParam, PayDeleteMerchantTenderMetadataParam, PayGetAuthorizationMetadataParam, PayGetAuthorizationResponse200, PayGetAuthorizationsMetadataParam, PayGetAuthorizationsResponse200, PayGetCreditMetadataParam, PayGetCreditRefundMetadataParam, PayGetCreditRefundResponse200, PayGetCreditRefundsMetadataParam, PayGetCreditRefundsResponse200, PayGetCreditResponse200, PayGetCreditsMetadataParam, PayGetCreditsResponse200, PayGetEmployeePaymentsMetadataParam, PayGetEmployeePaymentsResponse200, PayGetMerchantTenderMetadataParam, PayGetMerchantTenderResponse200, PayGetMerchantTendersMetadataParam, PayGetMerchantTendersResponse200, PayGetOrderPaymentsMetadataParam, PayGetOrderPaymentsResponse200, PayGetPaymentMetadataParam, PayGetPaymentResponse200, PayGetPaymentsMetadataParam, PayGetPaymentsResponse200, PayGetRefundMetadataParam, PayGetRefundResponse200, PayGetRefundsMetadataParam, PayGetRefundsResponse200, PayGetStatusMetadataParam, PayUpdateAuthorizationBodyParam, PayUpdateAuthorizationMetadataParam, PayUpdateMerchantTenderBodyParam, PayUpdateMerchantTenderMetadataParam, PayUpdatePaymentBodyParam, PayUpdatePaymentMetadataParam, RoleCreateRoleBodyParam, RoleCreateRoleMetadataParam, RoleDeleteRoleMetadataParam, RoleGetRoleMetadataParam, RoleGetRoleResponse200, RoleGetRolesMetadataParam, RoleGetRolesResponse200, RoleUpdateRoleBodyParam, RoleUpdateRoleMetadataParam, SyncGetSyncTokenMetadataParam, TagBulkDeleteTagsMetadataParam, TagCreateOrDeleteTagItemsMetadataParam, TagCreateOrDeleteTagItemsResponse200, TagCreateTagBodyParam, TagCreateTagMetadataParam, TagDeleteTagMetadataParam, TagGetItemTagsMetadataParam, TagGetItemTagsResponse200, TagGetTagItemsMetadataParam, TagGetTagItemsResponse200, TagGetTagMetadataParam, TagGetTagResponse200, TagGetTaggedItemsMetadataParam, TagGetTaggedItemsResponse200, TagGetTagsMetadataParam, TagGetTagsResponse200, TagUpdateTagBodyParam, TagUpdateTagMetadataParam, TaxrateCreateOrDeleteTaxRateItemsBodyParam, TaxrateCreateOrDeleteTaxRateItemsMetadataParam, TaxrateCreateOrDeleteTaxRateItemsResponse200, TaxrateCreateTaxRateBodyParam, TaxrateCreateTaxRateMetadataParam, TaxrateCreateTaxRateResponse200, TaxrateDeleteTaxRateMetadataParam, TaxrateGetItemsByTaxRateMetadataParam, TaxrateGetItemsByTaxRateResponse200, TaxrateGetTaxRateMetadataParam, TaxrateGetTaxRateResponse200, TaxrateGetTaxRatesMetadataParam, TaxrateGetTaxRatesResponse200, TaxrateUpdateTaxRateBodyParam, TaxrateUpdateTaxRateMetadataParam, TaxrulesGetTaxRuleMetadataParam, TaxrulesGetTaxRuleResponse200, TaxrulesGetTaxRulesMetadataParam, TaxrulesGetTaxRulesResponse200 } from './types';
