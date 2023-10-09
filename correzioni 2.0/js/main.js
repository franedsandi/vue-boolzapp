const{createApp} = Vue;

import{contacts} from './contacts.js'
createApp({
  data(){
    return{
      contacts,
      activeContact:{},
      newMessageStr: "",
    }
  },
  methods:{
    sendNewMessage(){
      setTimeout(()=>{
        this.activeContact.messages.push(this.generateMessage(this.newMessageStr, 'sent'));
        this.newMessageStr="";
      },200)
      setTimeout(()=>{
        this.activeContact.messages.push(this.generateMessage("Oks!", 'recived'));;
      },1200)
    },
    generateMessage(message, status){
      return {
        date: luxon.DateTime.now().setLocale('it').toFormat('dd/MM/yyyy HH:mm:ss'),
        message,
        status,
      }
    },
    getLastMessage(contact){
      return contact.messages.at(-1).message;
    },
    getLastDate(contact){
      return contact.messages.at(-1).date;
    }
  },
  mounted(){
    
  },
  created(){
    /* start with an active contact */
    this.activeContact = this.contacts[0]
  }
}).mount('#app')