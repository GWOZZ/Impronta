import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // La página de productos vivía en /clientes. Se mantiene la redirección
    // permanente para no perder links ni posicionamiento.
    return [{ source: "/clientes", destination: "/productos", statusCode: 301 }];
  },
};

export default nextConfig;
