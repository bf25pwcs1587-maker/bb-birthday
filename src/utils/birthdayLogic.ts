import { ReasonItem, MemoryPhoto, LoveCoupon } from '../types/index.ts';

/**
 * Calculates countdown details to the 13th
 */
export function calculateDaysUntil13th(now: Date = new Date()): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCelebrationDay: boolean;
} {
  const currentDay = now.getDate();
  const isCelebrationDay = currentDay === 13;

  // Next 13th target
  const target = new Date(now.getFullYear(), now.getMonth(), 13, 0, 0, 0);
  if (now.getDate() > 13) {
    target.setMonth(target.getMonth() + 1);
  }

  const diffMs = target.getTime() - now.getTime();
  if (isCelebrationDay || diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCelebrationDay: true,
    };
  }

  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    isCelebrationDay: false,
  };
}

/**
 * Validates and trims birthday wish text
 */
export function validateWish(wish: string): {
  isValid: boolean;
  cleaned: string;
  message: string;
} {
  const trimmed = (wish || '').trim();
  if (trimmed.length === 0) {
    return {
      isValid: true,
      cleaned: 'Health, boundless joy, and endless love with Talha forever and ever.',
      message: 'A sweet silent wish has been sent to the universe!',
    };
  }
  if (trimmed.length > 280) {
    return {
      isValid: false,
      cleaned: trimmed.slice(0, 280),
      message: 'Wish is a bit long! Keep it under 280 characters.',
    };
  }
  return {
    isValid: true,
    cleaned: trimmed,
    message: 'Your wish has been whispered to the stars! ✨',
  };
}

/**
 * The 13 special reasons why Talha loves BB
 */
export function getThirteenReasons(): ReasonItem[] {
  return [
    {
      id: 1,
      title: 'Your Radiant Smile',
      thaiTitle: 'รอยยิ้มที่สว่างไสวของคุณ',
      description: 'The moment you smile, every worry in my world melts away. Your warmth lights up everything.',
      iconName: 'Sparkles',
      romanticQuote: '“In your smile, I see something more beautiful than the stars.”',
      thaiQuote: '“ในรอยยิ้มของเธอ ฉันเห็นสิ่งที่งดงามยิ่งกว่าดวงดาว”',
    },
    {
      id: 2,
      title: 'Your Pure, Gentle Heart',
      thaiTitle: 'หัวใจที่แสนอ่อนโยนและบริสุทธิ์',
      description: 'The genuine kindness you give to everyone and the boundless care you shower on me is my greatest sanctuary.',
      iconName: 'HeartHandshake',
      romanticQuote: '“You have the gentlest soul I have ever known.”',
      thaiQuote: '“เธอคือจิตใจที่อ่อนโยนที่สุดที่ฉันเคยได้พบ”',
    },
    {
      id: 3,
      title: 'The Way You Laugh with Me',
      thaiTitle: 'เสียงหัวเราะที่มีร่วมกัน',
      description: 'Hearing your pure, unfiltered laugh is the sweetest melody in the world. It makes every ordinary day feel like magic.',
      iconName: 'Music',
      romanticQuote: '“Your laughter is my favorite song.”',
      thaiQuote: '“เสียงหัวเราะของเธอคือบทเพลงที่ไพเราะที่สุดในโลก”',
    },
    {
      id: 4,
      title: 'My Safe Haven',
      thaiTitle: 'ที่พักพิงที่อบอุ่นและปลอดภัย',
      description: 'In your warm hugs and comforting eyes, I have found my true home. Nowhere else feels as peaceful as by your side.',
      iconName: 'Home',
      romanticQuote: '“With you, I am home wherever we are.”',
      thaiQuote: '“เมื่ออยู่เคียงข้างเธอ ไม่ว่าจะที่ไหน ฉันก็รู้สึกเหมือนอยู่บ้าน”',
    },
    {
      id: 5,
      title: 'Your Unstoppable Strength',
      thaiTitle: 'ความเข้มแข็งและสง่างาม',
      description: 'You carry grace, poise, and quiet courage in everything you tackle. You inspire me to be a better man every single day.',
      iconName: 'Crown',
      romanticQuote: '“Grace in her steps, heaven in her eye.”',
      thaiQuote: '“ความสง่างามในทุกย่างก้าว ความงดงามในทุกแววตา”',
    },
    {
      id: 6,
      title: 'The Sparkle in Your Eyes',
      thaiTitle: 'ประกายดาวในดวงตาคู่นั้น',
      description: 'Whenever you look at me, I see a universe of tenderness, warmth, and dreams waiting to unfold.',
      iconName: 'Eye',
      romanticQuote: '“Looking into your eyes is like looking into my forever.”',
      thaiQuote: '“การได้มองตาเธอ คือการได้มองเห็นอนาคตตลอดไปของฉัน”',
    },
    {
      id: 7,
      title: 'Our Late-Night Conversations',
      thaiTitle: 'บทสนทนายามค่ำคืนของเรา',
      description: 'Talking with you until 2 AM about our future, our silly jokes, and life dreams are my favorite moments in life.',
      iconName: 'Moon',
      romanticQuote: '“Every minute with you feels like a cherished treasure.”',
      thaiQuote: '“ทุกนาทีที่ได้คุยกับเธอคือสมบัติล้ำค่าที่สุด”',
    },
    {
      id: 8,
      title: 'How You Believe in Me',
      thaiTitle: 'ความเชื่อมั่นที่เธอมีให้ฉัน',
      description: 'Even when the world is challenging, your faith in me gives me wings. Having you in my corner is my greatest superpower.',
      iconName: 'ShieldCheck',
      romanticQuote: '“Together, there is nothing we cannot conquer.”',
      thaiQuote: '“เพียงแค่มีเราสองคน ไม่มีสิ่งใดที่เราจะผ่านไปไม่ได้”',
    },
    {
      id: 9,
      title: 'Your Playful, Cheerful Spirit',
      thaiTitle: 'ความสดใสและขี้เล่นของเธอ',
      description: 'You make the simplest grocery runs or car rides feel like the most fun adventure. Life with you is never dull.',
      iconName: 'Smile',
      romanticQuote: '“You bring color into a black-and-white world.”',
      thaiQuote: '“เธอเติมสีสันที่สดใสให้แก่โลกใบนี้ของฉัน”',
    },
    {
      id: 10,
      title: 'The Warmth of Your Touch',
      thaiTitle: 'ไออุ่นจากการจับมือเธอ',
      description: 'Holding your hand in mine brings an instant wave of calm. It is a reminder that I have everything I ever prayed for.',
      iconName: 'Heart',
      romanticQuote: '“Hand in hand, heart to heart, forever.”',
      thaiQuote: '“กุมมือกันไว้ หัวใจผูกพัน ตลอดไป”',
    },
    {
      id: 11,
      title: 'Your Thoughtfulness',
      thaiTitle: 'ความใส่ใจในทุกรายละเอียดเล็กๆ',
      description: 'How you remember every tiny detail, how you prepare little surprises, and how deeply you love without holding back.',
      iconName: 'Gift',
      romanticQuote: '“Love is in the smallest, sweetest gestures you make.”',
      thaiQuote: '“ความรักอยู่ในทุกการกระทำอันแสนอ่อนโยนของเธอ”',
    },
    {
      id: 12,
      title: 'You Are My Best Friend & Soulmate',
      thaiTitle: 'เพื่อนที่ดีที่สุดและคู่ชีวิต',
      description: 'Beyond being the most gorgeous woman on Earth, you are my true confidante, partner-in-crime, and life companion.',
      iconName: 'Flame',
      romanticQuote: '“I found both love and my best friend in you.”',
      thaiQuote: '“ฉันพบทั้งความรักแท้และเพื่อนที่ดีที่สุดในตัวเธอ”',
    },
    {
      id: 13,
      title: 'You Are Talha’s Forever Blessing',
      thaiTitle: 'พรที่วิเศษที่สุดในชีวิตของตัลฮา',
      description: 'On this 13th, I thank God every second for the day you were born. You are my queen, my present, and my eternal future.',
      iconName: 'Infinity',
      romanticQuote: '“I will choose you, in a hundred lifetimes, in any world, forever.”',
      thaiQuote: '“ไม่ว่าจะเกิดอีกกี่ภพกี่ชาติ ฉันก็จะเลือกเธอเพียงคนเดียวตลอดไป”',
    },
  ];
}

/**
 * Default Romantic Memories Polaroid Data
 */
export function getDefaultMemories(): MemoryPhoto[] {
  return [
    {
      id: 'm1',
      title: 'The Day My World Changed',
      date: 'Our Beginning',
      caption: 'The moment our paths crossed and my heart whispered: she is the one.',
      imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
      tag: 'Love Story',
    },
    {
      id: 'm2',
      title: 'Golden Sunset Strolls',
      date: 'Together Hand in Hand',
      caption: 'Walking beside you while the sky turns amber and rose—my favorite scenery is your smile.',
      imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80',
      tag: 'Memories',
    },
    {
      id: 'm3',
      title: 'Candlelight & Whispers',
      date: 'Unforgettable Date Night',
      caption: 'Soft music, candlelight, and you looking breathtakingly beautiful across from me.',
      imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80',
      tag: 'Romance',
    },
    {
      id: 'm4',
      title: 'Sweet Coffee & Laughter',
      date: 'Everyday Bliss',
      caption: 'The way you sip your drink and tease me with that adorable giggle.',
      imageUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
      tag: 'Laughter',
    },
    {
      id: 'm5',
      title: 'Under the Starlit Sky',
      date: 'Endless Whispers',
      caption: 'Counting shooting stars and realizing every wish I ever made already came true in you.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tag: 'Forever',
    },
    {
      id: 'm6',
      title: 'Today & Forever',
      date: 'Happy Birthday BB',
      caption: 'Celebrating the incredible queen of Talha’s heart on this special 13th!',
      imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      tag: 'Celebration',
    },
  ];
}

/**
 * Default Birthday Coupons for BB
 */
export function getDefaultCoupons(): LoveCoupon[] {
  return [
    {
      id: 'c1',
      title: 'Unlimited Warm Hugs & Cuddles',
      description: 'Redeemable anytime, anywhere, with zero expiration date.',
      code: 'TALHA-HUGS-VIP',
      unlocked: true,
    },
    {
      id: 'c2',
      title: 'Queen Treatment Day',
      description: 'A full day where Talha caters to your every wish, craving, and favorite food.',
      code: 'QUEEN-BB-DAY',
      unlocked: true,
    },
    {
      id: 'c3',
      title: 'Candlelight Dream Dinner',
      description: 'A romantic private dinner with candlelight, your favorite music, and roses.',
      code: 'ROMANTIC-FEAST',
      unlocked: true,
    },
    {
      id: 'c4',
      title: 'Late Night Star Drive & Ice Cream',
      description: 'Cruising under the moonlight, playlist of our songs, and endless sweet talk.',
      code: 'MOONLIGHT-DRIVE',
      unlocked: true,
    },
  ];
}
