'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';


const PaymentSuccessPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const handleOnclick=()=>{
            router.push(`userProfile?id=${userId}`)
    }
    return (
        <div>
            <h1>Successfull</h1>
            <button onClick={handleOnclick}>Go to userProfile</button>
        </div>
    );
};

export default PaymentSuccessPage;
