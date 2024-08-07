"use client";
import { Highlight, Prism } from "prism-react-renderer";
import { Children, useEffect, useId, useMemo, useState } from "react";
import styles from "./index.module.scss";
import clsx from "clsx";
import IconButton from "@components/Common/IconButton";
import Icon from "@components/Common/Icon";
import Tooltip from "@components/Common/Tooltip";

(typeof global !== "undefined" ? global : window).Prism = Prism;

export interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  lang?: string;
  wrap?: boolean;
  nocopy?: boolean;
  nonums?: boolean;
  className?: string;
  children?: React.ReactNode;
  // ...props
  style?: React.CSSProperties;
}

export default function CodeBlock({
  title,
  lang,
  wrap,
  nocopy,
  nonums,
  className,
  children,
  ...props
}: CodeBlockProps) {
  const code = useMemo(() => stringifyChildren(children).join("\n"), [children]);
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    try {
      lang = usefulAliases[lang!] ?? lang;
      if (lang) {
        (async () => {
          await import("prismjs/components/prism-" + lang);
          setLanguage(lang);
        })();
      }
    } catch (err) {
      console.error(`"${lang}" is not a valid PrismJS language.`);
      setLanguage(null);
    }
  }, [lang]);

  return (
    <div role="panel" className={clsx(styles.block, className)} {...props}>
      {title && <div className={styles.title}>{title}</div>}
      {language ? (
        <Highlight code={code} language={language}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <div className={styles.contents}>
              <pre className={clsx(styles.pre, className)} style={style}>
                <code className={clsx(wrap && styles.wrap, nonums || styles.withLineNumbers)}>
                  {tokens.map((line, index) => (
                    <span key={index} className={styles.line}>
                      {nonums || <span className={styles.lineNumber} />}
                      <span {...getLineProps({ line })}>
                        {line.map((token, index) => {
                          return <span key={index} {...getTokenProps({ token })} />;
                        })}
                      </span>
                    </span>
                  ))}
                </code>
              </pre>
              {nocopy || <CopyButton code={code} />}
            </div>
          )}
        </Highlight>
      ) : (
        <div className={styles.contents}>
          <pre className={styles.pre}>
            <code className={clsx(wrap && styles.wrap, nonums || styles.withLineNumbers)}>
              {code.split("\n").map((line, index) => (
                <span key={index} className={styles.line}>
                  {nonums || <span className={styles.lineNumber} />}
                  <span>{line}</span>
                </span>
              ))}
            </code>
          </pre>
          {nocopy || <CopyButton code={code} />}
        </div>
      )}
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const id = useId();
  return (
    <>
      <IconButton
        data-tooltip-id={id}
        className={styles.copyButton}
        onClick={() => navigator.clipboard.writeText(code)}
      >
        <Icon type="copy" size={24} alpha={0.5} />
        <Tooltip id={id} openOnClick content="Copied!" place="left" />
      </IconButton>
    </>
  );
}

// remove legacy Docusaurus line highlighting directives
const highlightLineRegex = /^\s*\/\/ highlight-/;

function stringifyChildren(children: any, results: string[] = []) {
  for (const child of Children.toArray(children)) {
    if (typeof child !== "boolean" && typeof child !== "undefined" && child !== null) {
      if ((child as any).type === "code") {
        stringifyChildren((child as any).props.children, results);
      } else {
        const lines = ("" + child).split("\n").filter(l => !highlightLineRegex.test(l));
        if (!lines.at(-1)) lines.pop();
        results.push(...lines);
      }
    }
  }
  return results;
}

const usefulAliases: Record<string, string | undefined> = {
  js: "javascript",
  ts: "typescript",
  cs: "csharp",
  sln: "markup",
  csproj: "markup",
  url: "uri",
  xml: "markup",
  html: "markup",
  svg: "markup",
  yml: "yaml",
  md: "markdown",
  mdx: "markdown",
  sh: "bash",
  shell: "bash",
  ps: "powershell",
  py: "python",
};
