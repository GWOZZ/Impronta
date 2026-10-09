import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Los servicios vivieron en /clientes y después en /productos. Se mantienen las
    // redirecciones permanentes para no perder links ni posicionamiento.
    return [
      { source: "/clientes", destination: "/servicios", statusCode: 301 },
      { source: "/productos", destination: "/servicios", statusCode: 301 },
    ];
  },
};

export default nextConfig;
