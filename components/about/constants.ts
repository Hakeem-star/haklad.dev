export const skillData = [
  {
    title: "DEV",
    items: [
      {
        img: "",
        text: "HTML",
      },
      {
        img: "",
        text: "CSS",
      },
      {
        img: "",
        text: "JavaScript",
      },
      {
        img: "",
        text: "TypeScript",
      },
      {
        img: "",
        text: "Node.js",
      },
      {
        img: "",
        text: "React",
      },
      {
        img: "",
        text: "React Native",
      },
      {
        img: "",
        text: "Redux",
      },
      {
        img: "",
        text: "Firebase",
      },
      {
        img: "",
        text: "Greensock",
      },
      {
        img: "",
        text: "Styled Components",
      },
      {
        img: "",
        text: "GraphQL",
      },
      {
        img: "",
        text: "Prisma (ORM)",
      },
      {
        img: "",
        text: "Headless CMS (Sanity)",
      },
    ],
  },
  {
    title: "VFX",
    items: [
      {
        img: "",
        text: "Blender",
      },
      {
        img: "",
        text: "Photoshop",
      },
      {
        img: "",
        text: "Premiere",
      },
      {
        img: "",
        text: "After Effects",
      },
      {
        img: "",
        text: "Maya",
      },
    ],
  },
  {
    title: "AD TECH",
    items: [
      {
        img: "",
        text: "GTM",
      },
      {
        img: "",
        text: "DCM",
      },
      {
        img: "",
        text: "DV360",
      },
      {
        img: "",
        text: "FlashTalking",
      },
      {
        img: "",
        text: "Tealium",
      },
      {
        img: "",
        text: "Google Analytics",
      },
    ],
  },
];

// credit to - https://github.com/yoksel/url-encoder/blob/master/src/js/script.js
const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;

export const borderSVG =
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='-1 -1 32 32'>
<defs>
    <linearGradient id='lgrad' x1='0%' y1='60%' x2='0%' y2='-50%'>
      <stop offset='0%' style='stop-color:black;stop-opacity:1' />
      <stop offset='100%' style='stop-color:white;stop-opacity:0' />
    </linearGradient>
</defs>
<path id='myText' d='M 0 10 l 10 0 L 10 0 l 10 0 l 0 10 l 10 0 L 30 20 L 20 20 L 20 30 L 10 30 L 10 20 L 0 20 Z' stroke='url(#lgrad)' stroke-width='1' fill='none'/>
</svg>`
    .replace(/>\s{1,}</g, `><`)
    .replace(symbols, encodeURIComponent);
