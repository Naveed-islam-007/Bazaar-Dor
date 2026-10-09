import Link from "next/link";

const UserInfo = () => {
  return (
    <div className="flex gap-2">
      <Link href="/signin" className="btn btn-sm">
        Sign in
      </Link>
      <Link href="/signup" className="btn btn-sm btn-success">
        Sign up
      </Link>
    </div>
  );
};

export default UserInfo;