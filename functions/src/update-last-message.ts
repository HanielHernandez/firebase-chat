import * as admin from 'firebase-admin'
import { firestore } from 'firebase-functions'
import { getUserNyPhoneNumber } from '.'

export default firestore
  .document('/nodes/{nodeID}/messages/{messageID}')
  .onCreate(async (snap, context): Promise<void> => {
    // get lastMessage data and node id
    const lastMessage = snap.data()

    const node = context.params.nodeID
    // get conversations with same node
    console.log('upding conversations with node: ' + node)
    const converWithSameNode = await admin
      .firestore()
      .collection('conversations')
      .where('node', '==', node)
      .get()
    // await to update all conversiations docs inside the conversations colleciton
    converWithSameNode.docs.forEach(async (doc) => {
      const conv = { id: doc.id, ...doc.data() } as any
      const user = await getUserNyPhoneNumber(conv.senderPhoneNumber)
      // updates last message and unreadMessages,
      // unread messages counter will only update of sender id of messages its diferent  from conversation sender
      await admin
        .firestore()
        .collection('conversations')
        .doc(doc.id)
        .update({
          lastMessage,
          unreadedMessages:
            lastMessage.senderId != user.id
              ? conv.unreadedMessages + 1
              : conv.unreadedMessages
              ? conv.unreadedMessages
              : 0
        })
      console.log('Conversation update with new message', doc.id)
    })
    // await Promise.all(
    //   converWithSameNode.docs.map((doc) => {
    //     return admin
    //       .firestore()
    //       .collection('conversations')
    //       .doc(doc.id)
    //       .update({
    //         lastMessage
    //       })
    //   })
    // )
  })
