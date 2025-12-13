
import { KaomojiGroup } from '../types';

// Helper to build keywords string
const kw = (en: string, ru: string, es: string, other: string = "") => `${en} ${ru} ${es} ${other}`.toLowerCase();

export const KAOMOJI_DATA: KaomojiGroup[] = [
  {
    name: 'Happy / Joy',
    items: [
      { 
        text: '(＾▽＾)', 
        meaning: "Joyful Smile", 
        tags: ["happy", "smile", "joy"], 
        keywords: kw("joy smile happy", "радость улыбка счастье", "alegría sonrisa feliz", "felicità glück") 
      },
      { 
        text: '(◕‿◕)', 
        meaning: "Cute Smile", 
        tags: ["cute", "happy", "innocent"], 
        keywords: kw("cute innocent", "мило невинно", "lindo inocente", "kawaii") 
      },
      { 
        text: '(✯◡✯)', 
        meaning: "Starry Eyes", 
        tags: ["excited", "stars", "amazed"], 
        keywords: kw("stars excited", "звезды восторг", "estrellas emocionado", "") 
      },
      { 
        text: '(≧◡≦)', 
        meaning: "Blushing Smile", 
        tags: ["shy", "blush", "happy"], 
        keywords: kw("blush shy", "смущение румянец", "sonrojo timido", "") 
      },
      { 
        text: '(*^‿^*)', 
        meaning: "Cheerful", 
        tags: ["cheerful", "happy"], 
        keywords: kw("cheerful", "веселый", "alegre", "") 
      },
      { 
        text: '(´• ω •`)', 
        meaning: "Shy Hello", 
        tags: ["shy", "cute", "hello"], 
        keywords: kw("shy uwu", "стеснительный", "timido", "") 
      },
      { 
        text: '(⌒‿⌒)', 
        meaning: "Content Smile", 
        tags: ["content", "peaceful"], 
        keywords: kw("content satisfied", "довольный", "satisfecho", "") 
      },
      { 
        text: '╰(▔∀▔)╯', 
        meaning: "Celebration", 
        tags: ["party", "yay", "hooray"], 
        keywords: kw("party yay", "ура вечеринка", "fiesta", "") 
      },
      { 
        text: '(o^▽^o)', 
        meaning: "Happy Surprise", 
        tags: ["happy", "surprise"], 
        keywords: kw("happy oh", "радость о", "feliz", "") 
      },
      { 
        text: 'ヽ(>∀<☆)ノ', 
        meaning: "Excited Wave", 
        tags: ["wave", "excited"], 
        keywords: kw("wave hello", "привет махать", "hola saludar", "") 
      },
      { 
        text: '＼(￣▽￣)／', 
        meaning: "Big Hug / Yay", 
        tags: ["hug", "yay"], 
        keywords: kw("hug arms open", "объятия ура", "abrazo", "") 
      },
      { 
        text: '(☆ω☆)', 
        meaning: "Admiring", 
        tags: ["stars", "love", "admire"], 
        keywords: kw("admire love", "восхищение", "admirar", "") 
      },
      { 
        text: '(っ˘ω˘ς )', 
        meaning: "Relaxed / Content", 
        tags: ["relaxed", "calm"], 
        keywords: kw("relax calm", "спокойствие релакс", "calma", "") 
      },
      { 
        text: 'ヽ(*・ω・)ﾉ', 
        meaning: "Friendly Wave", 
        tags: ["wave", "hello"], 
        keywords: kw("hello wave", "привет", "hola", "") 
      },
      { 
        text: '(o･ω･o)', 
        meaning: "Curious / Cute", 
        tags: ["curious", "bear"], 
        keywords: kw("curious", "любопытный", "curioso", "") 
      }
    ]
  },
  {
    name: 'Love / Cute',
    items: [
      { 
        text: '(｡♥‿♥｡)', 
        meaning: "In Love", 
        tags: ["love", "heart"], 
        keywords: kw("love heart", "любовь сердце", "amor corazon", "liebe") 
      },
      { 
        text: '(♥ω♥*)', 
        meaning: "Heart Eyes", 
        tags: ["love", "crush"], 
        keywords: kw("love crush", "влюблен", "enamorado", "") 
      },
      { 
        text: '( ˘ ³˘)♥', 
        meaning: "Kiss", 
        tags: ["kiss", "love"], 
        keywords: kw("kiss muah", "поцелуй чмок", "beso", "kuss") 
      },
      { 
        text: '(´,,•ω•,,)♡', 
        meaning: "Shy Love", 
        tags: ["shy", "love", "cute"], 
        keywords: kw("shy love", "стеснительная любовь", "amor timido", "") 
      },
      { 
        text: 'σ(≧ε≦σ) ♡', 
        meaning: "Blow Kiss", 
        tags: ["kiss", "love"], 
        keywords: kw("blowing kiss", "воздушный поцелуй", "beso volado", "") 
      },
      { 
        text: '(❤ω❤)', 
        meaning: "Adoration", 
        tags: ["love", "adore"], 
        keywords: kw("adore", "обожание", "adorar", "") 
      },
      { 
        text: '(♡μ_μ)', 
        meaning: "Secret Love", 
        tags: ["shy", "secret"], 
        keywords: kw("secret love", "тайная любовь", "amor secreto", "") 
      },
      { 
        text: '(ﾉ´ з `)ノ', 
        meaning: "Hug and Kiss", 
        tags: ["hug", "kiss"], 
        keywords: kw("hug kiss", "обнять поцеловать", "abrazo beso", "") 
      },
      { 
        text: '(♡-_-♡)', 
        meaning: "Love Struck", 
        tags: ["love", "daze"], 
        keywords: kw("lovestruck", "влюбленный", "enamorado", "") 
      },
      { 
        text: '( ◡‿◡ *)', 
        meaning: "Blushing", 
        tags: ["blush", "shy"], 
        keywords: kw("blush", "смущение", "sonrojo", "") 
      },
      { 
        text: '(´ ε ` )♡', 
        meaning: "Kissing", 
        tags: ["kiss"], 
        keywords: kw("kiss", "поцелуй", "beso", "") 
      },
      { 
        text: '(づ￣ ³￣)づ', 
        meaning: "Want a Kiss", 
        tags: ["kiss", "hug", "want"], 
        keywords: kw("want kiss", "хочу поцелуй", "quiero beso", "") 
      },
      { 
        text: '(─‿‿─)♡', 
        meaning: "Cute Love", 
        tags: ["cute", "love"], 
        keywords: kw("cute", "мило", "lindo", "") 
      },
      { 
        text: 'ヽ(♡‿♡)ノ', 
        meaning: "Happy Love", 
        tags: ["happy", "love"], 
        keywords: kw("happy love", "счастливая любовь", "amor feliz", "") 
      },
      { 
        text: '(ღ˘⌣˘ღ)', 
        meaning: "Dreaming of Love", 
        tags: ["dream", "love", "peace"], 
        keywords: kw("dream love", "мечты о любви", "soñar amor", "") 
      }
    ]
  },
  {
    name: 'Sad / Crying',
    items: [
      { 
        text: '(T_T)', 
        meaning: "Crying", 
        tags: ["sad", "cry", "tears"], 
        keywords: kw("cry sad tears", "плак слезы грусть", "llorar triste", "weinen") 
      },
      { 
        text: '(; ω ; )', 
        meaning: "Sobbing", 
        tags: ["sob", "cry"], 
        keywords: kw("sob crying", "рыдать", "sollozar", "") 
      },
      { 
        text: '(ToT)', 
        meaning: "Loud Crying", 
        tags: ["cry", "sad"], 
        keywords: kw("loud cry", "громкий плач", "llanto", "") 
      },
      { 
        text: '( ╥ω╥ )', 
        meaning: "Tears", 
        tags: ["tears", "sad"], 
        keywords: kw("tears", "слезы", "lagrimas", "") 
      },
      { 
        text: '(ㄒoㄒ)', 
        meaning: "Wailing", 
        tags: ["wail", "cry"], 
        keywords: kw("wailing", "вой", "llorar", "") 
      },
      { 
        text: '(｡╯3╰｡)', 
        meaning: "Pouting", 
        tags: ["pout", "sad"], 
        keywords: kw("pout", "дуться", "puchero", "") 
      },
      { 
        text: '(个_个)', 
        meaning: "Lonely", 
        tags: ["lonely", "sad"], 
        keywords: kw("lonely", "одиноко", "solitario", "") 
      },
      { 
        text: '(μ_μ)', 
        meaning: "Disappointed", 
        tags: ["sad", "upset"], 
        keywords: kw("disappointed", "разочарование", "decepcionado", "") 
      },
      { 
        text: '(｡•́︿•̀｡)', 
        meaning: "Worried", 
        tags: ["worry", "sad"], 
        keywords: kw("worried", "волнение", "preocupado", "") 
      },
      { 
        text: '(tk_tk)', 
        meaning: "Tsk Tsk", 
        tags: ["annoyed", "disappointed"], 
        keywords: kw("tsk", "цок", "tsk", "") 
      },
      { 
        text: '(╥_╥)', 
        meaning: "Streaming Tears", 
        tags: ["cry", "sad"], 
        keywords: kw("streaming tears", "поток слез", "lagrimas", "") 
      },
      { 
        text: '(;Д;)', 
        meaning: "Shocked Sadness", 
        tags: ["shock", "cry"], 
        keywords: kw("shock cry", "шок плач", "llorar", "") 
      },
      { 
        text: '(ಥ﹏ಥ)', 
        meaning: "Trying not to cry", 
        tags: ["holding back", "sad"], 
        keywords: kw("holding tears", "сдерживать слезы", "aguantar llanto", "") 
      },
      { 
        text: '((´д｀))', 
        meaning: "Shivering / Scared", 
        tags: ["scared", "shiver"], 
        keywords: kw("scared shiver", "страх дрожь", "miedo", "") 
      },
      { 
        text: '( ◡́.◡̀)(^◡^ )', 
        meaning: "Comforting", 
        tags: ["comfort", "hug"], 
        keywords: kw("comfort pat", "утешение", "consuelo", "") 
      }
    ]
  },
  {
    name: 'Angry / Flip Table',
    items: [
      { 
        text: '(╯°□°)╯︵ ┻━┻', 
        meaning: "Flip Table", 
        tags: ["angry", "flip table", "rage"], 
        keywords: kw("flip table rage", "перевернуть стол ярость", "voltear mesa", "") 
      },
      { 
        text: '(╬ Ò ‸ Ó)', 
        meaning: "Furious", 
        tags: ["angry", "furious"], 
        keywords: kw("furious", "ярость", "furioso", "") 
      },
      { 
        text: '(‡▼益▼)', 
        meaning: "Evil", 
        tags: ["evil", "angry"], 
        keywords: kw("evil villain", "зло", "malvado", "") 
      },
      { 
        text: '(҂ `з´ )', 
        meaning: "Fighting Spirit", 
        tags: ["fight", "angry"], 
        keywords: kw("fight", "драка", "pelea", "") 
      },
      { 
        text: '( º言º)', 
        meaning: "Speechless Anger", 
        tags: ["angry", "speechless"], 
        keywords: kw("speechless anger", "нет слов", "sin palabras", "") 
      },
      { 
        text: '凸(￣ヘ￣)', 
        meaning: "Middle Finger", 
        tags: ["rude", "angry"], 
        keywords: kw("middle finger", "средний палец", "dedo medio", "") 
      },
      { 
        text: 'ψ( ` ∇ ´ )ψ', 
        meaning: "Evil Laugh", 
        tags: ["evil", "laugh"], 
        keywords: kw("evil laugh", "злой смех", "risa malvada", "") 
      },
      { 
        text: '(`皿´)', 
        meaning: "Gritting Teeth", 
        tags: ["angry", "teeth"], 
        keywords: kw("teeth", "скрежет зубов", "dientes", "") 
      },
      { 
        text: '(ノ°益°)ノ', 
        meaning: "Rage Throw", 
        tags: ["throw", "angry"], 
        keywords: kw("throw rage", "бросать", "tirar", "") 
      },
      { 
        text: '(╬`益´)', 
        meaning: "Intense Rage", 
        tags: ["rage", "angry"], 
        keywords: kw("intense rage", "бешенство", "rabia", "") 
      },
      { 
        text: '┻━┻ ︵ ＼( °□° )／', 
        meaning: "Table Flip Back", 
        tags: ["flip table", "angry"], 
        keywords: kw("flip table", "стол", "mesa", "") 
      },
      { 
        text: '(ノಠ益ಠ)ノ', 
        meaning: "Angry Scream", 
        tags: ["scream", "angry"], 
        keywords: kw("scream", "крик", "grito", "") 
      },
      { 
        text: '(¬_¬)', 
        meaning: "Side Eye", 
        tags: ["annoyed", "side eye"], 
        keywords: kw("side eye annoyed", "косой взгляд", "mirada", "") 
      },
      { 
        text: '(≖､≖)', 
        meaning: "Suspicious", 
        tags: ["suspicious", "doubt"], 
        keywords: kw("suspicious", "подозрение", "sospecha", "") 
      }
    ]
  },
  {
    name: 'Confused / Shrug',
    items: [
      { 
        text: '¯\\_(ツ)_/¯', 
        meaning: "Shrug", 
        tags: ["shrug", "confused", "dunno"], 
        keywords: kw("shrug dunno", "пожимать плечами не знаю", "encogerse hombros", "") 
      },
      { 
        text: '(・_・;)', 
        meaning: "Sweating / Nervous", 
        tags: ["nervous", "sweat"], 
        keywords: kw("nervous sweat", "нервный пот", "nervioso", "") 
      },
      { 
        text: '(o_O)', 
        meaning: "Surprised / Confused", 
        tags: ["confused", "shock"], 
        keywords: kw("confused shock", "озадачен шок", "confundido", "") 
      },
      { 
        text: '(¬_¬ )', 
        meaning: "Looking Away", 
        tags: ["ignore", "look away"], 
        keywords: kw("look away", "отвести взгляд", "mirar lado", "") 
      },
      { 
        text: '(・_・ヾ', 
        meaning: "Scratching Head", 
        tags: ["confused", "thinking"], 
        keywords: kw("scratch head", "чесать голову", "rascar cabeza", "") 
      },
      { 
        text: '┐(￣∀￣)┌', 
        meaning: "Carefree Shrug", 
        tags: ["shrug", "carefree"], 
        keywords: kw("carefree shrug", "беззаботно", "despreocupado", "") 
      },
      { 
        text: '╮(︶▽︶)╭', 
        meaning: "Whatever", 
        tags: ["whatever", "shrug"], 
        keywords: kw("whatever", "ну и ладно", "lo que sea", "") 
      },
      { 
        text: '(・・ ) ?', 
        meaning: "Curious Question", 
        tags: ["question", "curious"], 
        keywords: kw("question", "вопрос", "pregunta", "") 
      },
      { 
        text: '┐( ˘_˘)┌', 
        meaning: "Resigned Shrug", 
        tags: ["shrug", "resigned"], 
        keywords: kw("resigned", "смирение", "resignado", "") 
      },
      { 
        text: '( ? _ ? )', 
        meaning: "Totally Lost", 
        tags: ["lost", "confused"], 
        keywords: kw("lost confused", "потерян", "perdido", "") 
      },
      { 
        text: '┐(‘～`;)┌', 
        meaning: "Helpless", 
        tags: ["helpless", "shrug"], 
        keywords: kw("helpless", "беспомощный", "impotente", "") 
      },
      { 
        text: '(⊙_⊙)', 
        meaning: "Wide Eyed", 
        tags: ["shock", "stare"], 
        keywords: kw("stare shock", "пялиться", "mirar fijo", "") 
      },
      { 
        text: '(・・;)ゞ', 
        meaning: "Awkward Salute", 
        tags: ["awkward", "salute"], 
        keywords: kw("awkward", "неловко", "incomodo", "") 
      },
      { 
        text: '╮(￣ω￣;)╭', 
        meaning: "Troubled Shrug", 
        tags: ["troubled", "shrug"], 
        keywords: kw("troubled", "проблема", "problema", "") 
      },
      { 
        text: '(・人・)', 
        meaning: "Begging / Praying", 
        tags: ["pray", "beg"], 
        keywords: kw("pray beg", "молиться просить", "rezar", "") 
      }
    ]
  },
  {
    name: 'Animals (Cat/Bear)',
    items: [
      { 
        text: '(=^･ω･^=)', 
        meaning: "Cat", 
        tags: ["cat", "animal", "meow"], 
        keywords: kw("cat kitten meow", "кот кошка мяу", "gato gatito", "neko") 
      },
      { 
        text: '(^・x・^)', 
        meaning: "Dog", 
        tags: ["dog", "animal", "puppy"], 
        keywords: kw("dog puppy", "собака щенок", "perro", "inu") 
      },
      { 
        text: '(=^･ｪ･^=)', 
        meaning: "Fancy Cat", 
        tags: ["cat", "fancy"], 
        keywords: kw("cat", "кот", "gato", "") 
      },
      { 
        text: '(=^-ω-^=)', 
        meaning: "Sleepy Cat", 
        tags: ["cat", "sleepy"], 
        keywords: kw("sleepy cat", "сонный кот", "gato duerme", "") 
      },
      { 
        text: '(^._.^)', 
        meaning: "Small Animal", 
        tags: ["animal", "cute"], 
        keywords: kw("animal", "зверек", "animalito", "") 
      },
      { 
        text: 'ʕ •́؈•̀ ₎', 
        meaning: "Bear", 
        tags: ["bear", "animal"], 
        keywords: kw("bear", "медведь", "oso", "") 
      },
      { 
        text: 'ʕ •ᴥ• ʔ', 
        meaning: "Teddy Bear", 
        tags: ["bear", "cute"], 
        keywords: kw("teddy bear", "мишка", "osito", "") 
      },
      { 
        text: 'ʕ ᵔᴥᵔ ʔ', 
        meaning: "Happy Bear", 
        tags: ["bear", "happy"], 
        keywords: kw("happy bear", "веселый мишка", "oso feliz", "") 
      },
      { 
        text: '(=｀ω´=)', 
        meaning: "Angry Cat", 
        tags: ["cat", "angry"], 
        keywords: kw("angry cat", "злой кот", "gato enojado", "") 
      },
      { 
        text: '(ㅇㅅㅇ❀)', 
        meaning: "Flower Animal", 
        tags: ["animal", "flower"], 
        keywords: kw("flower", "цветок", "flor", "") 
      },
      { 
        text: 'V(=^･ω･^=)v', 
        meaning: "Victory Cat", 
        tags: ["cat", "victory"], 
        keywords: kw("victory cat", "победа кот", "victoria gato", "") 
      },
      { 
        text: '(=①ω①=)', 
        meaning: "Round Eyes Cat", 
        tags: ["cat", "eyes"], 
        keywords: kw("cat eyes", "глаза кота", "ojos gato", "") 
      },
      { 
        text: '(= ; ｪ ; =)', 
        meaning: "Sad Cat", 
        tags: ["cat", "sad"], 
        keywords: kw("sad cat", "грустный кот", "gato triste", "") 
      },
      { 
        text: '(=`ω´=)', 
        meaning: "Determined Cat", 
        tags: ["cat", "determined"], 
        keywords: kw("cat", "кот", "gato", "") 
      },
      { 
        text: '(/-(ｴ)-＼)', 
        meaning: "Shy Bear", 
        tags: ["bear", "shy"], 
        keywords: kw("shy bear", "стеснительный медведь", "oso timido", "") 
      }
    ]
  }
];