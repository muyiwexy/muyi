import { Avatar, Flex, Heading } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { access } from '../api/appwriteconfig';

export default function Topbar() {
    const [user, setUser] = useState({
        name:''
    })
    const getuser = async () => {
        const userdata = access && access.get();
        userdata
            .then((res) => setUser(res))
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getuser();
    }, [])
    return (
        <Flex h='81px' bg='gray.100' w='100%' align='center' p='5px'>
            <Avatar src="" marginEnd={3} />
            {user && (
                <Heading size='lg'>{user.name}</Heading>
            )}
        </Flex>
    )
}
