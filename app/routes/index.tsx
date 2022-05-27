import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from '@remix-run/cloudflare';

export const loader: LoaderFunction = async () => {
  // MY_BUCKETというグローバルの値にアクセスする
  const list = await MY_BUCKET.list();

  if (!list) return null;

  return json(list);
};

export default function Index() {
  const  data = useLoaderData<{ objects: any }>();
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
