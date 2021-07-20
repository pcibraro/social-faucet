
import type { TransactionResponse } from '../pages/types'

async function submitTransaction(address: string) : Promise<TransactionResponse> {
    const response = await fetch('/api/faucet', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            address: address
        })
    });

    if(response.ok) {
        const transaction = await response.json();
        return transaction;
    }
    else {
        return {
            successful : false,
            error: response.statusText
        }
    }
}

export {
    submitTransaction
};