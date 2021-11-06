import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

// add conversation function for testing
exports.addConversation = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  //const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection('conversations')
    .add({ recipient: { id: 'pepe' }, senderId: 'chepe' })
  // Send back a message that we've successfully written the message
  res.json({ result: `Conversation created with ID: ${writeResult.id} added.` })
})

// on converstion create firebase
exports.onConversationCreate = functions.firestore
  .document('/conversations/{conversaitonId}')
  .onCreate(async (snap, context): Promise<boolean> => {
    const newConv = snap.data()
    console.log('Conversación nueva ', newConv)
    // find conversations with same recipient id and sender id
    try {
      const exitsConv = await admin
        .firestore()
        .collection('conversations')
        .where('recipient.id', '==', newConv.senderId)
        .where('senderId', '==', newConv.recipient.id)
        .limit(1)
        .get()

      // if conversaiton exist exit funciton
      if (exitsConv.docs.length > 0) {
        console.log(
          'Ya existe una conversación con recipient id ' + newConv.senderId
        )
        return false
      } else {
        // gets sender
        const senderRef = await admin
          .firestore()
          .collection('users')
          .where('phoneNumber', '==', newConv.sender.phone)
          .limit(1)
          .get()
        const sender = senderRef.docs[0].data()

        // create a conversation where recipient its sender and sender its recipient
        const { lastMessage, node } = newConv

        const recipientConv = await admin
          .firestore()
          .collection('conversations')
          .add({
            lastMessage,
            node,
            title: sender.name,
            updatedAt: new Date(),
            recipient: {
              id: newConv.senderId,
              ...sender
            },

            senderPhoneNumber: sender.phoneNumber,
            senderId: newConv.recipient.id
          })

        console.log(
          'Se creo un conversación de recipient con id ' + recipientConv.id
        )
      }
    } catch (e) {
      console.error(e)
    }
    return true
  })
