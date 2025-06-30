"use client";
import styles from "./page.module.scss";
import Link from "@components/Common/Link";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Link href="/docs/user-guide/installation">{"Installation guide"}</Link>
      <Link href="/docs/getting-started/installation">{"Mod developer documentation"}</Link>
    </div>
  );
}
