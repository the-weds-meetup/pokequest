module.exports = {
  target: 'serverless',

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    config.node.fs = 'empty';

    return config; 
  },

  env: {
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    MISSION_MANAGEMENT_ADMIN: process.env.MISSION_MANAGEMENT_ADMIN,
    MISSION_MANAGEMENT: process.env.MISSION_MANAGEMENT,
    POKEMON_MANAGEMENT: process.env.POKEMON_MANAGEMENT,
  },
}