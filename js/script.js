
const clickaway = window.VueClickaway.mixin;

const app = new Vue({
    mixins: [ clickaway ],
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                contentOverflow: false,
                lastAccessTime: '',
                messages: [{
                    date: '10/01/2020 15:30:55',
                    dateVisible: '',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    dateVisible: '',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '10/01/2020 16:15:22',
                    dateVisible: '',
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
                contentOverflow: false,
                lastAccessTime: '',
                messages: [{
                    date: '20/03/2020 16:30:00',
                    dateVisible: '',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '20/03/2020 16:30:55',
                    dateVisible: '',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    short: '',
                    dropdown: false
                },
                {
                    date: '20/03/2020 16:35:00',
                    dateVisible: '',
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
                contentOverflow: false,
                lastAccessTime: '',
                messages: [{
                    date: '28/03/2020 10:10:40',
                    dateVisible: '',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                    short: '',
                    dropdown: false
                },
                {
                    date: '28/03/2020 10:20:10',
                    dateVisible: '',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '28/03/2020 16:15:22',
                    dateVisible: '',
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
                contentOverflow: false,
                lastAccessTime: '',
                messages: [{
                    date: '10/01/2020 15:30:55',
                    dateVisible: '',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    short: '',
                    dropdown: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    dateVisible: '',
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
        orderedContacts: [],
        actTime: dayjs().format('DD/MM/YYYY HH:mm:ss'),
        alertChecked: false,
        newMessage: '',
        filterValue: '',
        filteredContacts: [],
        myDate: '',
        myDateVisible: '',
        btnNewChat: false,
        randomMessage: ['Ciao', 'Lo penso anche io', 'Ok', 'Come stai?', 'Cosa hai fatto oggi?', 'Fa molto freddo oggi', 'Scusami, non ho capito', 'Hai ragione!'],
        newContactName: '',
        newContactNumber: '',
        micStartStop: 'start'
    },
    methods: {
        // funzione che rende visibile solo la chat attiva
        activeChat: function(index){
            this.contacts.forEach(element => {
                element.visible = false;
            });
            this.filteredContacts.forEach(element => {
                element.visible = false;
            });
            this.contacts[index].visible = true;
            this.lastAccess(this.contacts[index]);
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
                this.myDateVisible = dayjs().format('HH:mm');
                this.contacts.forEach(element => {
                    if (element.visible){
                        element.messages.push({
                            date: this.myDateVisible,
                            dateVisible: '',
                            message: this.newMessage,
                            status: 'sent',
                            short: '',
                            dropdown: false
                        },
                        {
                            date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                            dateVisible: '',
                            message: 'sta scrivendo...',
                            status: 'received',
                            short: '',
                            dropdown: false
                        });
                        this.ordContacts()
                        this.shortMessage();
                        this.newMessage = '';
                        const self = this;
                        setTimeout(function(){
                            self.myDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
                            self.myDateVisible = dayjs().format('HH:mm')
                            element.messages[element.messages.length - 1].date = self.myDate;
                            element.messages[element.messages.length - 1].dateVisible = self.myDateVisible;
                            element.messages[element.messages.length - 1].message = self.ChooseRandomMessage();
                            self.shortMessage();
                            const chatContent = document.querySelector('.chat-content')
                            if (self.isOverflown(chatContent)) element.contentOverflow = true;
                            
                        }, 1000)
                    }
                    
                });
            } else if (this.micStartStop == 'stop') {
                console.log('ok')
                this.myDateVisible = dayjs().format('HH:mm');
                this.contacts.forEach(element => {
                    if (element.visible){
                        console.log(element)
                        element.messages.push({
                            date: this.myDateVisible,
                            dateVisible: '',
                            message: '',
                            messageVoc: `<audio class="voc-save" controls></audio>`,
                            status: 'sent',
                            short: '',
                            dropdown: false
                        },
                        {
                            date: '',
                            dateVisible: '',
                            message: 'sta scrivendo...',
                            status: 'received',
                            short: '',
                            dropdown: false
                        });
                        this.ordContacts()
                        this.newMessage = '';
                        const self = this;
                        setTimeout(function(){
                            self.myDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
                            self.myDateVisible = dayjs().format('HH:mm')
                            element.messages[element.messages.length - 1].date = self.myDate;
                            element.messages[element.messages.length - 1].dateVisible = self.myDateVisible;
                            element.messages[element.messages.length - 1].message = self.ChooseRandomMessage();
                            const chatContent = document.querySelector('.chat-content')
                            if (self.isOverflown(chatContent)) element.contentOverflow = true;
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
            return this.randomMessage[x];
        },
        // funzione che permette di creare nuovi contatti
        sendNewContact: function(){
            this.filterValue = '';
            if (this.newContactName.split(" ").join("") != ''){
                let x = parseInt(this.contacts[this.contacts.length - 1].avatar.split('_').join(''))
                x = '_' + (x+1);
                if (x > 8) x = '';
                this.contacts.unshift({
                    name: this.newContactName,
                    avatar: x,
                    visible: false,
                    contentOverflow: false,
                    lastAccessTime: '',
                    messages: []
                })
                this.newContactName = '';
                this.newContactNumber = '';
                this.checkNewChat();
                this.activeChat(0);
                this.ordContacts()
            }
        },
        // funzione che determina se i messaggi hanno meno di 15 caratteri
        shortMessage: function(){
            this.contacts.forEach(element => {
                element.messages.forEach(mex => {
                    if (mex.message.length < 15 && mex.messageVoc != `<audio class="voc-save" controls></audio>`){
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
        },
        // funzione che permette di stampare l'ultimo accesso del contatto
        lastAccess: function(element){
            dayjs.extend(dayjs_plugin_relativeTime);
            dayjs.locale('it');
            const array = element.messages.filter(mex => {
                return mex.status == 'received';
            })
            if (array != ''){
                let x = array[array.length - 1].date.split(' ')[0].split('/').reverse().join('/') + ' ' + array[array.length - 1].date.split(' ')[1];
                element.lastAccessTime = (!isNaN(parseInt(x))) ? 'Ultimo accesso ' + dayjs(x).fromNow() : 'Ultimo accesso ' + 'ora';
                return element.lastAccessTime;
            }
            
        },
        // funzione on/off del registratore vocale
        toggleMic: function(){
            (this.micStartStop == 'start') ? this.micStartStop = 'stop' :  this.micStartStop = 'start'
        },
        // funzione che permette di stampare il tag html audio quando viene inviato un messaggio vocale
        createVoc: function(element){
            if (element.messageVoc != undefined){
                return element.messageVoc;
            } else{
                return  element.message;
            }
        },
        // funzione che permette di chiudere tutti i dropdown menu al click away
        closeAllDropdowns: function(){
            this.contacts.forEach(element => {
                element.messages.forEach(mex => {
                    mex.dropdown = false;
                })
            })
        },
        ordContacts: function(){

            let copyContacts = [...this.contacts];
            console.log(copyContacts)

            if (this.contacts[0].messages.length != 0){

                this.contacts.forEach(element => {
                    let x = 1
                    while (element.messages[element.messages.length - x].status != 'received'){
                        x++;
                        if (x == element.messages.length) return;
                    }
                    element.access = element.messages[element.messages.length - x].date
                    console.log(element.access);
                });
                
                this.orderedContacts = [];
                while (this.orderedContacts.length != this.contacts.length){
                    let recentChat = 1;
                    for (let i = 0; i < copyContacts.length; i++){
                        if (copyContacts.length > 1){
                            console.log(copyContacts[recentChat].access.split(' ')[1].split(':'))
                            if (copyContacts[recentChat].access.split(' ')[0].split('/')[2] == copyContacts[i].access.split(' ')[0].split('/')[2]){
                                if (copyContacts[recentChat].access.split(' ')[0].split('/')[1] == copyContacts[i].access.split(' ')[0].split('/')[1]){
                                    if (copyContacts[recentChat].access.split(' ')[0].split('/')[0] == copyContacts[i].access.split(' ')[0].split('/')[0]){
                                        if (copyContacts[recentChat].access.split(' ')[1].split(':')[0] == copyContacts[i].access.split(' ')[1].split(':')[0]){
                                            if (copyContacts[recentChat].access.split(' ')[1].split(':')[1] == copyContacts[i].access.split(' ')[1].split(':')[1]){
                                                if (copyContacts[recentChat].access.split(' ')[1].split(':')[2] < copyContacts[i].access.split(' ')[1].split(':')[2]){
                                                    recentChat = i;
                                                }
                                            } else if (copyContacts[recentChat].access.split(' ')[1].split(':')[1] < copyContacts[i].access.split(' ')[1].split(':')[1]) {
                                                recentChat = i;
                                            }
                                        } else if (copyContacts[recentChat].access.split(' ')[1].split(':')[0] < copyContacts[i].access.split(' ')[1].split(':')[0]) {
                                            recentChat = i;
                                        }
                                    } else if (copyContacts[recentChat].access.split(' ')[0].split('/')[0] < copyContacts[i].access.split(' ')[0].split('/')[0]) {
                                        recentChat = i;
                                    }
                                } else if (copyContacts[recentChat].access.split(' ')[0].split('/')[1] < copyContacts[i].access.split(' ')[0].split('/')[1]) {
                                    recentChat = i;
                                }
                            } else if (copyContacts[recentChat].access.split(' ')[0].split('/')[2] < copyContacts[i].access.split(' ')[0].split('/')[2]) {
                                recentChat = i;
                            }
                        } else {
                            recentChat = 0;
                        }
                        console.log(recentChat)
                        console.log(i)
                    }
    
                    this.orderedContacts.push(copyContacts[recentChat]);
                    copyContacts.splice(recentChat, 1);
                    console.log(copyContacts);
                    console.log(this.orderedContacts);
                }
                this.contacts = [...this.orderedContacts];
            }else {
                console.log(this.contacts[0].messages.length)
            }





            
           
                
        }
    
    },
    created(){
        this.contacts.forEach(element => {
            element.messages.forEach(mex => {
                if (mex.dateVisible == '') mex.dateVisible = mex.date;
            })
        });
        
    },
    mounted(){
        this.ordContacts();
        this.shortMessage();
        const self = this;
        this.contacts.forEach(element => {
            self.actTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
            self.lastAccess(element);
        })
        setInterval(function(){
            self.contacts.forEach(element => {
                if (element.visible){
                    self.actTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
                    self.lastAccess(element);
                }
            })
        }, 1000)

        // vocal message

        let constraintObj = { 
            audio: true, 
        }; 
        
        //handle older browsers that might implement getUserMedia in some way
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
            navigator.mediaDevices.getUserMedia = function(constraintObj) {
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }
                return new Promise(function(resolve, reject) {
                    getUserMedia.call(navigator, constraintObj, resolve, reject);
                });
            }
        } else{
            navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                devices.forEach(device=>{
                    console.log(device.kind.toUpperCase(), device.label);
                    //, device.deviceId
                })
            })
            .catch(err=>{
                console.log(err.name, err.message);
            })
        }

        navigator.mediaDevices.getUserMedia(constraintObj)
        .then(function(mediaStreamObj) {
            
            //add listeners for saving video/audio
            let start = document.getElementById('btnStart');
            let stop = document.getElementById('btnStop');
            
            let mediaRecorder = new MediaRecorder(mediaStreamObj);
            let chunks = [];
            
            start.addEventListener('click', (ev)=>{
                mediaRecorder.start();
                console.log(mediaRecorder.state);
            })
            stop.addEventListener('click', (ev)=>{
                setTimeout(function(){
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                }, 500)
            });
            mediaRecorder.ondataavailable = function(ev) {
                chunks.push(ev.data);
            }
            mediaRecorder.onstop = (ev)=>{
                setTimeout(() => {
                    let vocSave = document.getElementsByClassName('voc-save')[document.getElementsByClassName('voc-save').length - 1];
                    let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
                    chunks = [];
                    let videoURL = window.URL.createObjectURL(blob);
                    vocSave.src = videoURL;
                }, 501);
            }
        })
        .catch(function(err) { 
            console.log(err.name, err.message); 
        });

    },
    // watch: {
    //     contacts: function(){
    //         this.ordContacts()
    //     }
    // }
})