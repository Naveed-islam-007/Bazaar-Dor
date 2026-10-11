"use client"

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const SignIn = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

   const { error } = await authClient.signIn.email({ email, password });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/";
  };

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center pt-8">
      <h1 className="text-2xl font-bold">সাইন ইন</h1>
      <p className="text-sm text-gray-500 mb-6">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      <div className="w-80 bg-white border rounded-2xl p-5">
        <form onSubmit={onSubmit}  className="flex flex-col gap-3">
          <label className="text-sm">ইমেইল</label>
          <input  name="email" type="email" placeholder="you@example.com" className="border rounded-md p-2 text-sm" />

          <label className="text-sm">পাসওয়ার্ড</label>
          <input  name="password" type="password" placeholder="কমপক্ষে ৮ অক্ষর" className="border rounded-md p-2 text-sm" />

          <button type="submit" className="bg-green-600 text-white rounded-md p-2 mt-2">
            সাইন ইন
          </button>
        </form>

        <p className="text-center text-xs my-3">অথবা</p>

        <div className="flex gap-2">
          <button className="flex-1 border rounded-md p-2 text-xs">Google দিয়ে চালিয়ে যান</button>
          
        </div>

        <p className="text-center text-sm mt-4">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-600">সাইন আপ করুন</Link>
        </p>
      </div>

      <Link href="/" className="text-sm text-gray-500 mt-6">← হোম পেজে ফিরে যান</Link>
    </div>
    );
};

export default SignIn;