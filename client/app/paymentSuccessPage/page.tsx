'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const PaymentSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const txnid = searchParams.get('transactionId');
    const amount = searchParams.get('amountPaid');
    const bankRefNum = searchParams.get('bankRefNum');

    const handleOnclick = () => {
        router.push(`userProfile?id=${userId}`);
    };

    return (
        <div className="bg-black h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-96">
                <h1 className="text-white text-3xl font-semibold mb-4">Payment Successful!</h1>
                <p className="text-gray-300 mb-6">Thank you for your purchase! Your payment has been successfully processed.</p>

                <div className="bg-gray-700 p-4 rounded-lg mb-6">
                    <p className="text-green-400 text-lg font-medium">Transaction ID</p>
                    <p className="text-gray-300 text-sm">{txnid}</p>
                </div>

                <div className="text-left text-gray-300 mb-6">
                    <p className="mb-2"><span className="font-semibold">Premium account activated</span></p>
                    <p className="mb-2"><span className="font-semibold">Amount Paid: {amount}</span> </p>
                    <p className="mb-2"><span className="font-semibold">Bank reference number:  {bankRefNum}</span> </p>
        
                </div>

                <button
                    onClick={handleOnclick}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                    Go to Your Profile
                </button>

               
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
