import nextPwa from "next-pwa";

const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
  scope: "/",
});

export default withPWA({
  reactStrictMode: true,
});
