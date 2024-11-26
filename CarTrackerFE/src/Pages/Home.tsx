import { useEffect, useState } from 'react'
import { ExampleComponent } from '../Components/ExampleComponent'
import { HelloResponse, useHelloWorld } from '../hooks/useHelloWorld'

export const Home = () => {
  const [messageFromServer, setMessageFromServer] = useState<HelloResponse>()
  const { helloWorld } = useHelloWorld()
  useEffect(() => {
    const awaitResponse = async () => {
      const responseFromServer = await helloWorld({ helloName: 'A Mario' })
      responseFromServer && setMessageFromServer(responseFromServer)
    }
    awaitResponse()
  }, [])

  return (
    <>
      {messageFromServer ? (
        <div>
          Hello world! This is a message from server!
          <ExampleComponent messageFromServer={messageFromServer} />
        </div>
      ) : (
        <div>Whoops something went wrong?</div>
      )}
    </>
  )
}
