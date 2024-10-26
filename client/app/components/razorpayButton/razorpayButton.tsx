import React from "react";

const RazorpayButton: React.FC = () => {
  const handleRazorpayPayment = () => {
    const options: {
      key: string;
      amount: string;
      currency: string;
      description: string;
      image: string;
      prefill: {
        email: string;
        contact: string;
      };
      config: {
        display: {
          blocks: {
            utib: {
              name: string;
              instruments: {
                method: string;
                issuers?: string[];
                banks?: string[];
              }[];
            };
            other: {
              name: string;
              instruments: {
                method: string;
                issuers?: string[];
              }[];
            };
          };
          hide: { method: string }[];
          sequence: string[];
          preferences: {
            show_default_blocks: boolean;
          };
        };
      };
      handler: (response: { razorpay_payment_id: string }) => void;
      modal: {
        ondismiss: () => void;
      };
    } = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string, 
      amount: "1000", 
      currency: "INR",
      description: "Acme Corp",
      image: "https://example.com/image/rzp.jpg",
      prefill: {
        email: "Jithin.George@gmail.com",
        contact: "+919900000000",
      },
      config: {
        display: {
          blocks: {
            utib: {
              name: "Pay Using Axis Bank",
              instruments: [
                { method: "card", issuers: ["UTIB"] },
                { method: "netbanking", banks: ["UTIB"] },
              ],
            },
            other: {
              name: "Other Payment Methods",
              instruments: [
                { method: "card", issuers: ["ICIC"] },
                { method: "netbanking" },
              ],
            },
          },
          hide: [{ method: "upi" }],
          sequence: ["block.utib", "block.other"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },
      handler: (response) => {
        alert("Payment successful! Razorpay Payment ID: " + response.razorpay_payment_id);
      },
      modal: {
        ondismiss: () => {
          if (confirm("Are you sure you want to close the payment form?")) {
            console.log("Checkout form closed by the user.");
          } else {
            console.log("Please complete the payment.");
          }
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handleRazorpayPayment} className="btn btn-outline-dark btn-lg">
      <i className="fas fa-money-bill"></i> Own Checkout
    </button>
  );
};

export default RazorpayButton;
