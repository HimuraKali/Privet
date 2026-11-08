/**
 * Данные и конфигурация для страницы /messenger
 */

export const messengerConfig = {
  typingDelay: 1200, // Задержка "печатает..." (мс)
  messageDelay: 2000, // Пауза между сообщениями (мс)
  dissolveDelay: 10000, // Время до исчезновения после второго сообщения (мс)
  openChatButtonText: 'Открыть чат',
  messages: [
    { id: 1, text: 'как дела', type: 'incoming' },
    { id: 2, text: 'дилишки', type: 'incoming' },
  ],
}

export const chats = [
  {
    id: 1,
    name: 'Templar Assassin',
    preview: 'Привет, как дела?',
    time: '12:00',
    special: false,
  },
  {
    id: 2,
    name: 'Axe',
    preview: 'Скинь фотку',
    time: '11:45',
    special: false,
  },
  {
    id: 3,
    name: 'Undying',
    preview: 'Увидимся завтра',
    time: '10:30',
    special: false,
  },
  {
    id: 4,
    name: 'Skywrath Mage',
    preview: 'У тебя новое сообщение',
    time: 'Только что',
    special: true,
  },
  {
    id: 5,
    name: 'Dark Willow',
    preview: 'Ок',
    time: 'Вчера',
    special: false,
  },
  {
    id: 6,
    name: 'Crystal Maiden',
    preview: 'Где ты?',
    time: 'Вчера',
    special: false,
  },
  {
    id: 7,
    name: 'Windranger',
    preview: 'Ха-ха, смешно',
    time: 'Пятница',
    special: false,
  },
  {
    id: 8,
    name: 'Slark',
    preview: 'Напиши мне',
    time: 'Четверг',
    special: false,
  },
  {
    id: 9,
    name: 'Grimstroke',
    preview: 'Пока',
    time: 'Среда',
    special: false,
  },
  {
    id: 10,
    name: 'Death Prophet',
    preview: 'Завтра наберу',
    time: 'Вторник',
    special: false,
  },
]
