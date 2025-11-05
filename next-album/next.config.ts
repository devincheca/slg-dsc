import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd2wam6qj2bskgp.cloudfront.net',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  output: 'export',
};

export default nextConfig;
 
