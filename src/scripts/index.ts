Hooks.on(
  "renderActorSheet",
  (sheet: ActorSheet, elSheet: JQuery<HTMLDivElement>) => {
    const { user } = game as Game;
    const { actor } = sheet;

    if (!user || !actor.canUserModify(user, "update")) {
      ui.notifications?.error(
        "You must be the owner of a sheet to import a character."
      );
      return;
    } else if (actor.data.type !== "character") {
      ui.notifications?.error(
        `You can only import a character into a character sheet, not a ${actor.data.type} sheet`
      );
      return;
    }
  }
);
