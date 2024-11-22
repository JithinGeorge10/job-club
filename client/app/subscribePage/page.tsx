'use client';
import React, { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { USER_SERVICE_URL } from '@/utils/constants';

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
    const salt = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDAVarpYtcbh2DK8W7yrJcTEdlMIjUmpMRoz0JyMK/0frzx14Yk1LbqJ8+jhM97yyB/3iJJrJZrQX2+MfiMfmWOpnHvEO023hZaJ+mK7Tv9HjfrKoz8RTjLtp4Syv2zOex9YkHbSzySL9OweDWWM6f9oK/uaoVFRtkw6o5+RsB8tkdetXaA8o2vz+Ga5PnMisQyiYMBBT0K/zrJsIiUEPIE+JjWGLqmsP7p9Q9Lp42f2g2KMWEV9dYWwkwh9kysEzZGKrKiTIn7co/47ss39n/CIY3gJWYfHYhkcnikklG9GV58r+iy4MJD4TSMSV4ODBKtVgLZJK43CtetzNOLh0/hAgMBAAECggEAM7mWSkfLo9qnnEyL0vW5d2ZwcvosIyVisPE0ZHNVjsJa3AtjRxpxys1EGSzJg/hf2COMQxYIKfYl8/WKa3Y+p7t5npqFwSC/ECX1t+gPHwZ2cWczHVEcciS9pD41NnMYd6vqHCjCtGnqW2YouylPP3VsewjoqHXiSTZ7ddhfQepoMo6b2/cHUcYvCdcIlhM5oi4J+OsdH+gcHsxQsjme/Q34nGVToQkzINhmEfq2SMfd39P7rSHOpyJW/L90BKb/uOpsrsbKRI5C3VyYjpHdh1qqCMvboP0e+qf04Tsph2M3D2cDMavSjWHJM8hCkp3ffTs6nCIjTBnyAYuQKNbedQKBgQDfZ+sBH7SEZB77MoggE4YVn5DZMwbs3max7+ffYKXsX2B1H1FA6vnUGgQDqVZ7sOXak+7XrM1QrsfS937AaSzD0TYH+D+CEJSQr6gCspbqbr+ZRe1DDvzLuD60DBbeYUUK8ITp0+auqixvhDoaMfT3oYESQvPgXquFXRR48UJxIwKBgQDcZUFD+PwaoGvo64zC/WOtsl0+2DBHJ2vtrvGdH3TSvfewS155p8aAyLcQRsjPEYkKOWkFLNRlfvin64ZHivjb7/bdoQJ0yl4SLIoqRUih9Yjy8J1Piky/aBTsiUJ1bYKEHAy/CfwQLyHxuwrUcQzkpjSpIkHV37ugDz+dBM7lKwKBgQCFROGMxxQRkgRlRyyrLdpj1c87slPkQ3uxk/KXb3kre234EFmRR1sHKwnQAVlk6g8ECBGHuT61bb4oXJnRQCyDF6+Kq41/ElL9yLuJ+G1MpgpH7c3unecxw9Qr5bZSrGXac8ZmEpFfCob9czyR2dFPU5nCggwngXICWZdX2lwPTwKBgEtXwgv+nhBsLvedLq2p+d1zUDUfqsFoVJkYaTiRfFpe3sHBwjZMiKuV8h76U8OV9wcrwR8nyCQ6V77v4SOr+o8VZYs2c6SBWc9UspbowH+9dGe4oc6DNOFqL1z9P17tZOTMwf685xKRSkVc78LYMtQnjXEUaPU4WufIzrJa5m+pAoGBAJHr7PzQSlYQbwp7hsjPADoegnsH84IoLT0FjRQfiNqYG8rJNZRnm07Cgo2du321mpBSLxwpNI3oDYneOr0cnXGP+0ttBHgloF5tlsmPbV77PhwBat0ytGLGxuiasRwjP5lNrzu+kKal5Kg7yoA6iJ4NShrzeTFR1zQSZ8rN/f4Q';

    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${userEmail}|${udf1}|${udf2}|${udf3}|${udf4}|${udf5}||||||${salt}`;
    const generatedHash = CryptoJS.SHA512(hashString).toString();

    setHash(generatedHash);
  }, [txnid]);

  const handlePayment = async () => {
    const response = await axios.post(`${USER_SERVICE_URL}/start-payment`, { userId }, {
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
      surl: `http://localhost:3000/api/paymentSuccess`,
      furl: `http://localhost:3000/api/paymentFailure`,
      phone: phone,
      hash: hash,
    };

    const form = document.createElement('form');
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
