// pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="bg-[#0F0F0F] min-h-screen text-[#F9F9F9] px-6 py-12 font-sans">
      <div className="max-w-4xl mx-auto bg-[#1A1A1A] p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-[#FF6F3C] mb-6">Contact Us</h1>

        <p className="text-sm text-[#CCCCCC] mb-4">
          Have questions, feedback, or a support request? We’d love to hear from you. Fill out the form below or reach out via email, and someone from our team will respond within 24 hours.
        </p>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 rounded bg-[#2D2D2D] border border-[#444] text-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded bg-[#2D2D2D] border border-[#444] text-sm"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full px-4 py-2 rounded bg-[#2D2D2D] border border-[#444] text-sm"
          ></textarea>
          <button
            type="submit"
            className="bg-[#FF6F3C] hover:bg-[#e55a24] text-white font-semibold px-6 py-2 rounded"
          >
            Send Message
          </button>
        </form>

        <div className="mt-8 text-sm text-[#CCCCCC]">
          Or email us at: <a href="mailto:ashishyelisetty@gmail.com" className="underline text-[#FFC93C]">support@synqtransfer.com</a>
        </div>

        <footer className="pt-6 text-sm text-[#777] border-t border-[#2D2D2D] mt-8">
          &copy; {new Date().getFullYear()} SynqTransfer. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Contact;