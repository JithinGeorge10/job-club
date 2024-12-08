'use client';
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { USER_SERVICE_URL, PAYU_MERCHANT_KEY, PAYU_MERCHANT_SALT, PUBLIC_PAYMENT_SUCCESS_URL, PUBLIC_PAYMENT_FAILURE_URL } from '@/utils/constants';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const userId = searchParams.get('userId');

  const [hash, setHash] = useState('');
  const [txnid, setTxnid] = useState('');

  const generateTxnid = () => 'txn' + new Date().getTime();

  useEffect(() => {
    setTxnid(generateTxnid());
  }, []);

  useEffect(() => {
    if (!txnid) return;



    const key = 'hLAGgn';
    const amount = '999';
    const productinfo = userId;
    const firstname = firstName || '';
    const userEmail = email || '';
    const udf1 = '';
    const udf2 = '';
    const udf3 = '';
    const udf4 = '';
    const udf5 = '';
    const salt = 'r9i1EoMfQy968ezHT4wch5ouStEp8o1l'

    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${userEmail}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
    const generatedHash = CryptoJS.SHA512(hashString).toString();

    setHash(generatedHash);
  }, [txnid]);

  const handlePayment = async () => {
    const response = await axios.post(`${USER_SERVICE_URL}/start-payment`, { userId,txnid }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });



    const formData = {
      key: 'hLAGgn',
      txnid: txnid,
      productinfo: userId,
      amount: '999',
      email: email,
      firstname: firstName,
      lastname: lastName,
      surl: 'https://jobclub.live/api/paymentSuccess',
      furl: 'https://jobclub.live/api/paymentFailure',
      phone: phone,
      hash: hash,
    };

    const form = document.createElement('form');
    console.log(form)
    form.method = 'POST';
    form.action = 'https://test.payu.in/_payment';
 

    Object.keys(formData).forEach((key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = formData[key as keyof typeof formData] || '';
      form.appendChild(input);
    });


    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-[#252424] p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h2 className="text-white text-2xl font-bold mb-4">Upgrade to Premium</h2>
        <p className="text-gray-300 text-lg mb-6">Get exclusive access to premium features for only <span className="text-green-400">₹999</span>!</p>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-gray-400 mb-2">What you get:</p>

          <ul className="text-gray-300 text-sm space-y-2">
            <li>✅ Direct Chat with Company HR</li>
            <li>✅ Priority Job Alerts</li>
            <li>✅ Access to Exclusive Job Openings</li>
            <li>✅ Profile Highlighting</li>
          </ul>
        </div>

        <button
          onClick={handlePayment}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-200"
        >
          Pay Now
        </button>
        <p className="text-gray-400 text-xs mt-4">Safe & Secure Payment Processing</p>
      </div>
    </div>
  );
};

export default PaymentPage;
