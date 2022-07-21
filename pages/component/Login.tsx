
import Head from 'next/head'
import { access } from '../api/appwriteconfig'
import { ChatIcon } from "@chakra-ui/icons"
import { Box, Button, Center, Stack } from "@chakra-ui/react"

export default function Login() {

  const googleAuth = async (e: any) => {
    e.preventDefault();
    try {
      access.createOAuth2Session(
        'google',
        'http://localhost:3000/component/Homepage',
        'http://localhost:3000/component/Blob'
      );
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Center h="100vh">
        <Stack align="center" bgColor="gray.600" p={16} rounded="3xl" spacing={12} boxShadow="lg">
          <Box bgColor="blue.500" w="fit-content" p={5} rounded="3xl" boxShadow="md">
            <ChatIcon w="100px" h="100px" color="white" />
          </Box>
          <Button onClick={(e) => googleAuth(e)} boxShadow="md"> Sign in with google </Button>
        </Stack>
      </Center>
    </>
  )
}