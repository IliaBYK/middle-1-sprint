import { avatar } from '../images'

export const cards = [
  {
    src: avatar,
    name: 'Андрей',
    id: 1,
    text: `Привет! Смотри, тут всплыл интересный кусок лунной 
            космической истории — НАСА в какой-то момент попросила 
            Хассельблад адаптировать модель SWC для полетов на Луну.`,
    isOwner: false,
    time: '12:00'
  },
  {
    src: avatar,
    name: 'Андрей',
    isOwner: true,
    id: 2,
    text: 'Круто!',
    time: '12:00'
  }
]
