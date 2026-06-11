import { StrictMode, useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gamepad2,
  Heart,
  HeartHandshake,
  Info,
  ListChecks,
  MousePointer2,
  Pause,
  Play,
  Sparkles,
  Smartphone,
  Star,
  Volume2,
  WandSparkles
} from "lucide-react";
import { SwipeableCardStack } from "./components/ui/tinder-like-swipe";
import "./styles.css";

declare global {
  interface Window {
    fbq?: (command: "track", eventName: string, parameters?: Record<string, string>) => void;
  }
}

type Feature = {
  label: string;
  title: string;
  text: string;
  before: string;
  after: string;
  image?: string;
  video?: string;
  poster?: string;
};

type ProofVideo = {
  label: string;
  title: string;
  text: string;
  src: string;
  poster: string;
};

const registrationUrl = "https://kamapro.io/login";
const pricingUrl = "https://kamapro.io/pricing";
const privacyUrl = "https://kamapro.io/privacy";
const termsUrl = "https://kamapro.io/terms";
const supportUrl = "https://kamapro.io/help";

function assetUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}

function trackMetaEvent(eventName: string, contentName: string) {
  if (typeof window.fbq !== "function") return;

  window.fbq("track", eventName, {
    content_name: contentName
  });
}

const features: Feature[] = [
  {
    label: "Ideias",
    title: "Ideias sem constrangimento",
    text: "Sugestões claras para explorar a dois sem transformar o momento em pesquisa desconfortável.",
    before: "Esperar o clima aparecer do nada.",
    after: "Abrir uma ideia pronta e escolher juntos o tom da noite.",
    image: assetUrl("/images/solution/kamapro-bloco-1.png")
  },
  {
    label: "Playlists",
    title: "Playlists para cada clima",
    text: "Do leve ao mais curioso, organize possibilidades por momento, desejo e ritmo do casal.",
    before: "Ficar sem repertório quando a rotina pesa.",
    after: "Ter caminhos organizados por clima, curiosidade e intensidade.",
    image: assetUrl("/images/solution/kamapro-bloco-2.png")
  },
  {
    label: "Histórias",
    title: "Histórias para entrar no clima",
    text: "Conteúdos que criam antecipação e ajudam a conversa a acontecer com mais naturalidade.",
    before: "Puxar assunto e sentir que ficou artificial.",
    after: "Usar uma história como ponto de partida leve e envolvente.",
    image: assetUrl("/images/solution/kamapro-bloco-3.png")
  },
  {
    label: "Desafios",
    title: "Desafios para quebrar o gelo",
    text: "Convites simples para trazer brincadeira, cumplicidade e novidade para a relação.",
    before: "A conversa trava antes de virar experiência.",
    after: "Transformar curiosidade em uma ação simples para fazer a dois.",
    image: assetUrl("/images/solution/kamapro-bloco-4.png")
  },
  {
    label: "Favoritos",
    title: "Favoritos do casal",
    text: "Guarde o que combina com vocês e volte depois, no momento certo, sem precisar procurar de novo.",
    before: "Perder ideias boas e recomeçar sempre do zero.",
    after: "Criar um repertório privado para voltar quando o clima aparecer.",
    image: assetUrl("/images/solution/kamapro-bloco-5.png")
  }
];

const proofVideos: ProofVideo[] = [
  {
    label: "Android",
    title: "Instale na tela inicial",
    text: "O KamaPro pode virar um atalho de app no celular.",
    src: assetUrl("/videos/ChromeAndroid.mp4"),
    poster: assetUrl("/frames/android_02.jpg")
  },
  {
    label: "iOS Chrome",
    title: "Acesse pelo navegador",
    text: "A experiência funciona de forma simples no browser.",
    src: assetUrl("/videos/ChromeIOSBom.mp4"),
    poster: assetUrl("/frames/ios_chrome_02.jpg")
  },
  {
    label: "iOS Safari",
    title: "Use como PWA",
    text: "Acesso rápido, discreto e pronto para repetir.",
    src: assetUrl("/videos/PWA_IOS_SAFARI.mp4"),
    poster: assetUrl("/frames/pwa_safari_03.jpg")
  }
];

const faq = [
  {
    question: "O KamaPro é discreto?",
    answer:
      "Sim. A proposta da experiência é ser privada, direta e controlada pelo casal."
  },
  {
    question: "Preciso instalar aplicativo?",
    answer:
      "Não. Você pode acessar pelo navegador e, se quiser, adicionar como PWA na tela inicial."
  },
  {
    question: "Serve para casais que estão começando a explorar?",
    answer:
      "Serve. A ideia é dar repertório sem pressa: cada casal escolhe o que combina com seu momento."
  }
];

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050407] text-white">
      <Hero />
      <Problem />
      <HowItWorks />
      <ExampleCards />
      <Solution />
      <ProductAccess />
      <Testimonials />
      <Plans />
      <Faq />
      <MobileStickyCta />
    </main>
  );
}

function ExampleCards() {
  const revealCards = [
    {
      image: assetUrl("/cards/poses/pose-01.webp"),
      title: "480. Cat",
      description:
        "Até a pose mais simples pode entregar experiências inesquecíveis, ou virar mais uma marca na lista do que já foi testado",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "gamepro", "casal", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-02.webp"),
      title: "346. Harmony",
      description:
        "Nesta pose não há o que pensar — desligue os pensamentos, abrace o parceiro e absorva tudo, procurando harmonia na proximidade, na ternura e no tempo que passam juntos.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "harmonia", "proximidade", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-03.webp"),
      title: "465. Eagle",
      description:
        "Corpos em alta voltagem reagem ao menor toque, acendem como fósforos — e esta pose permite saciar a fome com olhares profundos e penetração intensa.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "intenso", "olhares", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-04.webp"),
      title: "503. Anvil",
      description:
        "Um pouco de doce nunca fez mal a ninguém — especialmente quando a parceira é o próprio doce, e nesta pose dá para experimentar a profundidade desse sabor preferido.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "profundo", "casal", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-05.webp"),
      title: "374. Acrobat",
      description:
        "A linguagem corporal é absurdamente eloquente — em vez de várias piruetas, basta uma única pose bem provocante.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "provocante", "corpo", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-06.webp"),
      title: "256. Whisper",
      description:
        "Acaricie o pênis do parceiro com extrema delicadeza usando a boca — ele vai enlouquecer com o cuidado, especialmente nesta pose em que basta se deitar e absorver cada onda de prazer.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "oral", "cuidado", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-07.webp"),
      title: "501. Inquisitor",
      description:
        "Esta pose ganhou este nome fatídico porque a mulher fica totalmente nas mãos do parceiro, de corpo e alma — é ele quem decide quando esse jogo termina.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "entrega", "jogo", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-08.webp"),
      title: "43. Bullfighter",
      description:
        "Esta pose entrega ao parceiro uma oportunidade rara: encontrar o ponto G com precisão, graças ao posicionamento plano do corpo da mulher e ao acesso totalmente desimpedido à região íntima.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "ponto g", "precisão", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-09.webp"),
      title: "290. Yin-Yang",
      description:
        "Esta é uma versão muito interessante e prática do 69 — se vocês são casal que pratica sexo oral, anote essa configuração. A mulher se acomoda deitada de costas e eleva completamente as pernas estendidas.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "oral", "69", "+8"]
    },
    {
      image: assetUrl("/cards/poses/pose-10.webp"),
      title: "508. Shining",
      description:
        "Amem, se beijem, façam amor e provem um ao outro — quando vocês se entregam totalmente, isso fortalece ainda mais os sentimentos e as emoções compartilhadas.",
      difficulty: "Médio",
      rating: "4.9",
      tags: ["pose", "beijo", "entrega", "+8"]
    }
  ];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#050407] py-20 sm:py-28">
      <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-kama-magenta/20 blur-3xl" />
      <div className="absolute -left-32 bottom-12 h-96 w-96 rounded-full bg-kama-red/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="relative z-10">
          <p className="section-kicker">Exemplos de experiências</p>
          <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Descubra uma ideia, salve o desejo e transforme curiosidade em{" "}
            <span className="text-kama-pink">momento a dois</span>.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/66">
            Em vez de depender de improviso, o KamaPro entrega cartas,
            playlists e desafios para o casal escolher o clima sem perder a
            naturalidade.
          </p>
          <div className="mt-8 grid gap-3 text-sm font-medium text-white/70 sm:max-w-md">
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
              <Check className="size-4 text-kama-pink" />
              Deslize para sentir a experiência de descoberta.
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
              <Check className="size-4 text-kama-pink" />
              Cada card pode virar uma ideia salva para depois.
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto h-[520px] w-full max-w-[390px]">
          <div className="absolute -inset-5 rounded-[2rem] border border-kama-red/30 bg-[radial-gradient(circle_at_center,rgba(253,36,121,.18),transparent_60%)]" />
          <PoseCardDeck cards={revealCards} />
        </div>
      </div>
    </section>
  );
}

function PoseCardDeck({
  cards
}: {
  cards: Array<{
    title: string;
    description: string;
    difficulty: string;
    rating: string;
    tags: string[];
    image: string;
  }>;
}) {
  const cardByImage = new Map(cards.map((card) => [card.image, card]));

  return (
    <div className="relative h-full w-full">
      <SwipeableCardStack
        borderRadius={28}
        greenShadowColor="rgba(89, 224, 143, 0.26)"
        images={cards.map((card) => card.image).reverse()}
        innerStrokeColor="rgba(253, 36, 121, 0.38)"
        redShadowColor="rgba(254, 6, 77, 0.38)"
        shadowBlur="rgba(253, 36, 121, 0.22)"
        renderCard={(image, index) => {
          const card = cardByImage.get(image) ?? cards[index] ?? cards[0];

          return <PoseFlipCard card={card} />;
        }}
        renderControls={({ canSwipe, swipeLeft, swipeRight }) => (
          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-30 flex -translate-y-1/2 justify-between px-2 sm:-inset-x-6 sm:px-0">
            <button
              aria-label="Card anterior"
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-white/15 bg-black/70 text-white shadow-glow backdrop-blur-xl transition hover:border-kama-red/60 hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!canSwipe}
              onClick={swipeLeft}
              type="button"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              aria-label="Próximo card"
              className="pointer-events-auto grid size-11 place-items-center rounded-full border border-white/15 bg-black/70 text-white shadow-glow backdrop-blur-xl transition hover:border-kama-red/60 hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!canSwipe}
              onClick={swipeRight}
              type="button"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      />
    </div>
  );
}

function PoseFlipCard({
  card
}: {
  card: {
    image: string;
    title: string;
    description: string;
    difficulty: string;
    rating: string;
    tags: string[];
  };
}) {
  return (
    <article className="pose-swipe-card is-flipped">
      <div className="pose-flip-inner">
        <div className="pose-flip-face pose-flip-front">
          <div className="pose-card-front-bg">
            <div className="pose-card-front-content">
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl" />
                <Sparkles className="relative z-10 size-20 text-white sm:size-24" />
              </div>
              <h3 className="text-center text-3xl font-bold text-white">Poses GamePro</h3>
              <p className="mt-2 text-center text-white/80">Clique para revelar</p>
              <Heart className="absolute right-4 top-4 size-10 text-white/20" />
              <Flame className="absolute bottom-4 left-4 size-10 text-white/20" />
            </div>
          </div>
        </div>

        <div className="pose-flip-face pose-flip-back">
          <div className="pose-card-back">
            <div className="pose-card-image">
              <img
                alt={card.title}
                className="pose-card-real-image"
                draggable={false}
                onError={(event) => {
                  event.currentTarget.style.opacity = "0";
                }}
                src={card.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.54)_62%,rgba(0,0,0,.96))]" />
              <div className="absolute right-4 top-4">
                <span className="rounded-full bg-yellow-600/80 px-3 py-1 text-xs font-bold text-yellow-100 backdrop-blur-md">
                  {card.difficulty}
                </span>
              </div>
              <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 backdrop-blur-md">
                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold text-white">{card.rating}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-4 sm:p-6">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-white sm:text-xl">
                  {card.title}
                  <Info className="size-4 shrink-0 text-white/48 sm:size-5" />
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/52">
                  {card.description}
                </p>
              </div>
              <div className="mt-1 flex flex-wrap gap-2">
                {card.tags.map((tag, tagIndex) => (
                  <span
                    className={
                      tagIndex === card.tags.length - 1
                        ? "rounded-md border border-white/10 bg-white/[0.06] px-2 py-1 text-[10px] text-white/46 sm:text-xs"
                        : "rounded-md border border-kama-red/25 bg-kama-red/10 px-2 py-1 text-[10px] text-kama-pink sm:text-xs"
                    }
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-stage relative min-h-screen pt-5 sm:pt-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_16%,rgba(253,36,121,0.26),transparent_30rem),radial-gradient(circle_at_24%_38%,rgba(254,6,77,0.16),transparent_26rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050407_0%,rgba(5,4,7,.70)_48%,rgba(5,4,7,.96)_100%)]" />
      <div className="mx-auto flex max-w-7xl flex-col items-center px-5 pb-20 pt-3 text-center sm:px-8 sm:pb-28 sm:pt-8 lg:pb-36">
        <div className="relative z-10 flex max-w-5xl flex-col items-center">
          <div className="mb-4 flex items-center gap-3 sm:mb-8 sm:gap-4">
            <img
              className="size-12 rounded-xl object-cover shadow-glow sm:size-24 sm:rounded-2xl"
              src={assetUrl("/images/LogoKamaPro.png")}
              alt=""
              aria-hidden="true"
            />
            <span className="text-3xl font-extrabold leading-none tracking-normal sm:text-5xl">
              Kama<span className="text-kama-pink">Pro</span>
            </span>
          </div>
          <h1 className="max-w-5xl text-[2.45rem] font-extrabold leading-[1.02] tracking-normal text-white sm:text-6xl lg:text-[5.35rem]">
            A rotina não precisa ser o fim do desejo.
            <span className="text-kama-pink"> Redescubra o clima a dois.</span>
          </h1>
          <div className="relative z-10 mt-5 w-full max-w-4xl sm:mt-10">
            <VslCard />
          </div>
          <p className="mt-5 max-w-3xl text-base leading-7 text-white/78 sm:mt-7 sm:text-2xl sm:leading-9">
            O KamaPro ajuda casais a descobrirem novas ideias, playlists e
            desafios íntimos com privacidade, leveza e zero constrangimento.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
            <a
              className="btn btn-primary h-[3.25rem] rounded-full px-6 text-sm sm:h-16 sm:px-9 sm:text-base"
              href={registrationUrl}
              onClick={() => trackMetaEvent("Lead", "Hero - descobrir primeira experiência")}
            >
              Descobrir minha primeira experiência
              <ArrowRight className="size-5" />
            </a>
            <a
              className="inline-flex items-center gap-2 text-xs font-medium text-white/78 transition hover:text-white sm:text-sm"
              href="#videos"
              onClick={() => trackMetaEvent("ViewContent", "Hero - assistir primeiro")}
            >
              Assistir primeiro
              <Play className="size-5" />
            </a>
          </div>
          <div className="mt-5 hidden flex-wrap justify-center gap-3 text-sm font-medium text-white/58 sm:mt-8 sm:flex">
            <TrustItem text="Explore no seu ritmo" />
            <TrustItem text="Salve favoritos privados" />
            <TrustItem text="Acesso simples pelo celular" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
      <Check className="size-4 text-kama-pink" />
      {text}
    </span>
  );
}

function VslCard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const enableVslSound = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = false;
    video.volume = 1;
    void video.play();
    setIsMuted(false);
    setIsPaused(false);
    trackMetaEvent("ViewContent", "VSL KamaPro - som ativado");
  };

  const toggleVslPlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsPaused(false);
      return;
    }

    video.pause();
    setIsPaused(true);
  };

  return (
    <div className="vsl-clean relative mx-auto w-full max-w-[300px] sm:max-w-[520px]">
      <div className="absolute -inset-4 rounded-[2rem] bg-kama-magenta/20 blur-3xl sm:-inset-8" />
      <div className="absolute -left-10 top-1/4 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1rem] bg-[radial-gradient(circle_at_52%_45%,rgba(253,36,121,.34),transparent_30%),linear-gradient(135deg,#21101e,#09070b)] shadow-[0_34px_120px_rgba(253,36,121,0.18)] sm:rounded-[1.25rem]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted={isMuted}
          onClick={() => {
            if (isMuted) {
              enableVslSound();
              return;
            }

            toggleVslPlayback();
          }}
          onPause={() => setIsPaused(true)}
          onPlay={() => {
            setIsPaused(false);
            trackMetaEvent("ViewContent", "VSL KamaPro");
          }}
          onVolumeChange={(event) => setIsMuted(event.currentTarget.muted)}
          playsInline
          preload="metadata"
          src={assetUrl("/videos/VSLKAMAPRO.mp4")}
        />
        {isMuted && (
          <button
            aria-label="Ativar som da VSL"
            className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-white/14 bg-black/72 text-white backdrop-blur-xl transition hover:bg-black/86 sm:right-5 sm:top-5 sm:size-12"
            onClick={(event) => {
              event.stopPropagation();
              enableVslSound();
            }}
            type="button"
          >
            <Volume2 className="size-5" />
          </button>
        )}
        <button
          aria-label={isPaused ? "Reproduzir VSL" : "Pausar VSL"}
          className="absolute bottom-4 left-4 z-10 grid size-11 place-items-center rounded-full border border-white/14 bg-black/72 text-white backdrop-blur-xl transition hover:bg-black/86 sm:bottom-5 sm:left-5 sm:size-12"
          onClick={(event) => {
            event.stopPropagation();
            toggleVslPlayback();
          }}
          type="button"
        >
          {isPaused ? (
            <Play className="ml-0.5 size-5 fill-white text-white" />
          ) : (
            <Pause className="size-5 fill-white text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

function PhoneShell({
  video,
  featured = false,
  className = ""
}: {
  video: ProofVideo;
  featured?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto rounded-[2.25rem] border border-white/15 bg-black p-3 shadow-2xl ${featured ? "w-[275px] sm:w-[310px]" : "w-[220px]"} ${className}`}
    >
      <div className="absolute left-1/2 top-4 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#100d13]">
        <video
          className="aspect-[9/16] h-full w-full object-cover"
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="mt-4 px-2 pb-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-kama-pink">
          {video.label}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-tight text-white">
          {video.title}
        </h3>
        <p className="mt-2 text-sm leading-5 text-white/60">{video.text}</p>
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="dotted-section border-y border-kama-red/20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Quando a intimidade cai no automático, não falta amor.
            <span className="text-kama-pink"> Falta repertório.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
            O KamaPro foi criado para ajudar casais a transformar curiosidade
            em novas experiências, sem constrangimento e sem depender de
            conteúdo solto pela internet.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            ["Ideias sem travar", "Encontre caminhos para começar sem precisar improvisar na hora."],
            ["Privado por natureza", "Explore no ritmo de vocês, com uma experiência discreta e segura."],
            ["Sempre há algo novo", "Playlists, histórias e desafios para manter o desejo em movimento."]
          ].map(([title, text], index) => (
            <div className="linkpriv-card flex min-h-[220px] flex-col justify-center p-8" key={title}>
              <span className="mb-7 grid size-12 shrink-0 place-items-center rounded-full bg-[linear-gradient(135deg,#FE064D,#FD2479)] text-sm font-extrabold text-white">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-2xl font-extrabold text-white">{title}</h3>
                <p className="mt-2 text-base leading-7 text-white/60">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sideLeftRef = useRef<HTMLDivElement | null>(null);
  const sideRightRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const ribbonRef = useRef<HTMLDivElement | null>(null);
  const steps = [
    {
      icon: MousePointer2,
      title: "Escolha o clima",
      text: "Comece pelo tom da noite: romântico, curioso, leve ou mais provocante. O casal entra sem precisar saber exatamente o que procurar."
    },
    {
      icon: ListChecks,
      title: "Veja ideias prontas para conversar",
      text: "Cards, playlists, histórias e desafios viram pontos de partida para falar sobre desejo sem deixar a conversa pesada."
    },
    {
      icon: HeartHandshake,
      title: "Salve favoritos do casal",
      text: "Tudo que desperta interesse pode ficar guardado para depois, criando um repertório privado que combina com vocês."
    },
    {
      icon: Gamepad2,
      title: "Transforme em experiência",
      text: "Quando o clima aparecer, vocês escolhem um desafio, uma playlist ou uma história e deixam a noite acontecer com naturalidade."
    },
    {
      icon: Smartphone,
      title: "Acesse pelo celular",
      text: "Sem complicação: abra pelo navegador, instale como PWA se quiser e mantenha a experiência discreta no dia a dia."
    }
  ];
  const ribbons = [
    "MAIS INTIMIDADE",
    "SEM CONSTRANGIMENTO",
    "PLAYLISTS A DOIS",
    "DESAFIOS",
    "FAVORITOS PRIVADOS",
    "NOVAS IDEIAS"
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const sideLeft = sideLeftRef.current;
    const sideRight = sideRightRef.current;
    const pin = pinRef.current;
    const ribbon = ribbonRef.current;
    if (!section || !sideLeft || !sideRight || !pin || !ribbon) return;

    let frame = 0;

    const resetPin = () => {
      pin.classList.remove("how-pin-active", "how-pin-ending");
      pin.removeAttribute("style");
      ribbon.classList.remove("how-ribbon-fixed");
    };

    const updatePin = () => {
      frame = 0;

      if (window.innerWidth < 1024) {
        resetPin();
        return;
      }

      const sectionRect = section.getBoundingClientRect();
      const sideRect = sideLeft.getBoundingClientRect();
      const pinHeight = pin.offsetHeight;
      const viewportCenterTop = Math.max(36, window.innerHeight / 2 - pinHeight / 2);
      const start = sideRect.top <= 0;
      const releaseLift = 220;
      const finalTop = Math.max(
        0,
        sideRight.offsetHeight - window.innerHeight + viewportCenterTop - releaseLift
      );
      const releaseAt = Math.max(0, finalTop - viewportCenterTop);
      const end = -sideRect.top >= releaseAt;
      const afterSection = sectionRect.bottom <= 0;

      if (!start || afterSection) {
        resetPin();
        return;
      }

      if (end) {
        ribbon.classList.add("how-ribbon-fixed");
        pin.classList.remove("how-pin-active");
        pin.classList.add("how-pin-ending");
        pin.style.position = "absolute";
        pin.style.left = "0";
        pin.style.top = `${finalTop}px`;
        pin.style.width = `${sideLeft.offsetWidth}px`;
        pin.style.transform = "none";
        return;
      }

      ribbon.classList.add("how-ribbon-fixed");
      pin.classList.remove("how-pin-ending");
      pin.classList.add("how-pin-active");
      pin.style.position = "fixed";
      pin.style.left = `${sideRect.left}px`;
      pin.style.top = `${viewportCenterTop}px`;
      pin.style.width = `${sideRect.width}px`;
      pin.style.transform = "translate3d(0, 0, 0)";
      pin.style.zIndex = "25";
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updatePin);
    };

    updatePin();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      resetPin();
    };
  }, []);

  return (
    <section
      id="como-funciona"
      className="how-works-section relative overflow-visible border-b border-white/10"
      ref={sectionRef}
    >
      <div className="how-ribbon-clip" aria-hidden="true" ref={ribbonRef}>
        <HowRibbon items={ribbons} className="-rotate-[7deg]" />
        <HowRibbon items={ribbons.slice().reverse()} className="rotate-[7deg]" reverse />
      </div>
      <div className="absolute left-0 top-[42rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-white/20 blur-[8rem]" />
      <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-kama-magenta/20 blur-3xl" />
      <div className="how-layout mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="side-left z-20" ref={sideLeftRef}>
          <div className="side-left-pin" ref={pinRef}>
            <div className="how-copy-panel">
              <p className="section-kicker">Como funciona</p>
              <h2 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
                Do "vamos fazer algo diferente?" ao primeiro passo.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-white/66">
                Um fluxo pensado para criar clima, reduzir constrangimento e dar
                repertório sem transformar intimidade em tarefa.
              </p>
              <a
                className="btn btn-secondary mt-8 rounded-full px-7"
                href={registrationUrl}
                onClick={() => trackMetaEvent("Lead", "Como funciona - começar agora")}
              >
                Começar agora
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="side-right relative z-30 grid gap-7" ref={sideRightRef}>
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <HowStepCard
                icon={Icon}
                index={index}
                key={step.title}
                text={step.text}
                title={step.title}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowRibbon({
  className = "",
  items,
  reverse = false
}: {
  className?: string;
  items: string[];
  reverse?: boolean;
}) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className={`how-ribbon ${className}`}>
      <div className={`how-ribbon-track ${reverse ? "how-ribbon-reverse" : ""}`}>
        {repeated.map((item, index) => (
          <span className="how-ribbon-item" key={`${item}-${index}`}>
            <Sparkles className="size-5" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function HowStepCard({
  icon: Icon,
  index,
  text,
  title
}: {
  icon: ComponentType<{ className?: string }>;
  index: number;
  text: string;
  title: string;
}) {
  return (
    <article className="how-step-card">
      <div className="how-step-visual">
        <div className="how-step-art">
          <span className="how-step-pill" />
          <div className="how-step-icon">
            <Icon className="size-14" />
          </div>
          <span className="how-step-dot how-step-dot-left" />
          <span className="how-step-dot how-step-dot-right" />
        </div>
      </div>
      <p className="mt-8 text-sm font-bold uppercase tracking-[0.22em] text-kama-pink">
        Passo {index + 1}
      </p>
      <h3 className="mt-3 text-3xl font-extrabold leading-tight text-white">{title}</h3>
      <p className="mt-5 max-w-xl text-lg leading-8 text-white/68">{text}</p>
    </article>
  );
}

function Solution() {
  return (
    <section id="experiencias" className="solution-section relative overflow-hidden py-20 sm:py-28">
      <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-kama-magenta/18 blur-3xl" />
      <div className="absolute -right-32 bottom-20 h-[32rem] w-[32rem] rounded-full bg-white/10 blur-[7rem]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">A solução</p>
          <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Antes era improviso. Agora o casal tem um repertório vivo.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Em vez de pesquisar no impulso ou deixar a conversa morrer, o
            KamaPro organiza ideias, playlists, histórias e desafios para o
            casal voltar a experimentar junto.
          </p>
        </div>
        <div className="mt-14 space-y-6 sm:mt-16 sm:space-y-8">
          {features.map((feature, index) => (
            <SolutionFeatureBlock
              feature={feature}
              index={index}
              key={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionFeatureBlock({
  feature,
  index
}: {
  feature: Feature;
  index: number;
}) {
  const isReversed = index % 2 === 1;

  return (
    <article className="solution-block grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
      <div className={isReversed ? "lg:order-2" : ""}>
        <span className="inline-flex items-center rounded-full border border-kama-red/30 bg-kama-red/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-kama-pink">
          {String(index + 1).padStart(2, "0")} / {feature.label}
        </span>
        <h3 className="mt-5 max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
          {feature.text}
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/22 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/38">
              Antes
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-white/62">
              {feature.before}
            </p>
          </div>
          <div className="rounded-xl border border-kama-red/30 bg-kama-red/10 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-kama-pink">
              Depois
            </p>
            <p className="mt-2 text-sm font-medium leading-6 text-white/78">
              {feature.after}
            </p>
          </div>
        </div>
      </div>
      <div className={`solution-video-wrap ${isReversed ? "lg:order-1" : ""}`}>
        <div className="solution-video-frame">
          {feature.image ? (
            <img
              alt={feature.title}
              className="relative z-10 h-full w-full object-cover"
              loading="lazy"
              src={feature.image}
            />
          ) : feature.video ? (
            <video
              className="h-full w-full object-cover"
              src={feature.video}
              poster={feature.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ) : (
            <div className="solution-video-placeholder">
              <span className="grid size-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,#FE064D,#FD2479)] shadow-glow">
                <Play className="ml-1 size-7 fill-white text-white" />
              </span>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/52">
                Video 4:5
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductAccess() {
  return (
    <section id="videos" className="phone-showcase-section relative overflow-hidden border-y border-white/10 bg-[#0c080d] py-20 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_54%,rgba(253,36,121,0.18),transparent_34rem)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <p className="section-kicker">Veja no celular</p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-normal leading-tight text-white sm:text-5xl">
              Acesse quando o clima aparecer, sem complicar.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
              O KamaPro funciona no celular, pelo navegador ou como PWA. Simples
              para abrir, discreto para usar e fácil de repetir.
            </p>
          </div>
        </div>
        <div className="relative mt-14 w-full sm:mt-16">
          <div className="brand-orb phone-showcase-orb" aria-hidden="true" />
          <div className="phone-showcase-scroll -mx-5 overflow-x-auto px-5 pb-5 sm:mx-auto sm:overflow-visible sm:px-0 sm:pb-0">
            <div className="phone-showcase-grid mx-auto flex w-max max-w-none items-end gap-5 sm:grid sm:w-auto sm:max-w-5xl sm:grid-cols-3">
              <PhoneShell video={proofVideos[0]} />
              <PhoneShell video={proofVideos[1]} featured />
              <PhoneShell video={proofVideos[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      title: "A conversa destravou",
      quote:
        "A gente queria sair da mesmice, mas não sabia como puxar o assunto. As ideias prontas deixaram tudo mais leve.",
      name: "Marina e Léo",
      meta: "juntos há 6 anos",
      initials: "ML"
    },
    {
      title: "Virou ritual do casal",
      quote:
        "Não parece uma lista fria. A gente abre, escolhe o clima da noite e salva o que combina com o nosso momento.",
      name: "Bia e Rafael",
      meta: "usuários Premium",
      initials: "BR"
    },
    {
      title: "Sem pressao, sem vergonha",
      quote:
        "O melhor foi poder explorar aos poucos. Não teve aquela sensação estranha de pesquisar no impulso e se perder.",
      name: "Casal KamaPro",
      meta: "em fase de redescoberta",
      initials: "KP"
    },
    {
      title: "Mais assunto, mais clima",
      quote:
        "Os favoritos ajudam muito. Quando surge a vontade, a gente já tem um ponto de partida em vez de começar do zero.",
      name: "Lu e André",
      meta: "juntos há 3 anos",
      initials: "LA"
    }
  ];

  return (
    <section className="testimonial-section relative overflow-hidden border-y border-white/10 bg-[#080609] py-20 sm:py-28">
      <div className="absolute left-10 top-10 h-56 w-56 rounded-full bg-white/12 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-kama-red/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-kicker">Depoimentos</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            Casais que não querem uma relação perfeita. Querem uma relação viva.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/58">
            Histórias curtas de quem só precisava de um empurrão elegante para
            voltar a falar sobre desejo, rotina e novas experiências.
          </p>
        </div>
        <div className="testimonial-carousel mt-12 flex gap-6 overflow-x-auto pb-8">
          {testimonials.map((item) => (
            <article className="testimonial-card shrink-0" key={item.name}>
              <div className="flex items-center gap-2 text-kama-pink">
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
              </div>
              <div className="mt-8">
                <h3 className="text-2xl font-extrabold text-white">{item.title}</h3>
                <p className="mt-4 text-lg leading-8 text-white/72">
                  "{item.quote}"
                </p>
              </div>
              <div className="my-7 h-px bg-white/12" aria-hidden="true" />
              <div className="flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-full bg-[linear-gradient(135deg,#FE064D,#FD2479)] text-base font-extrabold text-white shadow-glow">
                  {item.initials}
                </div>
                <div>
                  <p className="font-bold text-white">{item.name}</p>
                  <p className="text-sm text-white/48">{item.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-2 flex justify-center gap-2" aria-hidden="true">
          <span className="h-2 w-8 rounded-full bg-kama-pink" />
          <span className="size-2 rounded-full bg-white/18" />
          <span className="size-2 rounded-full bg-white/18" />
          <span className="size-2 rounded-full bg-white/18" />
        </div>
      </div>
    </section>
  );
}

function Plans() {
  return (
    <section id="planos" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="section-kicker">Comece sem fricção</p>
          <h2 className="section-title">
            Comece grátis. Desbloqueie mais repertório quando quiser ir além.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <PlanCard
            title="Freemium"
            text="Ideal para sentir a proposta e descobrir as primeiras ideias a dois."
            cta="Começar grátis"
            ctaHref={registrationUrl}
            benefits={[
              "Primeiras ideias para testar",
              "Acesso simples pelo celular",
              "Experiência privada"
            ]}
          />
          <PlanCard
            title="Premium"
            text="Para ter mais playlists, histórias, desafios e possibilidades para manter o clima vivo."
            cta="Ver Premium"
            ctaHref={pricingUrl}
            benefits={[
              "Mais repertório para o casal",
              "Playlists e histórias premium",
              "Desafios para quebrar o gelo"
            ]}
            featured
          />
        </div>
      </div>
    </section>
  );
}

function PlanCard({
  title,
  text,
  benefits,
  cta,
  ctaHref,
  featured = false
}: {
  title: string;
  text: string;
  benefits: string[];
  cta: string;
  ctaHref: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`card relative p-7 sm:p-8 ${featured ? "border-kama-red/60 bg-[#1a1017] shadow-glow" : ""}`}
    >
      {featured && (
        <span className="absolute right-5 top-5 rounded-full bg-[linear-gradient(135deg,#FE064D,#FD2479)] px-3 py-1 text-xs font-bold text-white">
          Mais completo
        </span>
      )}
      <h3 className="font-display text-4xl font-normal text-white">{title}</h3>
      <p className="mt-4 max-w-xl text-base leading-7 text-white/60">{text}</p>
      <ul className="mt-8 space-y-4">
        {benefits.map((benefit) => (
          <li className="flex items-center gap-3 text-base font-medium text-white/80" key={benefit}>
            <span className="grid size-6 place-items-center rounded-full bg-kama-red/15 text-kama-pink">
              <Check className="size-4" />
            </span>
            {benefit}
          </li>
        ))}
      </ul>
      <a
        className={`btn mt-9 ${featured ? "btn-primary" : "btn-secondary"}`}
        href={ctaHref}
        onClick={() => trackMetaEvent("CompleteRegistration", `Plano - ${title}`)}
      >
        {cta}
        <ArrowRight className="size-4" />
      </a>
    </article>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-white/10 bg-[#080609] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2 className="section-title">Dúvidas antes de explorar</h2>
          <p className="section-copy">
            O essencial para começar com privacidade, leveza e sem
            constrangimento.
          </p>
        </div>
        <div className="space-y-4">
          {faq.map((item) => (
            <details className="card group p-0" key={item.question} open>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-lg font-bold text-white">
                {item.question}
                <ChevronDown className="size-5 shrink-0 text-kama-pink transition group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-6 text-base leading-7 text-white/60">
                {item.answer}
              </p>
            </details>
          ))}
          <div className="final-cta">
            <WandSparkles className="size-8 text-kama-pink" />
            <h3 className="mt-5 font-display text-4xl font-normal leading-tight text-white">
              Prontos para sair do automático sem perder a leveza?
            </h3>
            <a
              className="btn btn-primary mt-7"
              href={registrationUrl}
              onClick={() => trackMetaEvent("Lead", "FAQ - começar agora")}
            >
              Começar agora
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative mx-auto mt-20 max-w-7xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#100d12] px-6 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.32)] sm:px-8">
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-kama-magenta/20 blur-3xl" />
      <div className="absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              className="size-12 rounded-xl object-cover"
              src={assetUrl("/images/LogoKamaPro.png")}
              alt=""
              aria-hidden="true"
            />
            <span className="text-2xl font-extrabold">
              Kama<span className="text-kama-pink">Pro</span>
            </span>
          </div>
          <p className="mt-5 max-w-md text-base leading-7 text-white/58">
            Um jeito mais leve, privado e organizado de descobrir novas
            experiências a dois.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-kama-pink">
            Navegação
          </p>
          <div className="mt-4 grid gap-3 text-sm text-white/58">
            <a className="transition hover:text-white" href="#top">
              Início
            </a>
            <a className="transition hover:text-white" href="https://kamapro.io/">
              Site principal
            </a>
            <a className="transition hover:text-white" href="#experiencias">
              Experiências
            </a>
            <a className="transition hover:text-white" href="#planos">
              Planos
            </a>
            <a className="transition hover:text-white" href="#faq">
              FAQ
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-kama-pink">
            Comece agora
          </p>
          <a
            className="btn btn-primary mt-4 rounded-full"
            href={registrationUrl}
            onClick={() => trackMetaEvent("Contact", "Footer - descobrir agora")}
          >
            Descobrir agora
            <ArrowRight className="size-4" />
          </a>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-xs leading-5 text-white/38">
            <a className="transition hover:text-white/70" href={privacyUrl}>
              Privacidade
            </a>
            <a className="transition hover:text-white/70" href={termsUrl}>
              Termos
            </a>
            <a className="transition hover:text-white/70" href={supportUrl}>
              Suporte
            </a>
          </div>
        </div>
      </div>
      <div className="relative mt-8 border-t border-white/10 pt-5 text-xs text-white/34">
        © 2026 KamaPro. Todos os direitos reservados.
      </div>
    </footer>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#050407]/90 p-3 backdrop-blur-xl sm:hidden">
      <a
        className="btn btn-primary h-12 w-full justify-center"
        href={registrationUrl}
        onClick={() => trackMetaEvent("Lead", "Mobile sticky - começar grátis")}
      >
        Começar grátis
        <ArrowRight className="size-4" />
      </a>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
