import contacts from "./data.js";
const { createApp } = Vue;

createApp({
  data() {
    return {
      user: {
        name: 'Sofia',
        avatar: './img/avatar_io.jpg',
      },
      contacts: contacts,
      selectedContact: null,
      activeContactIndex: null,
      newMessageText: '',
    };
  },
  methods: {
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
    parseDate(dateString) {
      const [datePart, timePart] = dateString.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes, seconds] = timePart.split(':');
      return new Date(year, month - 1, day, hours, minutes, seconds);
    },
    getMessageTime(message) {
      return this.formatDate(message.date);
    },
    getLastMessageTime(contact) {
      const lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage ? this.formatDate(lastMessage.date) : '';
    },
    formatDate(dateString) {
      if (dateString) {
        const messageDate = this.parseDate(dateString);
        const hours = messageDate.getHours();
        const minutes = messageDate.getMinutes();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }
      return '';
    },
    selectContact(contact) {
      this.selectedContact = contact;
    },
    combineAndSortMessages() {
      if (this.selectedContact) {
        const messages = this.selectedContact.messages;
        return messages.sort((a, b) => {
          return this.parseDate(a.date) - this.parseDate(b.date);
        });
      }
      return [];
    },
    setActiveContact(contact, index) {
      this.selectedContact = contact;
      this.activeContactIndex = index;
    },
    sendMessage() {
      if (this.selectedContact && this.newMessageText) {
        const currentTime = new Date();
        const formattedTime = `${String(currentTime.getHours()).padStart(2, '0')}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
        const newMessage = {
          date: currentTime.toLocaleString(),
          message: this.newMessageText,
          status: 'sent',
        };
        this.selectedContact.messages.push(newMessage);
        this.newMessageText = '';

      }
    },
  },
  computed: {
    sortedMessages() {
      return this.combineAndSortMessages();
    },
    contactClass() {
      return (index) => ({
        active: index === this.activeContactIndex,
      });
    },
  },
}).mount('#app');
