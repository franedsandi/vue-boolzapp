**Boolzapp**
===
**Milestone 1**
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto
===
**Milestone 2**
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato
===
**Consigli utili:**
Si possono trascurare le scrollbar verticali, sia nel pannello dei messaggi, che nella lista dei contatti
I pulsanti e le icone possono non funzionare (a parte l’invio del messaggio)
Per gestire le date, può essere utile la libreria Luxon
===
**Step by step:**
1. create the layout of the website with css and html
2. copy the array of contacts given 
3. using the layout and the array, fill the gaps in the user info
4. with v-for replicate the contact div and fill it with the array info
5. configurate the date in italian form
5. make a funtion for last time online ( = last message received time in this case)
6. with the same idea of the last message received time make a message time function
7. with v-for using as structure the messages fill the gaps with the info in the array, picking the message time made before
8. ad an event listener click that will display the clicked contact chat when clicked
9. give the class sent and received to change the colors of the background of each message, the class message will have the basis of a regular message, the only diference between the classes is the color and the float, verify you are using clearfix...


