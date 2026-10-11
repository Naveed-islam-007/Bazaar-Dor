"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar cursor-pointer">
            <div className="w-10 rounded-full">
              <Image
                alt="avatar"
                src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                width={20}
                height={20}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-10 w-48 p-2 shadow"
          >
            <li className="px-3 py-1 text-sm font-medium">{user.name}</li>
            <li>
              <button
                onClick={async () => {
                  await authClient.signOut();
                  window.location.href = "/signin";
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link href="/signin" className="btn btn-sm">
            Sign in
          </Link>
          <Link href="/signup" className="btn btn-sm btn-success">
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;