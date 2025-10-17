/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'zhillemogxpsusxqalra.supabase.co',
            port: '',
            pathname: '/storage/v1/object/public/item-images/**',
            search: '',
         },
      ],
   },
};

export default nextConfig;
