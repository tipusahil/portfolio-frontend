"use client";

import { trackMetaEvent } from "@/lib/facebook-conversion-api-and-pixel-setup-folder-1/trackEvent";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ContactForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Lead event track করছি
    trackMetaEvent({
      eventName: "Lead",
      userData: {
        email: formData.email,
        phone: formData.phone,
      },
      customData: {
        content_name: "Contact Form",
        content_category: "lead_generation",
      },
    });

    // TODO: আপনার backend API call করুন
    // await fetch("/api/submit-form", { method: "POST", body: JSON.stringify(formData) });

    // ✅ Thank you page এ redirect (যেখানে CompleteRegistration fire হবে)
    router.push("/thank-you");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Contact Us</h2>

      <input
        type="text"
        placeholder="Your Name"
        required
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        placeholder="Your Email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <input
        type="tel"
        placeholder="Your Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <textarea
        placeholder="Your Message"
        required
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full p-2 border rounded h-32"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;