'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const PaymentSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

    const handleOnclick = () => {
        router.push(`userProfile?id=${userId}`);
    };

    return (
        <div className="bg-gray-900 h-screen flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-full max-w-lg mx-4">
                <div className="flex justify-center items-center mb-4">
                    <AiOutlineCloseCircle size={64} className="text-red-500" />
                </div>
                <h1 className="text-white text-3xl font-semibold mb-2">Payment Unsuccessful</h1>
                <p className="text-gray-400 mb-6 text-lg">Oops, something went wrong while processing your payment.</p>

                <div className="bg-gray-700 p-6 rounded-lg mb-6 shadow-lg text-gray-300">
                    <p className="text-lg font-semibold mb-1">Activation Failed</p>
                    <p>We couldn’t upgrade your account to Premium at this time. Please try again or contact support if the problem persists.</p>
                </div>

                <button
                    onClick={handleOnclick}
                    className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-teal-600 transition-colors"
                >
                    Return to Your Profile
                </button>

                <p className="text-gray-400 mt-8 text-sm">
                    Need help?{' '}
                    <a href="/support" className="text-teal-400 hover:underline">
                        Contact Support
                    </a>
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
