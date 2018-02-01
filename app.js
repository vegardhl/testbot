var builder = require('botbuilder'); 
var restify = require('restify');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var apiairecognizer = require('api-ai-recognizer'); 
//var connector = new builder.ConsoleConnector().listen(); 
var bot = new builder.UniversalBot(connector); 
var recognizer = new apiairecognizer('a2009d0d7c6947ff9ad9dd7c74f0847b'); 
var intents = new builder.IntentDialog({ recognizers: [recognizer] }); 

/* LAGE EN OPPSTARTSMELDING / VELKOMSTMELDING */


bot.dialog('/',intents); 

server.post('webhook', function(req, res){

    var reply = "dette er ftballtesten";

    return res.status(200).json({
        source: 'webhook',
        speech: reply,
        displaytext: reply
    });

});

// INTENTENE...

intents.matches('sayHello',function(session,args){
    session.send("Hei! jeg er chatbot, hva kan jeg hjelpe deg med?"); 
});


intents.matches('graDokumenterDokumentlista',function(session,args){
    session.send("I Aktørportalen er dokumentene enten markert med fet skrift, normal skrift eller grå skrift. Alle lesbare dokumenter (dokumenter som finnes i PDF) svarte og trykkbare slik at du får mulighet til å lese/laste dem ned. De med fet skrift er dokumenter du ikke har trykket deg inn for å lese ennå, men de med normal skrift er lest. De grå dokumentene er filer som ikke finnes elektronisk, eller dokumenter som er feilført. Om du holder musepekeren over den grå teksten vil du få opp melding om at dokumentet enten ikke finnes i elektronisk versjon, eller at det er feilført av domstolen."); 
});

intents.matches('sendtFeilDokument',function(session,args){
    session.send("Det er ikke mulig å redigere eller slette dokumenter du har lastet opp i Aktørportalen, verken hoveddokument eller bilag. Om du har sendt inn feil dokument eller dokument med feil innhold, bes du ta kontakt med domstolen slik at de kan feilføre dokumentet som er feilsendt eller inneholder feil, og du kan sende inn dokumentene på nytt."); 
});

intents.matches('rettsmotePauseNarIngenPause',function(session,args){
    session.send("I stykkprissaker må en angi klokkeslett på start- og slutt-tidspunkt for pauser i rettsmøter, selv om det ikke har vært avholdt pause under rettsmøtet. Hvis en prøver å fylle samme klokkeslett for start og slutt feiler valideringen. Det betyr at det f.eks. må settes start til 11:00 og slutt til 11:01 i feltene for pause, selv om det ikke har vært pause. "); 
});

intents.matches('saleroppgaveMedgattTid',function(session,args){
    session.send("Om du har en sak som i utgangspunktet beregnes etter stykkprisforskriften, men du har arbeidet såpass mye mer med saken at du mener du skal ha betalt for medgått tid, ihht § 11 i Stykkprisforskriften må du legge til dette merarbeidet i Aktørportalen og skrive en begrunnelse.\n Dette gjøres ved at du under honorardelen i salærskjemaet velger " + 'Vis sammenligning' + " etter at rettsmøtene er lagt inn. Da vil du få opp et felt for " + 'Arbeid utenfor rettsmøte' + " hvor du legger inn en oversikt over merarbeidet i forbindelse med saken. Her må det lastes opp vedlegg, gjerne en timeliste og total antall timer. Om dette timeantallet overstiger fastsatt stykkpris med mer enn 50% får du da mulighet til å velge mellom stykkpris og salærforskriften under honorardelen i salærskjemaet. I tillegg må det gis en begrunnelse for hvorfor du skal ha salæret utbetalt etter salærforskriften fremfor stykkprisforskriften. Om det godtgjøres at det foreligger særlige omstendigheter ved oppdraget som begrunner en slik timebruk, fastsettes hele salæret etter reglene i salærforskriften."); 
});


//Fotball  med bilde
intents.matches('fotballOyvin',function(session,args){
    session.send({
        text: "Øyvin heier på Liverpool! Steven Gerrard er favorittspilleren hans!",
        attachments: [
            {
                contentType: 'image/jpg',
                contentUrl: 'http://i.telegraph.co.uk/multimedia/archive/03153/gerrardpa_3153239b.jpg',//'bilder/gerrard1.jpg',
                name: 'gerrard1.jpg'
            }
        ]
    }); 
});

intents.matches('ikkeTilgangTilSak',function(session,args){
    session.send("Advokatfullmektige som ikke får tilgang til saken sin i Aktørportalen bes ta kontakt med domstolen for hjelp. Dette skyldes mest sannsynlig at du ikke er ført inn i saken korrekt med prinsipal. Minner også om at du som advokatfullmektig bør informere domstol om hvem som er din prinsipal. "); 
});

intents.matches('mottattSaksdokumentPaPost',function(session,args){
    session.send("Dokumenter som skal skjermes for en eller flere parter må sendes pr post til partene som skal ha dokumentet. Dette fordi det pr i dag ikke er mulig å skjerme dokumenter kun for en/enkelte parter i saken. Det jobbes med å lage en løsning for å også kunne sende disse dokumentene elektronisk. "); 
});

//Formatere bedre
intents.matches('hullIDokumentlista',function(session,args){
    session.send("Det er flere årsaker til at det ser ut til at det er hull i dokumentlista i Aktørportalen.\n" 
    + "\n Det kan skyldes at\n"
    
    + "\u2022 enkelte dokumenter er interne dokumenter for domstolen,\n"
    + "\u2022 det kan skyldes at enkelte dokumenter ikke er ferdigstilt fra domstolen og ikke gjort tilgjengelig på den offentlige dokumentlista, \n"
    + "\u2022 og det kan skyldes at dokumentene er skjult eller skjermet. \n"
    + "\u2022 Enn så lenge er det ikke mulig å skjerme dokumenter for en/flere parter, det betyr at om et dokument skal skjermes vil det bli skjermet fra alle involverte i saken og dokumentene sendes pr post til de som skal ha dokumentet. Det jobbes med en løsning for å kunne skjeme dokumenter kun for enkelte parter. "); 
});

intents.matches('ikkeadTilgangTilSak',function(session,args){
    session.send(""); 
});

intents.matches('ikkeasdTilgangTilSak',function(session,args){
    session.send("Hei! jeg er chatbot, hva kan jeg hjelpe deg med?"); 
});



intents.onDefault(function(session){ 
    session.send("Sorry...jeg sjønner ikke hva du sier?"); 
});



