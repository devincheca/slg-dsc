import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        // need public URL for S3 bucket not the Cloudfront one
        search: '',
      },
    ],
  },
};

export default nextConfig;
 
