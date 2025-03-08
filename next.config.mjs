/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["via.placeholder.com", "placehold.co", "dummyimage.com", "rustans.com", "encrypted-tbn2.gstatic.com", "editorialist.com", "down-vn.img.susercontent.com", "danviet.mediacdn.vn", "cdn.24h.com.vn", "bizweb.dktcdn.net", "pos.nvncdn.com"],
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
  