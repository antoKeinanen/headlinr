export async function GET({request}: {request: Request}) {
  const url = request.headers.get("x-feed-url");
  if (!url) return new Response("Bad Request", { status: 400 });

  try {
    const res = await fetch(url);
    const text = await res.text();
    return new Response(text, { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
