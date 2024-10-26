"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { useUserAgentContext } from "@/components/providers/userAgentProvider";

export const UserAgent = () => {
  const { userAgent } = useUserAgentContext();
  const serverSideUserAgent = typeof window === 'undefined' ? process.env.USER_AGENT : null;

  return (
    <div>
      <BackToHome />

      {userAgent || serverSideUserAgent ? (
        <div className="flex font-mono font-semibold text-sm">
          <div className="border p-2">UserAgent</div>
          <div className="border p-2">{userAgent || serverSideUserAgent}</div>
        </div>
      ) : (
        <div>No user agent</div>
      )}
    </div>

  );
};

// export async function getServerSideProps(context) {
//   const userAgent = context.req.headers['user-agent'] || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36";

//   return {
//     props: {
//       serverSideUserAgent: userAgent,
//     },
//   };
// }
