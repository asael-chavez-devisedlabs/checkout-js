import { createCheckoutService } from '@bigcommerce/checkout-sdk';
import axios from 'axios';
import React from 'react';

function TiloForm() {
    const url = 'https://app.tilopay.com/api/v1/processPayment';
    const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAudGlsb3BheS5jb21cL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjQ1NDQyNzAxLCJleHAiOjE2NDU1MjkxMDEsIm5iZiI6MTY0NTQ0MjcwMSwianRpIjoiUHdXejRVYW5MUWxCVGJvOSIsInN1YiI6Njc4NywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.u97e70xDhA0PqoFCDe_1HsvK2PU0DxTqVhjb_WUmKy8';
    const headers = {
        Authorization: 'bearer ' + accessToken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    async function submit(e: any) {
        e.preventDefault();

        const service = createCheckoutService();
        const state = await service.loadCheckout();

        const checkout = state.data.getCheckout();
        const cart = state.data.getCart();
        const billingAddress = state.data.getBillingAddress();

        const checkoutData = {
            redirect: 'https://tilopay-testing.mybigcommerce.com/order-confirmation',
            key: '3834-6753-1983-4213-6017',
            amount: checkout?.grandTotal,
            currency: cart?.currency?.code,
            billToFirstName: billingAddress?.firstName,
            billToLastName: billingAddress?.lastName,
            billToAddress: billingAddress?.address1,
            billToAddress2: billingAddress?.address2,
            billToCity: billingAddress?.city,
            billToState: billingAddress?.stateOrProvince,
            billToZipPostCode: billingAddress?.postalCode,
            billToCountry: billingAddress?.countryCode,
            billToTelephone: billingAddress?.phone,
            billToEmail: billingAddress?.email,
            orderNumber: checkout?.id,
            capture: 1,
            subscription: 0,
        };

        axios.post(url, checkoutData, {headers})
        .then(res => {
            const paymentUrl = res.data.url;
            location.replace(paymentUrl);
        });
    }

    return (
        <div>
            <form onSubmit={ submit }>
                <input
                    className="button button--action button--large button--slab optimizedCheckout-buttonPrimary"
                    type="submit"
                    value="Pay with Tilo"
                />
            </form>
        </div>
    );
}

export default TiloForm;
