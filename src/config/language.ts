import { Language } from './types';

const languages: Record<string, Language> = {
  en: {
    post: {
      username: 'prizegiveaway',
      sponsored: 'Sponsored',
      caption: '🎉 Spin the wheel to win amazing cash prizes! Limited time offer.',
      timeAgo: '2 hours ago',
      likes: '1,234 likes',
      commentPlaceholder: 'Add a comment...',
      postButton: 'Post'
    },
    prizeWheel: {
      spinButton: 'SPIN NOW!',
      tryAgainButton: 'SPIN AGAIN!',
      spinningText: 'SPINNING...',
      prizes: [
        {
          prize: '500\nUSD',
          description: 'Congratulations! You won $500!'
        },
        {
          prize: '400\nUSD',
          description: 'Amazing! You won $400!'
        },
        {
          prize: '300\nUSD',
          description: 'Great! You won $300!'
        },
        {
          prize: '200\nUSD',
          description: 'Nice! You won $200!'
        },
        {
          prize: '100\nUSD',
          description: 'Cool! You won $100!'
        },
        {
          prize: 'TRY\nAGAIN',
          description: "Don't worry! You have one more try!"
        }
      ]
    },
    modal: {
      congratsTitle: 'Congratulations! 🎉',
      stepCloser: 'You are one step closer to:',
      notThisTime: 'Not This Time!',
      claimNowButton: 'CLAIM NOW',
      tryAgainButton: 'TRY AGAIN',
      claimUrl: 'https://www.google.com/',
      oneMoreTry: "Don't worry! You have one more try!"
    },
    reviews: {
      title: 'Comments',
      items: [
        {
          username: 'sarah.williams92',
          content: 'Initially I was not sure if this is real or not, but I have received the cash today :D!!',
          likes: '847',
          timeAgo: '1 hour ago',
          verified: true
        },
        {
          username: 'john_doe',
          content: 'Did anybody win something in this sweepstakes??',
          likes: '234',
          timeAgo: '3 hours ago',
          verified: false
        },
        {
          username: 'emma.smith',
          content: 'Can you help me? I just won an gift card!! What should I do now?',
          likes: '562',
          timeAgo: '4 hours ago',
          verified: false
        },
        {
          username: 'lisa.anderson',
          content: 'I was not sure if it was true or not, but I received my card today!! 😍 amazing 🔥 🔥',
          likes: '1,293',
          timeAgo: '5 hours ago',
          verified: true
        }
      ]
    }
  },
  es: {
    post: {
      username: 'sorteopremios',
      sponsored: 'Patrocinado',
      caption: '🎉 ¡Gira la ruleta para ganar increíbles premios en efectivo! Oferta por tiempo limitado.',
      timeAgo: 'hace 2 horas',
      likes: '1.234 me gusta',
      commentPlaceholder: 'Añade un comentario...',
      postButton: 'Publicar'
    },
    prizeWheel: {
      spinButton: '¡GIRA AHORA!',
      tryAgainButton: '¡GIRA DE NUEVO!',
      spinningText: 'GIRANDO...',
      prizes: [
        {
          prize: '500\nUSD',
          description: '¡Felicitaciones! ¡Ganaste $500!'
        },
        {
          prize: '400\nUSD',
          description: '¡Increíble! ¡Ganaste $400!'
        },
        {
          prize: '300\nUSD',
          description: '¡Genial! ¡Ganaste $300!'
        },
        {
          prize: '200\nUSD',
          description: '¡Excelente! ¡Ganaste $200!'
        },
        {
          prize: '100\nUSD',
          description: '¡Bien! ¡Ganaste $100!'
        },
        {
          prize: 'INTENTAR\nDE NUEVO',
          description: '¡No te preocupes! ¡Tienes un intento más!'
        }
      ]
    },
    modal: {
      congratsTitle: '¡Felicitaciones! 🎉',
      stepCloser: 'Estás a un paso más cerca de:',
      notThisTime: '¡Esta vez no!',
      claimNowButton: 'RECLAMAR AHORA',
      tryAgainButton: 'INTENTAR DE NUEVO',
      claimUrl: 'https://www.google.com/',
      oneMoreTry: '¡No te preocupes! ¡Tienes un intento más!'
    },
    reviews: {
      title: 'Comentarios',
      items: [
        {
          username: 'sarah.williams92',
          content: 'Al principio no estaba segura si era real o no, ¡pero hoy recibí el dinero! :D!!',
          likes: '847',
          timeAgo: 'hace 1 hora',
          verified: true
        },
        {
          username: 'john_doe',
          content: '¿Alguien ganó algo en este sorteo??',
          likes: '234',
          timeAgo: 'hace 3 horas',
          verified: false
        },
        {
          username: 'emma.smith',
          content: '¿Me pueden ayudar? ¡Acabo de ganar una tarjeta de regalo! ¿Qué debo hacer ahora?',
          likes: '562',
          timeAgo: 'hace 4 horas',
          verified: false
        },
        {
          username: 'lisa.anderson',
          content: '¡No estaba segura si era verdad o no, pero hoy recibí mi tarjeta! 😍 increíble 🔥 🔥',
          likes: '1.293',
          timeAgo: 'hace 5 horas',
          verified: true
        }
      ]
    }
  }
};

export function getLanguage(lang = 'en'): Language {
  return languages[lang] || languages.en;
}

export type { Language };
export { languages };