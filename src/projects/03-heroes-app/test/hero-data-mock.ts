const baseUrl = import.meta.env.VITE_API_URL;

export const herosDataMock = [
  {
    id: "1",
    name: "Hulk",
    slug: "hulk",
    alias: "Bruce Banner",
    powers: ["Super fuerza", "Super velocidad", "Super resistencia"],
    image: `${baseUrl}/images/hulk.jpg`,
  },
  {
    id: "2",
    name: "Spiderman",
    slug: "spiderman",
    alias: "Peter Parker",
    powers: ["Super fuerza", "Super velocidad", "Super resistencia"],
    image: `${baseUrl}/images/spiderman.jpg`,
  },
];
