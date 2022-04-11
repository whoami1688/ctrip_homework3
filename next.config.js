/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports.nextConfig= nextConfig


if(typeof require !== 'undefined'){
    require.extensions['.css']=file=>{}
}

const withCSS = require('@zeit/next-css')
module.exports.withCSS = withCSS({})
