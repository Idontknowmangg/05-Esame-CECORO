// Questo script si basa sul form dove ha come "template" di real-time, questo concetto significa che quando l'utente cancella del tutto il dato dal campo, notifica l'utente che manca quel campo e se rispetta il campo, viene lanciato il messaggio di successo senza che tutto questo invii
// Iniziamo con il caricare del tutto il DOM
document.addEventListener("DOMContentLoaded", function () {
    // Prendiamo il form tramite l'ID
    var form = document.getElementById("myForm");
    // Verifichiamo se esiste nel DOM
    if (!form) {
        // Se non esiste, lancia l'eccezione in console
        console.error("Impossibile trovare il form con l'ID 'myForm'");
        return;
    }
    // Se tutto va bene, prendiamo tutti i campi esistenti nel form
    var requiredFields = form.querySelectorAll("input, select");
    // Dichiariamo l'espressione regolare
    var regexCF = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
    // Prendiamo il campo specifico
    var codFiscaleInput = document.getElementById("codFiscaleInput");
    // Aggiungiamo un EventListener a base di submit con la function che ha come paramtro event per fermare il default behaviour (praticamente invece di ricaricare la pagina la pagina rimane fissa finché va tutto bene e si procede)
    form.addEventListener("submit", function (event) {
        // "Stoppiamo" o fermiamo il comportamento predefinito
        event.preventDefault();
        // Inizializziamo il form che sia valido
        var formValid = true;
        // Cicliamo tutti i campi che ha come parametro il forEach di nome field (che sarebbe campo in inglese)
        requiredFields.forEach(function (field) {
            var _a, _b;
            // E dichiariamo 2 costanti che sono dei messaggi che indicano all'utente se è un errore o di successo
            var failedField = (_a = field.closest(".mb-3")) === null || _a === void 0 ? void 0 : _a.querySelector(".failed_field");
            var successField = (_b = field.closest(".mb-3")) === null || _b === void 0 ? void 0 : _b.querySelector(".success_field");
            // E prendiamo anche il valore del campo che viene poi "trimmato" o cancellato gli spazi bianchi presenti nel campo
            var value = field.value.trim();
            // Verifichiamo per sicurezza se esistono questi campi, se sì, vengono inizializzati come vuoto altrimenti nella pagina ci sono già gli errori senza motivo
            if (failedField)
                failedField.textContent = "";
            if (successField)
                successField.textContent = "";
            // Se il valore del campo (qualsiasi) non è immesso o mancante
            if (!value) {
                // Il form diventa falso
                formValid = false;
                // Se esiste il messaggio di fallimento
                if (failedField) {
                    // Viene lanciato il messaggio e viene visto in modalità "block"
                    failedField.textContent = "REQUIRED Questo campo è obbligatorio";
                    failedField.style.display = "block";
                }
                // Altrimenti, se il valore esiste
            }
            else {
                // Verifichiamo se esiste il messaggio di successo
                if (successField) {
                    // Viene lanciato il messaggio di successo e viene visto in modalità "block"
                    successField.textContent = "Hai compilato correttamente il campo";
                    successField.style.display = "block";
                }
            }
            // Prendiamo un campo specifico e con l'operatore AND ("&&") verifichiamo anche se il valore non rispetta il regex
            if (field === codFiscaleInput && !value.match(regexCF)) {
                // Diventa false il form
                formValid = false;
                // Se esiste il messaggio di fallimento
                if (failedField) {
                    // Viene lanciato il messaggio del codice fiscale e viene visto in modalità "block"
                    failedField.textContent = "Questo campo non rispetta l'espressione data dal tooltip";
                    failedField.style.display = "block";
                }
            }
        });
        // Se tutto rimane intatto e senza errori (il form è rimasto sempre true)
        if (formValid) {
            // Allora in console dice che è valido
            console.log("Il form è valido");
            // // E viene reindirizzato alla pagina successiva
            // window.location.href = "success.html";
        }
        else {
            // Altrimenti, se non rispetta tutte quelle condizioni precedenti date, passa a questo blocco che viene visto l'errore del form non valido
            console.error("Il form non è valido");
        }
    });
    // Il secondo ciclo che viene ripetuto, serve per rendere in tempo reale il form, perché così, quando l'utente lo lascia vuoto cancellando del tutto, viene già notificato prima invece di inviare quando non è necessario.
    requiredFields.forEach(function (field) {
        field.addEventListener("input", function () {
            var _a, _b;
            var failedField = (_a = field.closest(".mb-3")) === null || _a === void 0 ? void 0 : _a.querySelector(".failed_field");
            var successField = (_b = field.closest(".mb-3")) === null || _b === void 0 ? void 0 : _b.querySelector(".success_field");
            var value = field.value.trim();
            if (failedField)
                failedField.textContent = "";
            if (successField)
                successField.textContent = "";
            if (!value) {
                if (failedField) {
                    failedField.textContent = "REQUIRED Questo campo è obbligatorio";
                    failedField.style.display = "block";
                }
            }
            else {
                if (successField) {
                    successField.textContent = "Hai compilato correttamente il campo";
                    successField.style.display = "block";
                }
            }
            if (field === codFiscaleInput && !value.match(regexCF)) {
                if (failedField) {
                    failedField.textContent = "Questo campo non rispetta l'espressione data dal tooltip";
                    failedField.style.display = "block";
                }
            }
        });
    });
});
