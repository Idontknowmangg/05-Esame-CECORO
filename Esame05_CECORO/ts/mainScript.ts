// Questo script si basa per le interfacce e classi che servono in futuro in Angular per la visualizzazione corretta della struttura

// Inizializziamo il form di registrazione
interface FormRegister {
    nome: string,
    cognome: string,
    sesso: string,
    dataNascita: string,
    nazione: string,
    citta: string,
    provincia: string,
    codFiscale: string,
    cittadinanza: string,
    password: string
}


// Semmai in futuro quello del login che lo lascio al momento commentato

// interface FormLogin {
//     email: string,
//     password: string
// }


// Ovviamente prendiamo tutti gli elementi del form in modo tale che questi dati vengono visti in formato leggibile JSON
const form = document.getElementById("myForm");
const nome = document.getElementById("nomeInput") as HTMLInputElement;
const cognome = document.getElementById("cognomeInput") as HTMLInputElement;
const sesso = document.getElementById("sessoSelect") as HTMLSelectElement;
const dataNascita = document.getElementById("dateBirthInput") as HTMLDataElement;
const nazione = document.getElementById("nazioneInput") as HTMLSelectElement;
const citta = document.getElementById("cityInput") as HTMLInputElement;
const provincia = document.getElementById("provinceInput") as HTMLInputElement;
const codFiscale = document.getElementById("codFiscaleInput") as HTMLInputElement;
const cittadinanza = document.getElementById("cittadinanzaInput") as HTMLInputElement;
const password = document.getElementById("pswInput") as HTMLInputElement;

// Compreso anche i campi per vedere in console
const errorMsg = document.getElementsByClassName("failed_field") as HTMLCollectionOf<HTMLElement>;
const errorCF = document.getElementsByClassName("failed_cfField") as HTMLCollectionOf<HTMLElement>;
const successMsg = document.getElementsByClassName("success_field") as HTMLCollectionOf<HTMLElement>;


// Dichiariamo la classe RegisterForm che implementa l'interfaccia della registrazione
class RegisterForm implements FormRegister {
    // Inizializziamo il costruttore che prende tutti i campi necessari e che formato sono necessari per un futuro corretto invio
    constructor(
        public nome: string,
        public cognome: string,
        public sesso: string,
        public dataNascita: string,
        public nazione: string,
        public citta: string,
        public provincia: string,
        public codFiscale: string,
        public cittadinanza: string,
        public password: string
    ) { }
}

// Inizializziamo anche la classe Login ma che al momento è commentato per forse l'utilizzo in futuro
// class LoginForm implements FormLogin {
//     constructor(
//         public email: string,
//         public password: string
//     ) { }
// }


// Inzializziamo anche una classe dedicata ai campi che quando mal compilati o vuoti intervengano tramite il costruttore che viene usato successivamente
class campoNonValido {
    constructor(public field: string, public message: string) { }
}

// E ovviamente manca anche la classe di validazione corretta di ciascun campo
class ValidaTutto {
    // Inizializziamo l'espressione regolare del codice fiscale
    static regExpCF: RegExp = /^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/i;

    // Inizializziamo un metodo della classe per validare il codice fiscale dato
    static validaCF(codFiscale: string) {
        return this.regExpCF.test(codFiscale)
    }

    // E infine il metodo del validaForm che ha come parametro i dati provenienti dall'interfaccia del register e come risultato se i campi non sono vuoti
    static validaForm(data: FormRegister): campoNonValido[] {
        // Inizializziamo una variabile di errori in array vuoto per cominciare
        let errors: campoNonValido[] = [];

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
    }
}


// Aggiungiamo un ascoltatore di eventi al form a base di submit
form.addEventListener("submit", function (event) {
    // Prendiamo l'evento e fermiamo il comportamento predefinito
    event.preventDefault();

    /**
     * Dichiariamo la costante che ha come tipo di dato del form di registrazione e che ha come dichiarazione del valore la classe
     * (che diventa appunto l'istanza), e viene passato tutti i dati presenti globalmente
     */
    const data: FormRegister = new RegisterForm(
        nome.value,
        cognome.value,
        sesso.value,
        dataNascita.value,
        nazione.value,
        citta.value,
        provincia.value,
        codFiscale.value,
        cittadinanza.value,
        password.value
    );

    // Ovviamente verifichiamo anche gli errori
    const errors = ValidaTutto.validaForm(data);

    // Se non ha subito gli errori
    if (errors.length === 0) {
        // Dirà che il form è valido e che tutti questi dati vengono raggruppati in JSON
        console.log("Form validato con successo", JSON.stringify(data));
    } else {
        // Altrimenti, vengono o viene lanciato un errore o più errori in console in quale campo e il messaggio per quel campo
        errors.forEach(error => console.error(`${error.field}: ${error.message}`));
    }
}, false);

