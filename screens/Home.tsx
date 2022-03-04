import React, { useContext, useEffect, useState } from 'react';
import { Button, HStack, VStack, Text, Image, Tooltip, useToast, TextArea } from 'native-base';
import { getBalance, getSolanaPrice, requestAirDrop } from '../api';
import Background from '../components/Background';
import Loading from '../components/Loading';
import { Navigation } from '../types';
import { AppCtx } from '../context/AppProvider';
import { displayPublicKey } from '../utils';
import IconBtn from '../components/IconBtn';
const sol_url = require('../assets/images/sol.png');

interface Props {
  navigation: Navigation
}

const HomeScreen = ({ navigation }: Props) => {
  const { publicKey, keyPair } = useContext(AppCtx);
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);
  const [solPrice, setSolPrice] = useState<number>(0);
  const [airdroping, setAirdroping] = useState<boolean>(false);
  const toast = useToast();
  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      await getMyBalance();
      await getSolPrice();
      setLoading(false);
    })();
    return () => {
      abortController.abort();
    }
  }, [])

  const getSolPrice = async () => {
    const price = await getSolanaPrice();
    setSolPrice(price);
  }

  const getMyBalance = async () => {
    const balance = await getBalance(publicKey);
    setBalance(balance);
  }

  const airDrop = async () => {
    setAirdroping(true);
    await requestAirDrop(publicKey);
    toast.show({
      description: "Airdrop Completed"
    });
    setAirdroping(false);
    await getMyBalance();
    await getSolPrice();
  }

  const goMint = () => {
    navigation.navigate("Mint");
  }

  return (
    <Background>
      {
        (!loading)
          ?
          <VStack alignItems="center" justifyContent="center" space={20}>
            <Text color="white" fontSize="2xl">
              {displayPublicKey(publicKey)}
            </Text>
            <Text fontSize="7xl" color="white">$ {(balance * solPrice).toFixed(1)} </Text>
            <HStack alignItems="center" px={7} py={4} space={10} borderWidth={1} borderRadius="md">
              <HStack alignItems="center" space={3}>
                <Image source={sol_url} size={60} alt="Sol" />
                <Text fontSize="5xl" color="white">{balance}</Text>
              </HStack>
              <Button
                size="lg"
                variant="outline"
                colorScheme='gray'
                px={5}
                py={2}
                isLoading={airdroping}
                _text={{
                  color: "white",
                  fontSize: 22
                }}
                _spinner={{
                  color: "white"
                }}
                onPress={() => airDrop()}
              >
                Airdrop
              </Button>
            </HStack>
            <IconBtn
              icon='return-down-forward-sharp'
              pressHandler={goMint}
            >
              Go Mint
            </IconBtn>
          </VStack>
          : <Loading>Loading Balance</Loading>
      }
    </Background>
  );
};

export default HomeScreen;