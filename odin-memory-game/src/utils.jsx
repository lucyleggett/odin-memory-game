const characterMap = {
  hellokitty: "Hello Kitty",
  mymelody: "My Melody",
  littletwinstars: "Little Twin Stars",
  pompompurin: "Pompompurin",
  cinnamoroll: "Cinnamoroll",
  kuromi: "Kuromi",
  pochacco: "Pochacco",
  hangyodon: "Hangyodon",
  tuxedosam: "Tuxedosam",
  kerokerokeroppi: "Kerokerokeroppi",
  badbadtzmaru: "Bad Badtz-Maru",
  ahirunopekkle: "Ahiru no Pekkle",
  gudetama: "Gudetama",
  mysweetpiano: "My Sweet Piano",
  wishmemell: "Wish me mell",
  cogimyun: "Cogimyun",
  hanamaruobake: "Hanamaruobake",
  gaopowerroo: "Gaopowerroo",
  bonbonribbon: "Bonbonribbon",
  charmmykitty: "Charmmykitty",
  marumofubiyori: "Marumofubiyori",
  corocorokuririn: "Corocorokuririn",
  marroncream: "Marroncream",
  usahana: "Usahana",
  mashumaromitainafuwafuwanyanko: "Mashumaro Mitai na Fuwafuwa Nyanko",
  chococat: "Chococat",
  CT: "Charmmy Kitty",
  sanriocharacters: "Sanrio Characters",
  othercharacters: "Other Characters",
  NY: "Nyoki & Pikke",
};

export function retrieveName(url) {
  const parts = url.split("_");
  if (parts.length < 2) return url;
  const rawName = parts[1].split(".png")[0];
  return characterMap[rawName];
}

export function filterCharacters(data) {
  return data.filter((item) => item.image.includes("_") && !item.image.includes("characters") && item.image.length < 65);
}

export function getRandomItems(array, num = 12) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, num);
}

export function proxyImageUrl(url) {
    if (import.meta.env.DEV) {
        return url.replace("https://shop.sanrio.co.jp", "/sanrio-img");
    }
    return url;
};
