import * as React from 'react'
import type { LoaderFunction } from '@remix-run/cloudflare';
import { Marp } from '@marp-team/marp-react'
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
// import invariant from 'tiny-invariant';

export const loader: LoaderFunction = async ({ params }) => {
  // URLパラメーターを取得
  const key = params.key || 'speech.md';
  // invariant(key, 'Key is required');

  // URLパラメーターをKeyにR2オブジェクトを取得
  const object = await MY_BUCKET.get(key!);

  if (object === null) {
      return json({ message: 'Object not found' }, { status: 404 });
  }

  // R2オブジェクトのメタデータからheaderを生成
  const headers: HeadersInit = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.etag);

  // オブジェクトを返す
  return new Response(object.body, { headers });
}


export default function () {
    if (typeof document !== "undefined") return null;
    const [child, set] = React.useState(null as any);
    const data = useLoaderData();
    const buffer = JSON.stringify(data, null, 2);
    React.useEffect(() => set(<Marp markdown={buffer} />), [buffer])
    return child
    // return <Marp markdown={buffer} />
}