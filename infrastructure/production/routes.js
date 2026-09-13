// CloudFront invokes this entry point directly.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri === '/') {
    request.uri = '/index.html';
  } else {
    // Next exports /consultations as /consultations.html. Keep assets and RSC
    // .txt requests intact, including the nested Next.js prefetch files.
    uri = uri.replace(/\/+$/, '');
    if (uri.split('/').pop().indexOf('.') === -1) {
      request.uri = uri + '.html';
    }
  }
  return request;
}
