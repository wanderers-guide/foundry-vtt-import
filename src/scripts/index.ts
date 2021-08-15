Hooks.on(
  "renderActorSheet",
  (sheet: ActorSheet, elSheet: JQuery<HTMLDivElement>) => {
    const { user } = game as Game;
    const { actor } = sheet;

    if (
      actor.data.type !== "character" ||
      !user ||
      !actor.canUserModify(user, "update")
    ) {
      return;
    }
  }
);
