/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/news",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
