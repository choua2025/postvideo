module.exports = {
  apps: [
    {
      name: 'VideoAddmin',
      exec_mode: 'fork',
      instances: 1,
      script: './node_modules/nuxt/bin/nuxt.js',
	  args: 'start',
	  // cwd: 'C:/xampp/htdocs/Chi_Project/Nuxt_js/postvideo',   // set path of project
    }
  ]
}
