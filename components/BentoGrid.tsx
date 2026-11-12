import * as React from "react";
import Image from "next/image";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";

const cardOuterClassName =
  "relative h-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-[40px]";

const CardGlowOverlay = () => (
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at 0% 0%, transparent 55%), radial-gradient(circle at 100% 100%, #f5650c45, transparent 55%)",
    }}
  />
);

const HowItWorksCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={`${cardOuterClassName} ${className ?? ""}`}>
    <CardGlowOverlay />
    <div className="relative z-10 flex h-full flex-col p-6 md:p-8">
      {children}
    </div>
  </div>
);

const DescribeIdeaCard = () => (
  <HowItWorksCard className="md:h-[304px]">
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EC4E02]">
          Step 1
        </p>
        <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
          Describe your idea naturally
        </h3>
      </div>
      <p className="max-w-md text-sm text-slate-300/85">
        Whether it&apos;s a web app, mini game, story, or smart contract,
        just explain it in plain language - we&apos;ll handle the rest.
      </p>
      <div className="mt-8 overflow-hidden">
        <Image
          src="/bento/step1.svg"
          alt="Describe your idea naturally"
          width={2000}
          height={2000}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </HowItWorksCard>
);

const CreateAppsCard = () => (
  <HowItWorksCard className="md:h-[535px]">
    <div className="flex h-full flex-col">
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EC4E02]">
          Step 2
        </p>
        <h3 className="text-2xl font-bold leading-snug text-white md:text-3xl">
          Trade Tokens Seamlessly
        </h3>
        <p className="max-w-xl text-sm text-white/40 md:text-base">
          Instantly buy or sell any app token. Powered by secure Web3 liquidity.
        </p>
      </div>

      <div className="mt-8 flex flex-1 items-end justify-center">
        <Image
          src="/bento/step2.svg"
          alt="Create apps and assets effortlessly"
          width={560}
          height={600}
        />
      </div>
    </div>
  </HowItWorksCard>
);

const RemixTokensCard = () => (
  <HowItWorksCard className="md:h-[559px]">
    <div className="flex h-full flex-col gap-4">
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EC4E02]">
          Step 3
        </p>
        <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
          Launch Tokens
        </h3>
        <p className="max-w-md text-sm text-slate-300/85">
          Pick any AI-built project, launch your own utility token to power it.

        </p>
      </div>

      <div className="mt-2 flex flex-1 items-end justify-between gap-4">
        <div className="flex-1 overflow-hidden">
          <Image
            src="/bento/sttep3.png"
            alt="Remix and launch with tokens"
            width={320}
            height={360}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  </HowItWorksCard>
);

const DeployInstantlyCard = () => (
  <HowItWorksCard className="md:h-[328px]">
    <div className="flex h-full flex-col gap-4">
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#EC4E02]">
          Step 4
        </p>
        <h3 className="text-xl font-bold leading-snug text-white md:text-2xl">
          Deploy instantly
        </h3>
        <p className="text-sm text-white/40 md:text-base">
          Go from idea to live app in minutes. Publish, test, and share your
          AI-powered creations without leaving the browser.
        </p>
      </div>

      <div className="mt-2 flex flex-1 items-end justify-center overflow-hidden">
        <Image
          src="/bento/sttep4.png"
          alt="Deploy instantly"
          width={900}
          height={900}
        />
      </div>
    </div>
  </HowItWorksCard>
);

export default function BentoGridShowcaseDemo() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-20 xl:px-[240px] py-[105px] ">
      <div className="w-full">
        <div className="mb-20 text-center max-w-3xl mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-[#EC4E02]' : i === 2 ? 'bg-[#FF8A3C]' : 'bg-[#FFB082]'}`} />
              ))}
            </div>
            <span className="text-[9px] font-black text-[#EC4E02] uppercase tracking-[0.4em]">Protocol: Workflow_Engine</span>
          </div>

          <h2
            className="text-4xl xs:text-5xl md:text-6xl font-semibold text-white mb-8 tracking-tight leading-[1.1]"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            <span className="font-pixelify">H</span>ow <span className="font-pixelify">I</span>t <span className="font-pixelify">W</span>orks
          </h2>

          <p className="text-base md:text-lg text-white/40 font-light leading-relaxed max-w-2xl mx-auto">
            Describe your idea once. We&apos;ll help you bridge, remix, and deploy
            <br className="hidden md:block" />
            complete nodes into the Vibe ecosystem in a few guided steps.
          </p>
        </div>

        <BentoGridShowcase
          describe={<DescribeIdeaCard />}
          create={<CreateAppsCard />}
          remix={<RemixTokensCard />}
          deploy={<DeployInstantlyCard />}
        />
      </div>
    </div>
  );
}
