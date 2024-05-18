import Image from "next/image";
import HeroNavigate from "./HeroNavigate";

function Hero() {
  return (
    <section className="bg-gray-50 flex flex-col items-center dark:bg-background">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Manage Your Budget
            <strong className="font-extrabold text-primary sm:block">
              Control your Money
            </strong>
          </h1>

          <p className="mt-4 sm:text-base text-muted-foreground">
            Kickstart your budget planning and see your savings soar with our
            app!
          </p>

          <HeroNavigate />
        </div>
      </div>

      <Image
        src={"/budget_tracker.png"}
        alt="dashboard"
        width={1000}
        height={700}
        className="-mt-5 rounded-2xl border-2"
      />
    </section>
  );
}

export default Hero;
