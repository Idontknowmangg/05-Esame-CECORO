// Questo script si basa per le interfacce e classi che servono in futuro in Angular per la visualizzazione corretta della struttura
// Semmai in futuro quello del login che lo lascio al momento commentato
// interface FormLogin {
//     email: string,
//     password: string
// }
// Ovviamente prendiamo tutti gli elementi del form in modo tale che questi dati vengono visti in formato leggibile JSON
var form = document.getElementById("myForm");
var nome = document.getElementById("nomeInput");
var cognome = document.getElementById("cognomeInput");
var sesso = document.getElementById("sessoSelect");
var dataNascita = document.getElementById("dateBirthInput");
var nazione = document.getElementById("nazioneInput");
var citta = document.getElementById("cityInput");
var provincia = document.getElementById("provinceInput");
var codFiscale = document.getElementById("codFiscaleInput");
var cittadinanza = document.getElementById("cittadinanzaInput");
var password = document.getElementById("pswInput");
// Compreso anche i campi per vedere in console
var errorMsg = document.getElementsByClassName("failed_field");
var errorCF = document.getElementsByClassName("failed_cfField");
var successMsg = document.getElementsByClassName("success_field");
// Dichiariamo la classe RegisterForm che implementa l'interfaccia della registrazione
var RegisterForm = /** @class */ (function () {
    // Inizializziamo il costruttore che prende tutti i campi necessari e che formato sono necessari per un futuro corretto invio
    function RegisterForm(nome, cognome, sesso, dataNascita, nazione, citta, provincia, codFiscale, cittadinanza, password) {
        this.nome = nome;
        this.cognome = cognome;
        this.sesso = sesso;
        this.dataNascita = dataNascita;
        this.nazione = nazione;
        this.citta = citta;
        this.provincia = provincia;
        this.codFiscale = codFiscale;
        this.cittadinanza = cittadinanza;
        this.password = password;
    }
    return RegisterForm;
}());
// Inizializziamo anche la classe Login ma che al momento è commentato per forse l'utilizzo in futuro
// class LoginForm implements FormLogin {
//     constructor(
//         public email: string,
//         public password: string
//     ) { }
// }
// Inzializziamo anche una classe dedicata ai campi che quando mal compilati o vuoti intervengano tramite il costruttore che viene usato successivamente
var campoNonValido = /** @class */ (function () {
    function campoNonValido(field, message) {
        this.field = field;
        this.message = message;
    }
    return campoNonValido;
}());
// E ovviamente manca anche la classe di validazione corretta di ciascun campo
var ValidaTutto = /** @class */ (function () {
    function ValidaTutto() {
    }
    // Inizializziamo un metodo della classe per validare il codice fiscale dato
    ValidaTutto.validaCF = function (codFiscale) {
        return this.regExpCF.test(codFiscale);
    };
    // E infine il metodo del validaForm che ha come parametro i dati provenienti dall'interfaccia del register e come risultato se i campi non sono vuoti
    ValidaTutto.validaForm = function (data) {
        // Inizializziamo una variabile di errori in array vuoto per cominciare
        var errors = [];
        // Se il dato nome non ha valore o mancante
        if (!data.nome) {
            // Viene "spinto" o lanciato l'errore e il messaggio
            errors.push(new campoNonValido("nome", "Il campo Nome è obbligatorio"));
        }
        // Se il dato cognome non ha valore o mancante
        if (!data.cognome) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("cognome", "Il campo Cognome è obbligatorio"));
        }
        // Se il dato sesso non ha valore o mancante
        if (!data.sesso) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("sesso", "Il campo Sesso è obbligatorio"));
        }
        // Se il dato dataNascita non ha valore o mancante
        if (!data.dataNascita) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("dataNascita", "Il campo Data di nascita è obbligatoria"));
        }
        // Se il dato nazione non ha valore o mancante
        if (!data.nazione) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("nazione", "Il campo Nazione è obbligatoria"));
        }
        // Se il dato citta non ha valore o mancante
        if (!data.citta) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("citta", "Il campo Città è obbligatoria"));
        }
        // Se il dato provincia non ha valore o mancante
        if (!data.provincia) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("provincia", "Il campo Provincia è obbligatoria"));
        }
        // Se il dato del codice fiscale che inizialmente viene passato al metodo che non ha valore o mancante o non rispetta il formato
        if (!this.validaCF(data.codFiscale)) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("codFiscale", "Il campo del Codice Fiscale non è valido"));
        }
        // Se il dato cittadinanza non ha valore o mancante
        if (!data.cittadinanza) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("cittadinanza", "Il campo Cittadinanza è obbligatoria"));
        }
        // Se il dato password non ha valore o mancante
        if (!data.password) {
            // Viene "spinto" o lanciato l'errore e il messaggios
            errors.push(new campoNonValido("password", "Il campo Password è obbligatoria"));
        }
        // E infine ritorna tutti gli errori se ci sono altrimenti no
        return errors;
    };
    // Inizializziamo l'espressione regolare del codice fiscale
    ValidaTutto.regExpCF = /^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/i;
    return ValidaTutto;
}());
// Aggiungiamo un ascoltatore di eventi al form a base di submit
form.addEventListener("submit", function (event) {
    // Prendiamo l'evento e fermiamo il comportamento predefinito
    event.preventDefault();
    /**
     * Dichiariamo la costante che ha come tipo di dato del form di registrazione e che ha come dichiarazione del valore la classe
     * (che diventa appunto l'istanza), e viene passato tutti i dati presenti globalmente
     */
    var data = new RegisterForm(nome.value, cognome.value, sesso.value, dataNascita.value, nazione.value, citta.value, provincia.value, codFiscale.value, cittadinanza.value, password.value);
    // Ovviamente verifichiamo anche gli errori
    var errors = ValidaTutto.validaForm(data);
    // Se non ha subito gli errori
    if (errors.length === 0) {
        // Dirà che il form è valido e che tutti questi dati vengono raggruppati in JSON
        console.log("Form validato con successo", JSON.stringify(data));
    }
    else {
        // Altrimenti, vengono o viene lanciato un errore o più errori in console in quale campo e il messaggio per quel campo
        errors.forEach(function (error) { return console.error("".concat(error.field, ": ").concat(error.message)); });
    }
}, false);
