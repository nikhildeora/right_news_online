/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io"],
  },
  env: {
    SANITY_PROJECT_ID: "kbgpbmgs",
    SANITY_DATASET: "production",
    SANITY_TOKEN:
      "skpYMr8HxVh8rTP8RcJf1gTecUg6294lIy8Epp484VpzpHUqiFeHh9sQehavq2LjbvF5TEWLCk4xeGoAR4D8m2sBZUtIQxNrA6RBJLoYYRwrKHBeqO1Znd4ejmaydNzqc3soLXME4TAJ9BQODn0QGazAqGO1BUA7kCLELqjCsugfWFzOM3tt",
  },
};

module.exports = nextConfig;
