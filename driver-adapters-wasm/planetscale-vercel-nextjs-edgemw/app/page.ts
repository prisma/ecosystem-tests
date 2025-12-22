// @ts-check

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching
// https://vercel.com/docs/infrastructure/data-cache/manage-data-cache#disabling-vercel-data-cache
export const fetchCache = 'force-no-store'

export const metadata = {
  title: 'My Page Title',
}

export default function Page() {
  return 'Hello from Next.js! - You should not see this because the middleware should intercept the request.'
}
