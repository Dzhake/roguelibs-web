import styles from "./page.module.scss";
import SetCanonicalUrl from "@components/Specialized/SetCanonicalUrl";

export default async function AboutPage() {

  return (
    <div className={styles.container}>
      <div className={styles.header}>{"About RogueLibs"}</div>
      <div className={styles.description}>
        <p>
          {`RogueLibs is a mod-sharing platform dedicated to enhancing gaming experiences for players of all levels. Our platform offers a community-centered approach to modding, where mod enthusiasts can collaborate, discuss new features, and share user-generated content seamlessly.`}
        </p>
        <p>
          {`We pride ourselves in providing a safe, inclusive, and supportive environment for our users, where creativity and innovation reign. Whether you're looking to customize your gameplay or add new features to your favorite games, RogueLibs has got you covered.`}
        </p>
        <p>
          {`At RogueLibs, we're committed to fostering a culture of exploration and experimentation, allowing modders to push the limits of creative expression and realize their visions for the gaming industry's future.`}
        </p>
        <p>
          {`Join us today and become part of this vibrant, dynamic community of mod enthusiasts from around the world!`}
        </p>
        <span className={styles.footnote}>{"Generated by ChatGPT"}</span>
      </div>
      <div className={styles.header}>{"Contributors: Abbysssal, Dzhake, TBB"}</div>
      <SetCanonicalUrl url="/about" />
    </div>
  );
}
