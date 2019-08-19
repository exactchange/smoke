const fetch = require('node-fetch');

exports.it = async (description, req, expect) => {
  if (!req) {
    console.log(`<< SKIP >> ${description || 'Anonymous'}`);

    return false;
  }

  const res = req.data ? await fetch(req.url, {
    body: JSON.stringify(req.data),
    headers: { 'Content-type': 'application/json' },
    method: req.method
  }) : await fetch(req.url);

  res.data = await res.json();

  if (res.data.timestamp) {
    delete res.data.timestamp;
  }

  console.log(`<< TEST >> ${description}`);

  if (JSON.stringify(res.data) === JSON.stringify(expect)) {
    console.log('\x1b[32m<< PASS >>\x1b[0m', res.data);

    return true;
  }
  else {
    console.log('\x1b[31m<< FAIL >>\x1b[0m', res.data, '\n');

    return false;
  }
};
