import Link from "@components/Common/Link";
import styles from "./index.module.scss";
import clsx from "clsx";
import DiscordLink from "@components/MainLayout/DiscordLink";

export interface MainLayoutProps {
  className?: string;
  children?: React.ReactNode;
  // ...props
  style?: React.CSSProperties;
}

export default function MainLayout({ className, children, ...props }: MainLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" underline={false} className={styles.logo}>
          <img src="/logo-long.png" alt="RogueLibs' logo" />
        </Link>
      </div>
      <div className={clsx(styles.body, className)} {...props}>
        {children}
      </div>
      <div className={styles.footer}>
        <div>
          <label>{"Other stuff"}</label>
          <Link href="/about">{"About RogueLibs"}</Link>
          <Link href="https://github.com/Dzhake/roguelibs-web">{"Website's source repo"}</Link>
        </div>
        <div>
          <label>{"Guides and Information"}</label>
          <Link href="/docs/user-guide/installation">{"Installing mods"}</Link>
          <Link href="/docs/user-guide/troubleshooting">{"Troubleshooting"}</Link>
          <Link href="/docs/getting-started/installation">{"Developing mods"}</Link>
        </div>
        <div>
          <label>{"Tools"}</label>
          <Link href="/tools/chunk-difficulty-calculator">{"Chunk difficulty calculator"}</Link>
        </div>
        <div>
          <label>{"Streets of Rogue"}</label>
          <DiscordLink>{"SoR on Discord"}</DiscordLink>
          <Link href="https://store.steampowered.com/app/512900">{"SoR on Steam"}</Link>
          <Link href="https://gamebanana.com/games/8455">{"SoR on GameBanana"}</Link>
          <Link href="https://streetsofrogue.fandom.com">{"SoR wiki"}</Link>
          <Link href="https://streetsofrogue.com">{"SoR website"}</Link>
        </div>
      </div>
    </div>
  );
}
