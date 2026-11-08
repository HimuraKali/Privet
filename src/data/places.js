/**
 * Маршрут «Акт II: Места»
 * Координаты map — в системе viewBox карты 0…1000 × 0…520
 */
export const places = [
  {
    id: 'barcelona',
    name: 'Барселона',
    caption: 'Красивое место',
    image: '/images/places/barcelona.jpg',
    decor: 'barcelona',
    colors: {
      sky: '#ffd2c2',
      mid: '#f7a08a',
      deep: '#e87a6a',
      accent: '#ffb4a2',
      text: '#5c3340',
    },
    map: { x: 478, y: 205 },
  },
  {
    id: 'ireland',
    name: 'Ирландия',
    caption: 'А это как',
    image: '/images/places/ireland.jpg',
    decor: 'ireland',
    colors: {
      sky: '#e4f5e8',
      mid: '#b7dfc0',
      deep: '#7fb892',
      accent: '#a8d4b4',
      text: '#2f4a3a',
    },
    map: { x: 448, y: 158 },
  },
  {
    id: 'iceland',
    name: 'Исландия',
    caption: 'Водопады блин',
    image: '/images/places/iceland.jpg',
    decor: 'iceland',
    colors: {
      sky: '#d8e8fb',
      mid: '#9ec0ef',
      deep: '#6a92d4',
      accent: '#b8a6e8',
      text: '#2f3f5c',
    },
    map: { x: 430, y: 118 },
  },
  {
    id: 'budapest',
    name: 'Будапешт',
    caption: 'Яркий город но ты ярче',
    image: '/images/places/budapest.jpg',
    decor: 'budapest',
    colors: {
      sky: '#c9d4ef',
      mid: '#7a8fc4',
      deep: '#3d4f7a',
      accent: '#f0c090',
      text: '#e8eef8',
    },
    map: { x: 548, y: 178 },
  },
  {
    id: 'china',
    name: 'Китай',
    caption: 'Мажор',
    image: '/images/places/china.png',
    decor: 'china',
    colors: {
      sky: '#ffe0e8',
      mid: '#f0a0b4',
      deep: '#c45a6e',
      accent: '#e87890',
      text: '#5c2a38',
    },
    map: { x: 790, y: 215 },
  },
]

/** Точка вылета перед Барселоной */
export const departurePoint = { x: 420, y: 230 }
