'use client';
import { useSearchParams } from 'next/navigation';

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams();


    const userId = searchParams.get('userId');

    return (
        <div>
            <h1>Payment {userId}</h1>

        </div>
    );
};

export default PaymentSuccessPage;
