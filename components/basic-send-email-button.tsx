"use client";

import sendEmail from "@/actions/emails/send-email";

export default function BasicSendEmailButton() {
  const handleSendEmail = async () => {
    await sendEmail();
  };

  return (
    <button onClick={handleSendEmail} className="btn btn-primary">
      Send Email
    </button>
  );
}
