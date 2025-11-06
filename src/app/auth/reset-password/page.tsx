import { Suspense } from "react";
import ResetPasswordForm from "./client/reset-password-form";
import ResetPasswordFormSkeleton from "./client/reset-password-form-skeleton";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <Suspense fallback={<ResetPasswordFormSkeleton />}>
        <ResetPasswordForm searchParams={searchParams} />
      </Suspense>
    </>
  );
}
