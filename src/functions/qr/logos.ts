import path from "path"

const cwd = path.resolve(process.cwd())
const assetsPath = path.resolve(cwd, "build/functions/qr/assets")

interface Logos {
  [key: string]: string
}

export default <Logos>{
  polkadot: path.resolve(assetsPath, "polkadot.png"),
  kusama: path.resolve(assetsPath, "kusama.png"),
}
