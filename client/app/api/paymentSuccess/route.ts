import { USER_SERVICE_URL } from "@/utils/constants";
import axios from "axios";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function POST(req: any, res: NextApiResponse) {
  console.log('reached suuccesssss');
  
  const contentType = req.headers.get("content-type") || "";

  const formData = await req.formData();

  const data: { [key: string]: any } = {};
  formData.forEach((value: any, key: string) => {
    data[key] = value;
  });
console.log(data);

  let response = await axios.post(`${USER_SERVICE_URL}/paymentSuccess`, data, {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  })

  const { productinfo } = data;
  console.log(productinfo);
  const redirectUrl = `/paymentSuccessPage?userId=${productinfo}&transactionId=${data.txnid}&amountPaid=${data.amount}&bankRefNum=${data.bank_ref_num}`;

  redirect(redirectUrl);
}