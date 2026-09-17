export function retrieveName(url) {
  const parts = url.split("_");
  if (parts.length < 2) return url;
  return parts[1].split(".png")[0];
}

const characterMap = [
    {hellokitty: "Hello Kitty"},
]

[
    "hellokitty",
    "mymelody",
    "littletwinstars",
    "pompompurin",
    "cinnamoroll",
    "kuromi",
    "pochacco",
    "hangyodon",
    "tuxedosam",
    "kerokerokeroppi",
    "badbadtzmaru",
    "ahirunopekkle",
    "gudetama",
    "mysweetpiano",
    "wishmemell",
    "cogimyun",
    "hanamaruobake",
    "gaopowerroo",
    "bonbonribbon",
    "https://shop.sanrio.co.jp/photo/color/dn.png",
    "charmmykitty",
    "marumofubiyori",
    "corocorokuririn",
    "marroncream",
    "https://shop.sanrio.co.jp/photo/color/si.png",
    "usahana",
    "mashumaromitainafuwafuwanyanko",
    "chococat",
    "CT",
    "https://shop.sanrio.co.jp/photo/color/JOCHUM.png",
    "sanriocharacters",
    "othercharacters",
    "https://shop.sanrio.co.jp/photo/color/0033.png",
    "NY",
    "https://shop.sanrio.co.jp/photo/color/d66b3e2c934299f1346db148111713e0.png",
    "https://shop.sanrio.co.jp/photo/color/0706SN.png"
]