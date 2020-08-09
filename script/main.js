"use strict";

console.log("Jquery Version", jQuery.fn.jquery);

$(function () {
  // Initialise la selection a 0 dans un objet
  const selection = {
    start: { l: 0, c: 0 },
    end: { l: 0, c: 0 },
  };

  const cell = $("table td");
  let active = false;

  /**
   *Fonction permetant d'ajouter la classe .selected sur less cellules
   */
  function updateSelection(cible) {
    // mise à jour en cours
    selection.end.l = cible.parentNode.rowIndex - 1;
    selection.end.c = cible.cellIndex;

    // Permet d'initialiser Top Droit Left Bottoom
    let g = Math.min(selection.start.c, selection.end.c);
    let d = Math.max(selection.start.c, selection.end.c);
    let t = Math.min(selection.start.l, selection.end.l);
    let b = Math.max(selection.start.l, selection.end.l);

    //Loop permetant d'ajouter la classe
    cell.each((ind, cible) => {
      // récup. position
      let lig = cible.parentNode.rowIndex - 1;
      let col = cible.cellIndex;
      if (lig >= t && lig <= b && col >= g && col <= d) {
        cible.classList.add("selected");
      } else {
        cible.classList.remove("selected");
      }
    });
  }
  /**
   * Gestion des événements
   */
  cell.on("mousedown", (evt) => {
    active = true;

    //Permet d'aller ccchercher la position de depart
    let cible = evt.target;
    selection.start.l = cible.parentNode.rowIndex - 1;
    selection.start.c = cible.cellIndex;

    // mise à jour sélection
    updateSelection(cible);

    console.log("START", selection.start.l, selection.start.c);
  });
  //Ajout event listener mouseover
  cell.on("mouseover", (evt) => {
    if (active) {
      updateSelection(evt.target);
    }
  });

  // c
  $(document).on("mouseup", () => {
    active = false;
    console.log("END :", selection.end.l, selection.end.c);
  });
});
