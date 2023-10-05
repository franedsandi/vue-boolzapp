const { createApp } = Vue;
/* import from data */
import contacts from "./data.js";
createApp({
  data() {
    return {
      user: {
        name: 'Sofia',
        avatar: './img/avatar_io.jpg',
      },
      contacts,
      selectedContact: null,
      activeContactIndex: null,
      newMessageText: '',
      searchQuery: '',
    };
  },
  methods: {
    /* last message in contact block */
    getLastMessage(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      if (lastMessage) {
        let messageText = lastMessage.message.trim();
        if (messageText.length > 30) {
          messageText = messageText.slice(0, 30) + '...';
        }
        return messageText;
      }
      return '';
    },
    /* transform date in numbers and divide in italian form*/
    parseDate(dateString) {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');
      return new Date(year, month - 1, day, hours, minutes);
    },
    /* message time (sent and recived) */
    getMessageTime(message) {
      return this.formatDate(message.date);
    },
    /* last message sent/received */
    getLastMessageTime(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage ? this.formatTime(lastMessage.date) : '';
    },
    /* configurate date for messages sent and received */
    formatDate(dateString) {
      if (dateString) {
        const messageDate = this.parseDate(dateString);
        const day = messageDate.getDate();
        const month = messageDate.getMonth() + 1;
        const year = messageDate.getFullYear();
        const hours = messageDate.getHours();
        const minutes = messageDate.getMinutes();
        return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }
      return '';
    },/* configurate date cor last message received en contact data */
    formatTime(dateString) {
      if (dateString) {
        const messageDate = this.parseDate(dateString);
        const hours = messageDate.getHours();
        const minutes = messageDate.getMinutes();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }
      return '';
    },
    /* select a contact */
    selectContact(contact) {
      this.selectedContact = contact;
    },
    /* organize messages by time received */
    combineAndSortMessages() {
      if (this.selectedContact) {
        const messages = this.selectedContact.messages;
        return messages.sort((a, b) => {
          return this.parseDate(a.date) - this.parseDate(b.date);
        });
      }
      return [];
    },
    /* give the class active co the clicked contact */
    setActiveContact(contact, index) {
      this.selectedContact = contact;
      this.activeContactIndex = index;
    },
    /* send a message with the input message */
    sendMessage() {
      if (this.selectedContact && this.newMessageText) {
        const currentTime = new Date();
        const formattedDate = `${String(currentTime.getDate()).padStart(2, '0')}/${String(currentTime.getMonth() + 1).padStart(2, '0')}/${currentTime.getFullYear()}`;
        const formattedTime = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
        const formattedDateTime = `${formattedDate} ${formattedTime}`;
        
        const newMessage = {
          date: formattedDateTime,
          message: this.newMessageText,
          status: 'sent',
        };
        this.selectedContact.messages.push(newMessage);
        this.newMessageText = '';
        /* responce ok message received */
        setTimeout(() => {
          const receivedMessage = {
            date: formattedDateTime,
            message: 'Ok!',
            status: 'received',
          };
          this.selectedContact.messages.push(receivedMessage);
        }, 1000);
      }
    },
    /* delete message */
    deleteMessage(message) {
      const index = this.selectedContact.messages.indexOf(message);
      if (index !== -1) {
        this.selectedContact.messages[index].message = '"the message has been deleted!"';
        //this.selectedContact.messages.splice(index, 1);
      }
    },
  },
  computed: {
    /* messages organized */
    sortedMessages() {
      return this.combineAndSortMessages();
    },
    /* active class */
    contactClass() {
      return (index) => ({
        active: index === this.activeContactIndex,
      });
    },
    /* filter for the search bar */
    filteredContacts() {
      const query = this.searchQuery.toLowerCase();
      return this.contacts.filter(contact => contact.name.toLowerCase().includes(query));
    },
  },
}).mount('#app');

