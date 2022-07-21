import { Flex} from "@chakra-ui/react"
import ChatBar from "./Chatbar"
import Topbar from "./Topbar"
     
export default function Chat() {
    return (
        <>
            <Flex >
                <Flex flex={1} h='100vh' w='100%' direction='column'>
                    <Topbar />
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/wWgIAphfn2U"></iframe>
                </Flex>
                <ChatBar />
            </Flex>

        </>

    )
}
