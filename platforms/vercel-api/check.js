const fs = require('fs')
const path = require('path')

const pkgPath = path.join(__dirname, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath))
if(pkg.scripts.postinstall === "prisma generate || true && node check.js"){
  console.log(`Postinstall hook was successfully added: ${pkg.scripts.postinstall}`);
}else {
  process.exit(1)
}

