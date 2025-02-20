/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["via.placeholder.com", "placehold.co", "dummyimage.com"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
          pathname: "/**",
        },
      ],
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; img-src * data: blob:;",
    },
  };
  
  export default nextConfig;
  