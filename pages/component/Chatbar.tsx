import { ArrowLeftIcon } from '@chakra-ui/icons'
import { Avatar, Button, Flex, FormControl, IconButton, Input, Text } from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/router'
// import useFetch from '../hooks/useFetch'
import { access, db } from '../api/appwriteconfig'

export type ChatMessage = {
  name: string
  message: string
}

export default function ChatBar() {
  const [messages, setmessages] = useState<ChatMessage[]>([])
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = access.client.subscribe(
      ['databases.Comment.collections.Chat.documents'],
      (data) => {
        setmessages((messages) => [...messages, data.payload as ChatMessage]);
      }
    );

    return () => {
      unsubscribe();
    }
    
  }, [])

  const genRandomKey = async () => {
    const messages = await db.listDocuments('Chat', [], 100, 2);
    setmessages(messages.documents as unknown as ChatMessage[])
  };
  useEffect(() => {
    genRandomKey();
  }, [])

  const submitMessage = async (e: any) => {

    e.preventDefault();
    const message = e.target.message.value;
    const CurrentUser = await access.get()
    console.log(CurrentUser)
    await db.createDocument("Chat", 'unique()', {
      name: CurrentUser.name,
      message,
    })
  }

  const logout = async () => {
    access.deleteSession("current")
    alert("Logout successful")
    router.push("/")
  }


  const ChatArea = () => {
    return (
      <form onSubmit={submitMessage}>
        <Input autoComplete='off' placeholder='Type a comment' type='text' name='message' />
        <Button type='submit' hidden> Submit </Button>
      </form>

    )
  }

  return (
    <Flex w='500px' h='100vh' float='right' borderLeft='1px solid' borderLeftColor='gray.200' direction='column'>

      <Flex padding='5px' h='81px' w='100%' align='center' alignSelf='flex-end' borderBottom='1px solid' borderBottomColor='gray.200'>
        <IconButton onClick={logout} size='sm' isRound icon={<ArrowLeftIcon />} aria-label={''} />
      </Flex>

      <Flex flex={1} direction='column' pt={3} mx={3} overflowX='hidden' sx={{ scrollbarWidth: 'none' }}>
        {messages.map((message) => {
          return (
            <Flex bg='blue.100' w='fit-content' minWidth='50px' margin='5px' borderRadius='lg' p={3}>
              <Text >
                <label>
                  {message.name}:
                </label>
                {message.message}
              </Text>
            </Flex>
          )
        })}
      </Flex>

      <ChatArea />

    </Flex>
  )
}