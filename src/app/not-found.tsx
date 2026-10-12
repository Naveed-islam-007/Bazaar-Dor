import Link from 'next/link';

const notfound = () => {
    return (
         <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-green-600">404</h1>
      <h2 className="text-2xl font-bold mt-4">পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে বা ঠিকানাটি ভুল।
      </p>

      <Link
        href="/"
        className="bg-green-600 text-white rounded-md px-5 py-2 mt-6 text-sm"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
    );
};

export default notfound;