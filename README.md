# Shareable

API server for sharing token gifts using Netlify functions

## Quick Start

Building and deploying requires a [Netlify account](https://www.netlify.com/) and the [Netlify CLI](https://docs.netlify.com/cli/get-started/).

The email sending requires a SendGrid account and a verified sender email. These should be added as the environment variables `SENDGRID_API_SECREY` and `SENDGRID_SENDER_EMAIL`. See [the Netlify documentation](https://docs.netlify.com/environment-variables/overview/) for how to set these environment in Netlify.

> 💡 **Note:** These environment variables must be available to serverless functions, so do not set them in your Netlify configuration file _(`netlify.toml`)_

```
git clone git@github.com:aaronbassett/shareable.git
cd shareable
npm install
```

### Generating OpenAPI Specs

Once you have the project set up you can generate the OpenAPI specs in JSON and YAML by running

```
npm run spec:all
```

This will generate a `./build/specs/api.json` and a `./build/specs/api.yml` file

### Generating OpenAPI docs

![Screenshot of the interactive API documentation](/README_IMGS/screenshot_interactive_docs.png)

For a more human readable version of the OpenAPI specs run:

```
npm run local:docs
```

This will use generate interactive API documentation from the OpenAPI specs and start a local server to view them. After running `npm run local:docs` you should be able to view them in your browser at [http://localhost:8080](http://localhost:8080)

### Local Dev Server

The [Netlify CLI](https://docs.netlify.com/cli/get-started/) includes a development server:

```
npm run local:dev
```

Once it successfully starts the OpenAPI JSON spec will be available at [localhost:8008](http://localhost:8008/) and the functions can be accessed at:

- Email: [localhost:8008/.netlify/functions/email](http://localhost:8008/.netlify/functions/email)
- QR Code: [localhost:8008/.netlify/functions/qr](http://localhost:8008/.netlify/functions/email)

You can create a public development server using:

```
npm run public:dev
```

This will run the local dev server and make it publicly available via a tunnel.

> ⚠️ **Warning:** This is a dev server and should be used only for demonstration purposes, never for production.

## Trying the API endpoints

The functions support POST requests only.

```
## Email
curl -X "POST" "http://localhost:8008/.netlify/functions/email" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "email": "jbloggs@example.com",
  "from_name": "Joe Bloggs",
  "amount": "1",
  "claim_url": "https://example.com",
  "seed": "a123456789b123456789c123456789",
  "to_name": "Jane Bloggs"
}'
```

```
## QR Code
curl -X "POST" "http://localhost:8008/.netlify/functions/qr" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "seed": "a123456789b123456789c123456789",
  "claim_url": "https://example.com"
}'
```

The `qr` endpoint returns the QR code as a base64 encoded data uri string.

```
curl -s -X "POST" "http://localhost:8008/.netlify/functions/qr" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "claim_url": "https://example.com",
  "seed": "a123456789b123456789c123456789",
  "margin": 1
}' | jq '.datauri' | sd '^"data:image/png;base64,([^"]+)"$' '$1' | base64 --decode > /tmp/qr.png && viu /tmp/qr.png
```

![Screenshot of generated QR code in terminal](/README_IMGS/screenshot-qrcode-terminal.png)

> 💡 **Note:** The above command uses [jq](https://stedolan.github.io/jq/), [sd](https://github.com/chmln/sd), and [viu](https://github.com/atanunq/viu)

## The OpenAPI Specs

After running `npm run spec:all` you can view the generated spec files in the `./build/specs` directory. Or, run `npm run local:docs` to view them in your browser.

In production _(or when running the dev server)_ the OpenAPI specs are available at `/` _(also available at `/openapi.json` as per the OpenAPI spec recommendations)_

### Spec Sources

The API contracts are written in TypeScript and generated via [Spot](https://github.com/airtasker/spot). You can find these contracts in `src/spec/services`
