import React from 'react';
// import Axios from 'axios';
import { createCheckoutService } from '@bigcommerce/checkout-sdk';

function TiloForm() {
    // const url = "https://app.tilopay.com/api/v1/processPayment";
    // const access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcHAudGlsb3BheS5jb21cL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjQ1NDQyNzAxLCJleHAiOjE2NDU1MjkxMDEsIm5iZiI6MTY0NTQ0MjcwMSwianRpIjoiUHdXejRVYW5MUWxCVGJvOSIsInN1YiI6Njc4NywicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.u97e70xDhA0PqoFCDe_1HsvK2PU0DxTqVhjb_WUmKy8';
    // const headers = {
    //     'Authorization': 'bearer ' + access_token,
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    // };

    async function submit(e:any) {
        e.preventDefault();

        const service = createCheckoutService();
        const state = await service.loadCheckout();

        const checkout = state.data.getCheckout();
        const cart = state.data.getCart();
        const billing_address = state.data.getBillingAddress();

        const checkout_data = {
            redirect: "https://tilopay-testing.mybigcommerce.com/order-confirmation",
            key: "3834-6753-1983-4213-6017",
            amount: checkout?.grandTotal,
            currency: cart?.currency?.code,
            billToFirstName: billing_address?.firstName,
            billToLastName: billing_address?.lastName,
            billToAddress: billing_address?.address1,
            billToAddress2: billing_address?.address2,
            billToCity: billing_address?.city,
            billToState: billing_address?.stateOrProvince,
            billToZipPostCode: billing_address?.postalCode,
            billToCountry: billing_address?.countryCode,
            billToTelephone: billing_address?.phone,
            billToEmail: billing_address?.email,
            orderNumber: checkout?.id,
            capture: "1",
            subscription: "0"
        };

        console.log(checkout_data);

        // Axios.post(url, checkout_data, { headers: headers })
        // .then(res => {
        //     console.log(res.data);
        //     let payment_url = res.data.url;
        //     location.replace(payment_url);
        // })
        // .catch(error => console.log(error));
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input type="submit" value="Pay with Tilo" className="button button--action button--large button--slab optimizedCheckout-buttonPrimary"></input>
            </form>
        </div>
    );
}

export default TiloForm;
