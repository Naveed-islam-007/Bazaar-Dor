"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("পাসওয়ার্ড মিলছে না");
      return;
    }

   const { error } = await authClient.signUp.email({
  name,
  email,
  password,
});

if (error) {
  alert(error.message);
  return;
}

window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center pt-8">
      <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="text-sm text-gray-500 mb-6">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      <div className="w-80 bg-white border rounded-2xl p-5">
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label htmlFor="name" className="text-sm">নাম</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="যেমন: রহিম উদ্দিন"
            className="border rounded-md p-2 text-sm"
          />

          <label htmlFor="email" className="text-sm">ইমেইল</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="border rounded-md p-2 text-sm"
          />

          <label htmlFor="password" className="text-sm">পাসওয়ার্ড</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="border rounded-md p-2 text-sm"
          />

          <label htmlFor="confirmPassword" className="text-sm">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            placeholder="আবার লিখুন"
            className="border rounded-md p-2 text-sm"
          />

          <button
            type="submit"
            className="bg-green-600 text-white rounded-md p-2 mt-2"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-green-600">সাইন ইন করুন</Link>
        </p>
      </div>

      <Link href="/" className="text-sm text-gray-500 mt-6">← হোম পেজে ফিরে যান</Link>
    </div>
  );
};

export default SignUp;