import React, { useState } from 'react';
import { Heart, Fish, CircleDot, Moon, Volume2, Coffee, Award, Star } from 'lucide-react';
import { sound } from '../utils/soundEngine';

const DEFAULT_CATS = {
  sleepy: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' },
  orange: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' },
  white: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' },
  black: { hearts: 0, fishFed: 0, goldenFed: 0, status: 'idle' }
};

export default function CatCafe({
  visitorName = 'TASHMI',
  catStats = DEFAULT_CATS,
  updateCat = () => {},
  unlockedGoldenTreat = false
}) {
  const [activeCatIndex, setActiveCatIndex] = useState(0);
  const [localDialogueIndex, setLocalDialogueIndex] = useState(0);
  const [localStatus, setLocalStatus] = useState('idle');

  const cats = [
    {
      id: 'sleepy',
      name: 'Mochi',
      tag: 'Sleepy Cat',
      breed: 'Cream Calico',
      personality: 'Loves curling into warm croissants and dreaming of fish-shaped clouds.',
      soundType: 'sleepy',
      dialogues: {
        idle: [
          "*yawn* The world is loud... but this cushion is soft and warm.",
          "Mochi peeked at you with one eye, then went back to snoozing.",
          "Rest isn't a reward, human. It's a necessity. Come nap with me."
        ],
        pet: [
          "*soft, vibrating purr* You give the gentlest chin scratches...",
          "Mochi melts into a warm fluffy puddle under your hand.",
          "*kneads paws in the air happily*"
        ],
        feed: [
          "Munch munch... A fish snack before my third afternoon nap!",
          "Mochi happily licks his whiskers. That was delicious!",
          "*snuggles the empty plate happily*"
        ],
        play: [
          "*lazily pats yarn with one paw* Look, I'm exercising!",
          "Mochi rolled over the yarn ball and used it as a pillow.",
          "Hunting takes too much energy, let's cuddle the yarn instead."
        ],
        sleep: [
          "Shhh... Mochi is dreaming of tuna rivers and pink clouds. Zzz...",
          "Tucked under a warm fleece blanket. Do not disturb until dinner.",
          "*tiny kitten snores* zzz... zzz..."
        ],
        golden: [
          "A Golden Salmon?! *eyes sparkle with wonder* I will stay awake for 10 extra minutes just to savor this with you, TASHMI!",
          "*happy purr motor at maximum overdrive* This is the best treat in the entire universe!",
          "Mochi nudges your hand with infinite golden gratitude!"
        ]
      }
    },
    {
      id: 'orange',
      name: 'Mikan',
      tag: 'Silly Orange Cat',
      breed: 'Ginger Tabby',
      personality: 'Shares one single braincell with all orange cats. 100% pure joy & chaos.',
      soundType: 'silly',
      dialogues: {
        idle: [
          "I looked for the red laser dot for two hours. I think it's hiding in my ear.",
          "*stares into blank corner intently* ...The ghost said hello to you.",
          "Is a box a home? Yes. Am I too big for this box? Never."
        ],
        pet: [
          "MEOW! *butt elevator goes straight to the 10th floor*",
          "Mikan rubbed his forehead aggressively against your fingers!",
          "Pets! Yes! Now scratch right behind the left ear... perfect!"
        ],
        feed: [
          "GULP! Where did the fish go? Did I eat it or did it vanish by magic?!",
          "Fish acquired! Braincell count temporarily increased by 1!",
          "*crunch crunch crunch* 10/10 Michelin star fishie!"
        ],
        play: [
          "*ZOOMIES ACTIVATED* ATTACK THE YARN BALL AT LIGHTSPEED!",
          "Mikan tangled himself completely in the pink yarn. Send help (or snacks).",
          "The yarn ball thought it was fast, but Mikan is faster!"
        ],
        sleep: [
          "Mikan fell asleep in the weirdest contorted position imaginable.",
          "Sleeping upside down with mouth slightly open... cute little derp.",
          "Recharging braincell battery... 1%... 2%..."
        ],
        golden: [
          "GOLDEN SALMON! *happy zoomies around your feet* My single braincell is glowing with pure joy, TASHMI!",
          "*crunches golden fish happily* I can taste the colors of happiness right now!",
          "Mikan officially crowns you Queen of Treats forever!"
        ]
      }
    },
    {
      id: 'white',
      name: 'Yuki',
      tag: 'Fluffy White Cat',
      breed: 'Cloud Persian',
      personality: 'An absolute princess of fluff. Elegant, serene, and deeply affectionate.',
      soundType: 'normal',
      dialogues: {
        idle: [
          "Yuki poses gracefully on her velvet cushion. Elegance is effortless.",
          "I have decided that you, TASHMI, are my favorite human today.",
          "*slow blinks at you with infinite love and calmness*"
        ],
        pet: [
          "Yuki closes her sapphire eyes and purrs like a soft music box.",
          "*leans delicately into your palm* Such exquisite petting technique.",
          "You are cordially invited to continue petting my fluffy head forever."
        ],
        feed: [
          "Yuki daintily nibbles the fish. A gourmet meal fit for a queen.",
          "Thank you, darling. Even royal kittens adore tasty treats.",
          "*gently paws at your sleeve as a thank you*"
        ],
        play: [
          "Yuki gracefully swats the yarn with manicured fluffy paws.",
          "A delicate pounce! Precision: 100%. Fluffiness: 1000%.",
          "Playing with you is Yuki's favorite royal pastime."
        ],
        sleep: [
          "Yuki curls into a perfect sphere of white cloud fluff.",
          "Beauty sleep is in progress. Dreams filled with butterfly gardens.",
          "*soft rhythmic breathing* So peaceful and elegant."
        ],
        golden: [
          "Such an exquisite delicacy, TASHMI. You treat me like true royalty. *gentle royal purrs*",
          "A golden gourmet treat for a royal kitten. You have stolen my heart completely.",
          "Yuki offers a graceful slow blink of eternal feline loyalty."
        ]
      }
    },
    {
      id: 'black',
      name: 'Kuro',
      tag: 'Tiny Black Cat',
      breed: 'Mini Midnight Panther',
      personality: 'Pocket-sized shadow with huge glowing golden eyes. Curious & sweet.',
      soundType: 'tiny',
      dialogues: {
        idle: [
          "Peek-a-boo! You can only see my two big round eyes!",
          "Kuro is here to protect you from bad thoughts and scary shadows.",
          "*sits on your digital lap and looks up lovingly*"
        ],
        pet: [
          "*high pitched kitten chirp* Meewww! I love you, human!",
          "Kuro does a joyful little flip and nudges your hand with his nose.",
          "*intense purring starts* Kuro is the happiest little shadow."
        ],
        feed: [
          "A fish bigger than Kuro! *nom nom nom nom* So tasty!",
          "Tiny kitten with a huge tummy full of fish! Thank you!",
          "*happy tail wiggles back and forth*"
        ],
        play: [
          "Kuro pounces from the shadows onto the yarn! Gotcha!",
          "*wiggles butt excitedly before jumping on the ball*",
          "Wheee! Kuro can do backflips chasing pink yarn!"
        ],
        sleep: [
          "A tiny black ball of fur sleeping inside your sweater pocket.",
          "Tucked under a tiny star blanket. Night night, world.",
          "*whispers* Kuro is safe and warm with you."
        ],
        golden: [
          "Kuro caught the scent of golden starlight! *nom nom nom* You are my favorite human in the entire galaxy, TASHMI! 🐾✨",
          "*glowing golden eyes get even wider* Kuro's tummy is full of golden happiness!",
          "Kuro gives you 1000 headbutts of eternal joy!"
        ]
      }
    }
  ];

  const currentCat = (cats && cats[activeCatIndex]) || cats[0];
  const currentStats = (catStats && currentCat && catStats[currentCat.id]) || (DEFAULT_CATS && currentCat && DEFAULT_CATS[currentCat.id]) || { hearts: 0, fishFed: 0, goldenFed: 0 };

  const handleAction = (status) => {
    sound.init();
    setLocalStatus(status);

    const list = (currentCat?.dialogues && (currentCat.dialogues[status] || currentCat.dialogues.idle)) || [];
    if (list.length > 0) {
      setLocalDialogueIndex((prev) => (prev + 1) % list.length);
    }

    if (status === 'pet') {
      sound.playPurr(2);
      sound.playMeow(currentCat?.soundType || 'sleepy');
      if (updateCat && currentCat) updateCat(currentCat.id, 'pet');
    } else if (status === 'feed') {
      sound.playCatch();
      if (updateCat && currentCat) updateCat(currentCat.id, 'feed');
    } else if (status === 'golden') {
      sound.playCatch();
      sound.playBloom();
      sound.playPurr(3);
      if (updateCat && currentCat) updateCat(currentCat.id, 'feedGolden');
    } else if (status === 'play') {
      sound.playSparkle();
    } else if (status === 'sleep') {
      sound.playMeow('sleepy');
      if (updateCat && currentCat) updateCat(currentCat.id, 'status', 'sleep');
    }
  };

  const getDialogueText = () => {
    if (!currentCat?.dialogues) return '';
    const list = currentCat.dialogues[localStatus] || currentCat.dialogues.idle || [];
    if (!Array.isArray(list) || list.length === 0) return '';
    const idx = Math.abs(localDialogueIndex) % list.length;
    return (list[idx] || '').replace(/Tashmi|TASHMI/g, visitorName || 'TASHMI');
  };

  return (
    <section id="cat-cafe" className="py-12 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-900 text-xs font-bold uppercase tracking-wider mb-3 border border-pink-200">
          <Coffee size={13} className="text-pink-600" />
          Purrfect Sanctuary
        </div>
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          My Little Cat Café
        </h2>
        <p className="text-stone-700 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
          Four lovely kittens are waiting to spend time with you. Pet them, feed them treats, play with yarn, or tuck them in for a nap.
        </p>
      </div>

      {/* Cat Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
        {cats.map((cat, idx) => {
          const isActive = activeCatIndex === idx;
          const stats = (catStats && catStats[cat.id]) || { hearts: 0 };
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.init();
                sound.playMeow(cat.soundType);
                setActiveCatIndex(idx);
                setLocalStatus('idle');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 shadow-xs cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-md shadow-pink-200 scale-105'
                  : 'bg-white/90 text-stone-800 hover:bg-white hover:text-pink-700 border border-pink-100'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{
                backgroundColor: idx === 0 ? '#F4A261' : idx === 1 ? '#FB8500' : idx === 2 ? '#94A3B8' : '#1E1E24'
              }} />
              <span>{cat.name}</span>
              <span className="text-[11px] opacity-80 font-normal">({cat.tag})</span>
              {stats.hearts > 0 && (
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-bold ml-0.5">
                  ♥ {stats.hearts}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Cat Stage */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-pink-200/90 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Cat Visual & Interactive Stage */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            <div
              onClick={() => handleAction('pet')}
              className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-b from-white to-pink-50/70 border-2 border-pink-200 flex flex-col items-center justify-center cursor-pointer shadow-inner group hover:border-pink-300 transition-all select-none"
              title="Click to pet!"
            >
              {/* Hearts floating when petted */}
              {localStatus === 'pet' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="absolute text-pink-500 animate-ping text-3xl">💗</div>
                  <div className="absolute -top-4 text-rose-400 animate-bounce text-2xl">✨</div>
                  <div className="absolute -right-2 text-pink-400 animate-bounce delay-150 text-xl">💕</div>
                </div>
              )}

              {/* Golden Salmon special stars */}
              {localStatus === 'golden' && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="absolute text-amber-400 animate-ping text-4xl">🍣</div>
                  <div className="absolute -top-6 text-amber-500 animate-bounce text-3xl">✨</div>
                  <div className="absolute -left-4 text-yellow-400 animate-bounce delay-150 text-2xl">⭐</div>
                </div>
              )}

              {/* Blanket overlay when sleeping */}
              {localStatus === 'sleep' && (
                <div className="absolute bottom-6 w-52 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-t-3xl border-t-4 border-pink-300 shadow-md z-20 flex items-center justify-center text-purple-700 font-bold text-xs tracking-wider">
                  <div className="flex items-center gap-1.5 opacity-90">
                    <Moon size={14} /> Cozy Cat Blanket
                  </div>
                </div>
              )}

              {/* Fish animation when feeding */}
              {localStatus === 'feed' && (
                <div className="absolute top-8 text-3xl animate-bounce z-20">
                  🐟💨
                </div>
              )}

              {/* Yarn ball when playing */}
              {localStatus === 'play' && (
                <div className="absolute bottom-6 right-8 text-3xl animate-spin duration-700 z-20">
                  🧶
                </div>
              )}

              {/* Vector Cats Art */}
              <div className={`transform transition-transform duration-300 ${
                localStatus === 'pet' || localStatus === 'golden' ? 'animate-purr scale-105' :
                localStatus === 'play' ? 'animate-bounce' :
                localStatus === 'sleep' ? 'scale-95' : 'group-hover:scale-102'
              }`}>
                {/* CAT 1: Mochi */}
                {activeCatIndex === 0 && (
                  <svg width="190" height="150" viewBox="0 0 200 160" fill="none">
                    <path d="M160 120 C180 110 190 85 180 70 C175 60 168 65 168 75 C168 85 170 100 150 115" stroke="#E6BA95" strokeWidth="12" strokeLinecap="round" className="animate-tail" />
                    <ellipse cx="100" cy="100" rx="65" ry="45" fill="#FFF2E2" stroke="#E6BA95" strokeWidth="2" />
                    <ellipse cx="75" cy="85" rx="22" ry="16" fill="#F4A261" opacity="0.85" />
                    <ellipse cx="125" cy="95" rx="18" ry="14" fill="#6B705C" opacity="0.6" />
                    <circle cx="65" cy="70" r="36" fill="#FFF2E2" stroke="#E6BA95" strokeWidth="2" />
                    <path d="M45 42 Q65 65 85 45" fill="#F4A261" opacity="0.85" />
                    <polygon points="38,50 42,22 58,40" fill="#F4A261" />
                    <polygon points="72,40 88,22 92,50" fill="#6B705C" opacity="0.8" />
                    {localStatus === 'sleep' ? (
                      <>
                        <path d="M50 72 Q56 78 62 72" stroke="#5C3D2E" strokeWidth="3" strokeLinecap="round" />
                        <path d="M68 72 Q74 78 80 72" stroke="#5C3D2E" strokeWidth="3" strokeLinecap="round" />
                      </>
                    ) : (
                      <>
                        <path d="M48 70 Q56 76 64 70" stroke="#5C3D2E" strokeWidth="3" strokeLinecap="round" />
                        <path d="M66 70 Q74 76 82 70" stroke="#5C3D2E" strokeWidth="3" strokeLinecap="round" />
                      </>
                    )}
                    <polygon points="65,77 62,81 68,81" fill="#FF8BA7" />
                    <path d="M65 81 L65 84 Q62 87 58 85 M65 84 Q68 87 72 85" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="45" cy="78" r="6" fill="#FFAEC9" opacity="0.6" />
                    <circle cx="85" cy="78" r="6" fill="#FFAEC9" opacity="0.6" />
                    {localStatus === 'sleep' && (
                      <path d="M45 40 Q65 10 95 20 Q70 30 65 42" fill="#CDB4DB" stroke="#B392AC" strokeWidth="2" />
                    )}
                  </svg>
                )}

                {/* CAT 2: Mikan */}
                {activeCatIndex === 1 && (
                  <svg width="190" height="150" viewBox="0 0 200 160" fill="none">
                    <path d="M165 110 C185 90 195 60 175 45 C165 35 158 50 162 65 C166 80 170 95 150 105" stroke="#FB8500" strokeWidth="12" strokeLinecap="round" className="animate-tail" />
                    <ellipse cx="100" cy="98" rx="60" ry="46" fill="#FFB703" />
                    <path d="M80 80 Q90 92 80 105 M100 75 Q110 90 100 108 M120 80 Q130 92 120 105" stroke="#E85D04" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="65" cy="65" r="38" fill="#FFB703" />
                    <path d="M65 35 L65 46 M55 38 L58 48 M75 38 L72 48" stroke="#E85D04" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="36,45 40,16 60,35" fill="#FB8500" />
                    <polygon points="42,42 45,22 55,36" fill="#FFCCD5" />
                    <polygon points="70,35 90,16 94,45" fill="#FB8500" />
                    <polygon points="75,36 85,22 88,42" fill="#FFCCD5" />
                    <circle cx="52" cy="64" r="10" fill="white" />
                    <circle cx="78" cy="64" r="10" fill="white" />
                    <circle cx="54" cy="64" r="5" fill="#023E8A" />
                    <circle cx="76" cy="64" r="5" fill="#023E8A" />
                    <circle cx="56" cy="62" r="2" fill="white" />
                    <circle cx="78" cy="62" r="2" fill="white" />
                    <polygon points="65,72 62,76 68,76" fill="#FF8BA7" />
                    <path d="M65 76 L65 79 Q62 82 58 80 M65 79 Q68 82 72 80" stroke="#5C3D2E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M63 80 Q65 87 67 80" fill="#FF5D8F" stroke="#E03A69" strokeWidth="1" />
                    <circle cx="42" cy="74" r="6" fill="#FF9EAA" opacity="0.6" />
                    <circle cx="88" cy="74" r="6" fill="#FF9EAA" opacity="0.6" />
                  </svg>
                )}

                {/* CAT 3: Yuki */}
                {activeCatIndex === 2 && (
                  <svg width="190" height="150" viewBox="0 0 200 160" fill="none">
                    <path d="M150 115 C175 110 195 80 185 60 C175 45 160 55 165 75 C168 90 160 100 145 110" stroke="#F0F3F8" strokeWidth="18" strokeLinecap="round" className="animate-tail" />
                    <ellipse cx="100" cy="100" rx="68" ry="48" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    <ellipse cx="95" cy="115" rx="55" ry="25" fill="#F8FAFC" />
                    <circle cx="68" cy="68" r="38" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    <path d="M30 75 Q20 80 28 88 Q20 94 35 94" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <path d="M106 75 Q116 80 108 88 Q116 94 101 94" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <polygon points="40,46 45,18 64,36" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <polygon points="44,42 48,24 58,36" fill="#FFDEE9" />
                    <polygon points="72,36 91,18 96,46" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
                    <polygon points="78,36 88,24 92,42" fill="#FFDEE9" />
                    <ellipse cx="54" cy="65" rx="7" ry="9" fill="#0077B6" />
                    <ellipse cx="82" cy="65" rx="7" ry="9" fill="#0077B6" />
                    <circle cx="56" cy="63" r="3" fill="white" />
                    <circle cx="84" cy="63" r="3" fill="white" />
                    <polygon points="68,73 65,77 71,77" fill="#FFB5A7" />
                    <path d="M68 77 L68 80 Q65 83 62 82 M68 80 Q71 83 74 82" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="44" cy="74" r="7" fill="#FFAEC9" opacity="0.4" />
                    <circle cx="92" cy="74" r="7" fill="#FFAEC9" opacity="0.4" />
                    <polygon points="60,32 68,22 76,32 72,36 64,36" fill="#FFD166" stroke="#E09F3E" strokeWidth="1" />
                    <circle cx="68" cy="22" r="2" fill="#EF476F" />
                  </svg>
                )}

                {/* CAT 4: Kuro */}
                {activeCatIndex === 3 && (
                  <svg width="190" height="150" viewBox="0 0 200 160" fill="none">
                    <path d="M150 115 C170 100 180 75 168 60 C160 50 152 60 156 72 C160 85 162 100 140 110" stroke="#1E1E24" strokeWidth="10" strokeLinecap="round" className="animate-tail" />
                    <ellipse cx="100" cy="102" rx="55" ry="42" fill="#2B2D42" />
                    <circle cx="68" cy="68" r="36" fill="#2B2D42" />
                    <polygon points="40,48 44,18 64,38" fill="#2B2D42" />
                    <polygon points="45,44 48,26 58,38" fill="#4A4E69" />
                    <polygon points="72,38 92,18 96,48" fill="#2B2D42" />
                    <polygon points="78,38 88,26 91,44" fill="#4A4E69" />
                    <circle cx="53" cy="66" r="12" fill="#FFD166" />
                    <circle cx="83" cy="66" r="12" fill="#FFD166" />
                    <ellipse cx="54" cy="66" rx="5" ry="9" fill="#1A1A24" />
                    <ellipse cx="82" cy="66" rx="5" ry="9" fill="#1A1A24" />
                    <circle cx="56" cy="62" r="4" fill="white" />
                    <circle cx="84" cy="62" r="4" fill="white" />
                    <polygon points="68,76 65,80 71,80" fill="#FF8BA7" />
                    <path d="M68 80 L68 83 Q65 86 61 84 M68 83 Q71 86 75 84" stroke="#8D99AE" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="43" cy="78" r="6" fill="#FF758F" opacity="0.6" />
                    <circle cx="93" cy="78" r="6" fill="#FF758F" opacity="0.6" />
                  </svg>
                )}
              </div>

              <div className="absolute bottom-2 text-[11px] text-pink-600 font-semibold">
                Tap cat to pet 🐾
              </div>
            </div>

            {/* Interaction Stats */}
            <div className="flex items-center gap-3 mt-4 text-xs font-bold text-stone-800">
              <span className="flex items-center gap-1.5 bg-pink-100/90 px-3 py-1 rounded-full border border-pink-200">
                <Heart size={13} className="text-pink-500 fill-pink-500" />
                {currentStats.hearts || 0} pets
              </span>
              <span className="flex items-center gap-1.5 bg-blue-100/90 px-3 py-1 rounded-full border border-blue-200 text-blue-900">
                <Fish size={13} className="text-blue-500" />
                {currentStats.fishFed || 0} snacks
              </span>
              {(currentStats.goldenFed || 0) > 0 && (
                <span className="flex items-center gap-1.5 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-200 text-amber-900">
                  <Star size={13} className="text-amber-500 fill-amber-500" />
                  {currentStats.goldenFed} golden
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Cat Info, Speech Bubble & Controls */}
          <div className="md:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-stone-900 flex items-center gap-2">
                    {currentCat.name}
                    <span className="text-xs font-poppins font-semibold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-800">
                      {currentCat.breed}
                    </span>
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5 font-medium">{currentCat.personality}</p>
                </div>
                <button
                  onClick={() => sound.playMeow(currentCat.soundType)}
                  className="p-2.5 rounded-2xl bg-pink-100 hover:bg-pink-200 text-pink-800 transition shadow-xs cursor-pointer"
                  title="Hear meow"
                >
                  <Volume2 size={17} />
                </button>
              </div>

              {/* Speech Bubble */}
              <div className="relative my-4 bg-white/95 p-4 rounded-3xl border border-pink-200 shadow-sm min-h-[90px] flex items-center">
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-l border-b border-pink-200 hidden md:block" />
                <p className="font-poppins text-sm sm:text-base text-stone-800 leading-relaxed italic font-medium">
                  "{getDialogueText()}"
                </p>
              </div>
            </div>

            {/* Action Buttons Grid */}
            <div className="space-y-2 mt-4">
              {/* Special Golden Salmon Treat Button if unlocked via Mini Game! */}
              {unlockedGoldenTreat && (
                <button
                  onClick={() => handleAction('golden')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-stone-900 font-extrabold text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer animate-pulse min-h-[44px]"
                >
                  <Award size={17} className="text-stone-900" />
                  <span>Feed Golden Salmon (Unlocked Special!) 🍣✨</span>
                </button>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleAction('pet')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs sm:text-sm shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[44px]"
                >
                  <Heart size={15} className="fill-white" />
                  <span>Pet Gently</span>
                </button>

                <button
                  onClick={() => handleAction('feed')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs sm:text-sm shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[44px]"
                >
                  <Fish size={15} />
                  <span>Feed Fish</span>
                </button>

                <button
                  onClick={() => handleAction('play')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[44px]"
                >
                  <CircleDot size={15} />
                  <span>Play Yarn</span>
                </button>

                <button
                  onClick={() => handleAction('sleep')}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs sm:text-sm shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer min-h-[44px]"
                >
                  <Moon size={15} />
                  <span>Tuck In 💤</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
