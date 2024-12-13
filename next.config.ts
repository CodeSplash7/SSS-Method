import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  images: {
    disableStaticImages: true
  },
  compilerOptions: {
    skipLibCheck: true
  }
};

export default nextConfig;
