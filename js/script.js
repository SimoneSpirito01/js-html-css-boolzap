const app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                    short: '',
                    dropdown: false
                }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: false,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    short: '',
                    dropdown: false
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent',
                    short: '',
                    dropdown: false
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: false,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                    short: '',
                    dropdown: false
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                    short: '',
                    dropdown: false
                }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: false,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    short: '',
                    dropdown: false
                }
                ],
            },
        ],
        user: {
            name: 'Simone Spirito',
            avatar: '_7'
        },
        alertChecked: false,
        newMessage: '',
        filterValue: '',
        filteredContacts: [],
        myDate: '',
        btnNewChat: false,
        randomMessage: ['Ciao', 'Lo penso anche io', 'Ok', 'Come stai?', 'Cosa hai fatto oggi?', 'Fa molto freddo oggi', 'Scusami, non ho capito', 'Hai ragione!'],
        newContactName: '',
        newContactNumber: '',
        contentOverflow: false
    },
    methods: {
        // funzione per ottonere l'url corretto dell'avatar
        urlImg: function(index){
            return 'img/avatar' + this.contacts[index].avatar + '.jpg'
        },
        // funzione per ottonere l'url corretto dell'avatar tramite l'array filtrato
        urlImgFl: function(index){
            return 'img/avatar' + this.filteredContacts[index].avatar + '.jpg'
        },
        // funzione che rende visibile solo la chat attiva
        activeChat: function(index){
            this.contacts.forEach(element => {
                element.visible = false;
            });
            this.filteredContacts.forEach(element => {
                element.visible = false;
            });
            this.contacts[index].visible = true;
        },
        // funzione che rende visibile solo la chat attiva tramite l'array filtrato
        activeChatFl: function(index){
            this.filteredContacts.forEach(element => {
                element.visible = false;
            });
            this.contacts.forEach(element => {
                element.visible = false;
            });
            this.filteredContacts[index].visible = true;
        },
        // funzione che permette di inviare nuovi messaggi ed ottenere una risposta
        sendMessage: function(){
            if (this.newMessage.split(" ").join("") != ''){
                this.myDate = dayjs().format('DD/MM/YYYY HH:mm:ss');
                this.contacts.forEach(element => {
                    if (element.visible){
                        element.messages.push({
                            date: this.myDate,
                            message: this.newMessage,
                            status: 'sent',
                            short: '',
                            dropdown: false
                        },
                        {
                            message: 'sta scrivendo...',
                            status: 'received',
                            short: '',
                            dropdown: false
                        });
                        this.shortMessage();
                        this.newMessage = '';
                        const self = this;
                        setTimeout(function(){
                            self.myDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
                            element.messages[element.messages.length - 1].date = self.myDate;
                            element.messages[element.messages.length - 1].message = self.ChooseRandomMessage();
                            self.shortMessage();
                            const chatContent = document.querySelector('.chat-content.active')
                            if (self.isOverflown(chatContent)) self.contentOverflow = true;
                        }, 1000)
                    }
                    
                });
            } else {
                this.newMessage = '';
            }
        },
        // funzione per rimuovere la richiesta di attivare le notifiche desktop
        removeAlert: function(){
            // document.querySelector('.allow-not').remove();
            this.alertChecked = true;
        },
        // funzione che filtra i contatti contenenti i caratteri digitati dall'utente e li inserisci in un nuovo array
        filterChat: function(){
            this.filteredContacts = this.contacts.filter(element => {
                return element.name.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase());
            })
            
        },
        // funzione che permette di visualizzare sempre l'ultimo messaggio con overflow
        // lastMexFocus: function(){
        //     const chatContent = document.querySelector('.chat-content.active');
        //     chatContent.scrollTop = chatContent.scrollHeight;
        // },
        // funzione che permette di rendere visibile la sezione aggiungi chat
        checkNewChat: function(){
            this.btnNewChat = !this.btnNewChat;
        },
        // funzione che prende randomicamente un elemento dell'array contenente le opzioni di risposta al messaggio inviato
        ChooseRandomMessage: function(){
            const x = Math.floor(Math.random() * (this.randomMessage.length));
{}            return this.randomMessage[x];
        },
        // funzione che permette di creare nuovi contatti
        sendNewContact: function(){
            this.filterValue = '';
            if (this.newContactName.split(" ").join("") != ''){
                console.log(parseInt(this.contacts[this.contacts.length - 1].avatar.split('_').join('')));
                let x = parseInt(this.contacts[this.contacts.length - 1].avatar.split('_').join(''))
                x = '_' + (x+1);
                this.contacts.push({
                    name: this.newContactName,
                    avatar: x,
                    visible: false,
                    messages: []
                })
                this.newContactName = '';
                this.newContactNumber = '';
                this.checkNewChat();
                this.activeChat(this.contacts.length - 1);
            }
        },
        // funzione che determina se i messaggi hanno meno di 15 caratteri
        shortMessage: function(){
            this.contacts.forEach(element => {
                element.messages.forEach(mex => {
                    if (mex.message.length < 15){
                        mex.short = 'short';
                    }
                });
            });
        },
        // funzione che fa apparire il dropdown del messaggio
        dropdownToggle: function(chat, index){
            if (chat.messages[index].dropdown){
                chat.messages.forEach(element => {
                    element.dropdown = false;
                })
            } else {
                chat.messages.forEach(element => {
                    element.dropdown = false;
                })
                chat.messages[index].dropdown = true
            }
        },
        // funzione che controlla se un elemento ha overflow
        isOverflown: function(element) {
            return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
        },
        // funzione che permette di cancellare i messaggi
        deleteMessage: function(contact, index){
            contact.messages.splice(index, 1);
        }
    },
    mounted(){
        this.shortMessage();
    },
})