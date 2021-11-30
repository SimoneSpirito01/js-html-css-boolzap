
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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
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
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
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
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
                ],
            },
        ],
        newMessage: '',
        filterValue: '',
        filteredContacts: [],
        myDate: ''
    },
    methods: {
        urlImg: function(index){
            return 'img/avatar' + this.contacts[index].avatar + '.jpg'
        },
        urlImgFl: function(index){
            return 'img/avatar' + this.filteredContacts[index].avatar + '.jpg'
        },
        activeChat: function(index){
            this.contacts.forEach(element => {
                element.visible = false;
            });
            this.filteredContacts.forEach(element => {
                element.visible = false;
            });
            this.contacts[index].visible = true;
        },
        activeChatFl: function(index){
            this.filteredContacts.forEach(element => {
                element.visible = false;
            });
            this.contacts.forEach(element => {
                element.visible = false;
            });
            this.filteredContacts[index].visible = true;
        },
        sendMessage: function(){
            this.myDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
            this.contacts.forEach(element => {
                if (element.visible){
                    element.messages.push({
                        date: this.myDate,
                        message: this.newMessage,
                        status: 'sent'
                    },
                    {
                        message: 'sta scrivendo...',
                        status: 'received'
                    });
                    this.newMessage = '';
                    const self = this;
                    setTimeout(function(){
                        self.myDate = dayjs().format('DD/MM/YYYY HH:mm:ss')
                        element.messages[element.messages.length - 1].date = self.myDate;
                        element.messages[element.messages.length - 1].message = 'Ok'
                    }, 1000)
                }
                
            })
        },
        removeAlert: function(){
            document.querySelector('.allow-not').remove();
        },
        filterChat: function(){
            this.filteredContacts = this.contacts.filter(element => {
                return element.name.toLocaleLowerCase().includes(this.filterValue.toLocaleLowerCase());
            })
            
        }
    },
    mounted() {
        
    }
})