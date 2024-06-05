// Questo script si basa sempre sui campi ma a base di icone, significa che se viene inviato i campi vuoti, vengono comparse queste icone di Bootstrap che rende la navigazione accogliente e intuitiva
// Assicuriamo inanzittutto che tutto il DOM sia caricato completamente ed esegue la funzione
document.addEventListener("DOMContentLoaded", function () {
    // Prendiamo tutti gli elementi che hanno come attributo "data-bs-toggle="popover" che però inizialmente è una nodeList che sarebbe un simile dell'array"
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    // Inizializziamo un popover ciascuno elemento nell'array (mappando) utilizzando bootstrap.Popover
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new window.bootstrap.Popover(popoverTriggerEl);
    });
    // Prendiamo l'id della password e il toggle (che serve per l'occhio)
    var passwordInput = document.getElementById("pswInput");
    var togglePasswordButton = document.getElementById("togglePassword");
    // Aggiungiamo al toggle l'ascoltatore di eventi a base di click
    togglePasswordButton === null || togglePasswordButton === void 0 ? void 0 : togglePasswordButton.addEventListener("click", function () {
        // L'id prende l'attributo di quale tipo di visualizzazione di testo deve essere, se il tipo è password, allora viene messo in modalità "text" altrimenti di default "password"
        var type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        // Infine lo "settiamo" o mettiamo 
        passwordInput.setAttribute("type", type);
    });
    // Prendiamo tutti gli elementi che hanno come attributo "data-bs-toggle="tooltip"
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    // Inizializziamo un tooltip necessario per l'elemento specifico nell'array (mappando) utilizzando bootstrap.Tooltip
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) { return new window.bootstrap.Tooltip(tooltipTriggerEl); });
    // Inizializziamo la var in cui prende l'input codFiscale
    var codFiscaleInput = document.getElementById("codFiscaleInput");
    // Inizializziamo un exp regex
    var regexCF = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
    // Funzione della validazione del codice fiscale
    function validateCodFiscale() {
        // Controlliamo se il campo è vuoto
        if (codFiscaleInput.value === "") {
            codFiscaleInput.classList.remove("is-valid");
            codFiscaleInput.classList.add("is-invalid");
            return false;
        }
        // Validiamo il campo con l'espressione regolare
        if (codFiscaleInput.value.match(regexCF)) {
            codFiscaleInput.classList.remove("is-invalid");
            codFiscaleInput.classList.add("is-valid");
            return true;
        }
        else {
            codFiscaleInput.classList.remove("is-valid");
            codFiscaleInput.classList.add("is-invalid");
            return false;
        }
    }
    // Aggiungiamo all'event listener la funzione input e la funzione appena creata passata
    codFiscaleInput.addEventListener("input", validateCodFiscale);
    // Validazione del form a base di icone
    // Callback
    (function () {
        // Costante del form prendendo la classe needs-validation
        var forms = document.querySelectorAll(".needs-validation");
        // Convertiamo un oggetto simile ad un'array (nodeList) in un vero array
        [].slice.call(forms).forEach(function (form) {
            // Aggiungiamo un ascoltatore di eventi che prende solamente il submit
            form.addEventListener("submit", 
            // Prendiamo una callback che ha come parametro event
            function (event) {
                // Preveniamo il comportamento default della pagina
                event.preventDefault();
                // Controlliamo se il form è diverso da false (!) il controllo del form
                if (!form.checkValidity()) {
                    // Se sì, previene il comportamento default della pagina
                    event.preventDefault();
                    // Fermiamo immediatamente la propagazione perché visto che ci sono altri elementi di ascoltatore di eventi, evitiamo che vengano eseguiti anche quelli
                    event.stopPropagation();
                }
                validateCodFiscale(); // Utilizziamo la funzione
                // Infine aggiungiamo la classe "was-validated" per attivare gli stili di Bootstrap
                form.classList.add("was-validated");
            }, false);
        });
    })();
});
