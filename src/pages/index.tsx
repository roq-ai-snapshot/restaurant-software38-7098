import { Button, Flex, Heading, Image, Text, Stack, useBreakpointValue } from '@chakra-ui/react';

import { signIn, signUp, requireNextAuth } from '@roq/nextjs';

import Head from 'next/head';

const customerRoles: string[] = ['Customer'];
const ownerRoles: string[] = ['Owner'];

function HomePage() {
  const mapAuthActions = (role: string) => (
    <Stack key={role} direction="column">
      <Text>{role}</Text>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} style={{ marginTop: 8 }}>
        <Button
          rounded={'full'}
          bg={'cyan.500'}
          color={'white'}
          _hover={{
            bg: 'cyan.700',
          }}
          onClick={() => signUp(role.toLowerCase().replace(/\s+/g, '-'))}
        >
          Signup
        </Button>
        <Button rounded={'full'} onClick={() => signIn(role.toLowerCase().replace(/\s+/g, '-'))}>
          Login
        </Button>
      </Stack>
    </Stack>
  );
  return (
    <>
      <Head>
        <title>ROQ Demo</title>
      </Head>

      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Image src="/roq.svg" alt="Logo" w="150px" mb="8" />
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text as={'span'}>Explore</Text>{' '}
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'cyan.400',
                  zIndex: -1,
                }}
              >
                restaurant-software38
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
              Elevate Your Dining Experience with Restaurant-Software38: The Ultimate SaaS Solution for Streamlined
              Restaurant Management and Unmatched Efficiency
            </Text>
            {ownerRoles.map(mapAuthActions)}
            {customerRoles.map(mapAuthActions)}
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image alt={'Login Image'} objectFit={'cover'} src={'/homebg.jpg'} />
        </Flex>
      </Stack>
    </>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: true,
  redirectTo: '/users',
})(HomePage);
