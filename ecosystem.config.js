module.exports = {
  apps: [
    {
      name: "SoutienProg",
      exec_mode: "cluster",
      port: 3000,
      instances: "max", // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: "start",
      env: {
        "PORT": 3000,
      },
    },
  ],
};
