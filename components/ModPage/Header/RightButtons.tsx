import { useModPage } from "@components/ModPage";
import styles from "./RightButtons.module.scss";
import Button from "@components/Common/Button";
import Icon from "@components/Common/Icon";
import clsx from "clsx";
import { useEffect, useId, useState } from "react";
import Popup from "@components/Common/Popup";
import { useApi } from "@lib/API.Hooks";
import Tooltip from "@components/Common/Tooltip";
import { arrayToggle } from "@lib/utils/misc";

export default function ModPageRightButtons() {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <NuggetButton />
        <SubscriptionButton />
        <MiscButton />
      </div>
    </div>
  );
}

export function NuggetButton() {
  const { mod, mutateMod } = useModPage();
  const api = useApi();
  const tooltipId = useId();

  const [loading, setLoading] = useState(false);
  const [myNugget, setMyNugget] = useState(api.currentUser?.nuggets.includes(mod.id));

  useEffect(() => {
    setMyNugget(api.currentUser?.nuggets.includes(mod.id));
  }, [api.currentUser]);

  async function toggleNugget() {
    if (loading || !api.currentUser) return;
    setLoading(true);
    try {
      const newNuggetCount = await api.setModNugget(mod.id, !myNugget);
      mutateMod(m => void (m.nugget_count = newNuggetCount));
      setMyNugget(!myNugget);
      arrayToggle(api.currentUser!, "nuggets", mod.id, !myNugget);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      data-tooltip-id={tooltipId}
      className={clsx(styles.nuggetButton, myNugget && styles.setNugget)}
      onClick={toggleNugget}
    >
      <Icon type={loading ? "loading" : "nugget"} alpha={loading || myNugget ? 1 : 0.5} />
      {mod.nugget_count}
      {!api.currentUser && (
        <Tooltip
          id={tooltipId}
          place="left"
          openOnClick
          variant="error"
          content="You mush sign in to rate mods!"
          delayHide={3000}
        />
      )}
    </Button>
  );
}

export function SubscriptionButton() {
  const { mod } = useModPage();

  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  async function toggleSubscription() {
    if (loading) return;
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setSubscribed(!subscribed);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className={clsx(styles.subscriptionButton, subscribed && styles.setSubscription)}
      onClick={toggleSubscription}
    >
      <Icon type={loading ? "loading" : "check"} alpha={loading || subscribed ? 1 : 0.5} />
      {subscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
}

export function MiscButton() {
  const { mod } = useModPage();
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button data-tooltip-id={id} className={styles.miscButton} onClick={() => setIsOpen(b => !b)}>
        <Icon type="options_vert" />
      </Button>
      <Popup id={id} open={[isOpen, setIsOpen]} className={styles.miscMenu} noArrow offset={4}>
        {() => (
          <>
            <Button>
              <Icon type="edit" size={16} />
              {"Report mod"}
            </Button>
            <Button>
              <Icon type="copy" size={16} />
              {"View JSON data"}
            </Button>
          </>
        )}
      </Popup>
    </>
  );
}
