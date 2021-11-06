import { firestore } from 'firebase-admin'
import { https } from 'firebase-functions/v1'

export default https.onRequest(async (req, res): Promise<any> => {
  const { nodeID, text } = req.query
  if (text && nodeID) {
    // create new message
    const message = {
      date: new Date().getTime(),
      senderId: 'SYSTEM',
      status: 'sended',
      text,
      type: 0
    }
    // get message node reference
    const nodeRef = firestore()
      .collection('nodes')
      .doc(nodeID as string)
      .collection('messages')
    // add message
    const response = await nodeRef.add(message)
    console.log('Message sent on node ' + response.id)
    // return response
    return res.status(201).json({
      id: response.id,
      message: 'Message sent successfully'
    })
  } else {
    return res.status(422).json({
      message: 'Error text and noe requried'
    })
  }
})
