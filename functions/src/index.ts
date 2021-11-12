import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as faker from 'faker'
import updateLastMessage from './update-last-message'
import sentMessageFunction from './http/sentMessage.function'
admin.initializeApp()

export const getUser = async (userId: string): Promise<any> => {
  const userDoc = await admin.firestore().collection('users').doc(userId).get()
  return { id: userDoc.id, ...userDoc.data() }
}
export const getUserNyPhoneNumber = async (
  phoneNumber: string
): Promise<any> => {
  const response = await admin
    .firestore()
    .collection('users')
    .where('phoneNumber', '==', phoneNumber)
    .limit(1)
    .get()
  return { id: response.docs[0].id, ...response.docs[0].data() }
}

const createDumUser = async () => {
  const dummyData = {
    name: faker.name.firstName(),
    phoneNumber: faker.phone.phoneNumber(),
    profileImageUrl: faker.image.avatar()
  }

  const response = await admin.firestore().collection('users').add(dummyData)
  return {
    id: response.id,
    ...dummyData
  }
}
// add conversation function for testing
exports.sentMessage = sentMessageFunction
exports.addConversation = functions.https.onRequest(async (req, res) => {
  // Push the new message into Firestore using the Firebase Admin SDK.

  try {
    const sender = await createDumUser()
    const recipient = await createDumUser()

    console.log({
      senderId: sender.id,
      recipientId: recipient.id
    })
    if (!recipient) {
      res.status(422).json({
        message: 'recipient not found'
      })
    } else if (!sender) {
      res.status(422).json({
        message: 'sender not found'
      })
    } else {
      // create first message
      const lastMessage = {
        date: new Date().getTime(),
        type: 'SYSTEM',
        text: 'CONVERSATION_CREATED',
        status: 'sended',
        senderId: 'SYSTEM'
      }
      // store messge on a random node
      const node = await admin.firestore().collection('nodes').add({})
      await node.collection('messages').add(lastMessage)

      const conv = {
        recipient,
        title: recipient && recipient.name,
        conversationImageUrl: recipient.profileImageUrl,
        node: node.id,
        senderPhoneNumber: sender.phoneNumber,
        updatedAt: new Date(),
        lastMessage,
        unreadedMessages: 0
      }
      const writeResult = await admin
        .firestore()
        .collection('conversations')
        .add(conv)
      // Send back a message that we've successfully written the message
      res.json({
        result: `Conversation created with ID: ${writeResult.id} added.`
      })
    }
  } catch (e) {
    console.error(e)
    res.status(422).json({
      error: e
    })
  }
})

// on converstion create firebase
exports.onConversationCreate = functions.firestore
  .document('/conversations/{conversaitonId}')
  .onCreate(async (snap, context): Promise<boolean> => {
    const newConv = snap.data()
    console.log('Conversación nueva ', newConv)
    const sender = await getUserNyPhoneNumber(newConv.senderPhoneNumber)
    const recipient = await getUser(newConv.recipient.id)
    // find conversations with same recipient id and sender id
    try {
      const exitsConv = await admin
        .firestore()
        .collection('conversations')
        .where('recipient.id', '==', sender.id)
        .where('senderPhoneNumber', '==', recipient.phoneNumber)
        .limit(1)
        .get()

      // if conversaiton exist exit funciton
      if (exitsConv.docs.length > 0) {
        console.log(
          'Ya existe una conversación con recipient id ' + newConv.senderId
        )
        return false
      } else {
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
              ...sender
            },
            conversationImageUrl: sender.profileImageUrl,
            senderPhoneNumber: recipient.phoneNumber,
            unreadedMessages: 1
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

exports.onMessageCreate = updateLastMessage
