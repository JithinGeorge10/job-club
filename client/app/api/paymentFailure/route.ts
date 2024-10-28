import { NextApiResponse } from "next";
import { redirect } from "next/navigation";

export async function POST(req: any, res: NextApiResponse) {
  const contentType = req.headers.get("content-type") || "";
  console.log({ contentType });

  const formData = await req.formData();

  const data: { [key: string]: any } = {};
  formData.forEach((value: any, key: string) => {
    data[key] = value;
  });
  console.log(data)
  const { productinfo } = data;

  const redirectUrl = `/paymentFailurePage?userId=${productinfo}`;
  redirect(redirectUrl);
}