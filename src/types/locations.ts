export type LocationType = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
};

export const defaultInitialLocations: LocationType[] = [
  {
    place_id: "344255513",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "9686810",
    boundingbox: ["-7.2023203", "-6.8358061", "109.9226761", "110.3985416"],
    lat: "-7.01909655",
    lon: "110.13747567422602",
    display_name: "Kendal, Central Java, Java, Indonesia",
    class: "boundary",
    type: "administrative",
    importance: 0.55001,
    icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343388462",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "2388357",
    boundingbox: ["-8.4411879", "-4.0387936", "108.5558548", "111.8689695"],
    lat: "-7.3032412",
    lon: "110.0044145",
    display_name: "Central Java, Java, Indonesia",
    class: "boundary",
    type: "administrative",
    importance: 0.6626261885869811,
    icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343820636",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "6362934",
    boundingbox: ["-6.3744575", "-4.9993635", "106.3146732", "106.973975"],
    lat: "-6.175247",
    lon: "106.8270488",
    display_name: "Special Region of Jakarta, Java, Indonesia",
    class: "boundary",
    type: "administrative",
    importance: 0.8313522487860329,
    icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343123161",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "304751",
    boundingbox: ["-11.2085669", "6.2744496", "94.7717124", "141.0194444"],
    lat: "-2.4833826",
    lon: "117.8902853",
    display_name: "Indonesia",
    class: "boundary",
    type: "administrative",
    importance: 0.9255820405486824,
    icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343117567",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "270056",
    boundingbox: ["8.6650385", "53.5608154", "73.4997347", "134.7754563"],
    lat: "35.000074",
    lon: "104.999927",
    display_name: "China",
    class: "boundary",
    type: "administrative",
    importance: 0.9888265963780304,
    icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343144330",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "382313",
    boundingbox: ["20.2145811", "45.7112046", "122.7141754", "154.205541"],
    lat: "36.5748441",
    lon: "139.2394179",
    display_name: "Japan",
    class: "boundary",
    type: "administrative",
    importance: 0.9810133265462458,
    icon: "https://locationiq.com/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343066223",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "60189",
    boundingbox: ["41.1850968", "82.0586232", "-180", "180"],
    lat: "64.6863136",
    lon: "97.7453061",
    display_name: "Russia",
    class: "boundary",
    type: "administrative",
    importance: 0.9621923620785889,
    icon: "https://locationiq.org/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343314866",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "2108121",
    boundingbox: ["0.8538205", "8.3801468", "98.7365109", "119.4699634"],
    lat: "4.5693754",
    lon: "102.2656823",
    display_name: "Malaysia",
    class: "boundary",
    type: "administrative",
    importance: 0.8774875088743168,
    icon: "https://locationiq.com/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
  {
    place_id: "343124389",
    licence: "https://locationiq.com/attribution",
    osm_type: "relation",
    osm_id: "304934",
    boundingbox: ["29.0585661", "37.3806687", "38.7926388", "49.1067706"],
    lat: "33.0955793",
    lon: "44.1749775",
    display_name: "Iraq",
    class: "boundary",
    type: "administrative",
    importance: 0.8565118206048474,
    icon: "https://locationiq.com/static/images/mapicons/poi_boundary_administrative.p.20.png",
  },
];