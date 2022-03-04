import React, { useState, useContext } from "react";
import { VStack, HStack, Text, Input, Button, Divider, useToast, useSafeArea } from "native-base";
import Background from "../components/Background";
import AddressText from "../components/AddressText";
import { AppCtx } from "../context/AppProvider";
import { Navigation } from "../types";
import { Ionicons } from "@expo/vector-icons";
import { getOwnerBalace, getTotalSupply, mintSPL, mintToSomeone } from "../api";

interface Props {
  navigation: Navigation
}

const Mint = ({ navigation }: Props) => {
  const { keyPair, authority, freeze } = useContext(AppCtx);
  const toast = useToast();
  const [sendTo] = useState("5pYdCqoeSkWnsSyLeWWUvgatQKXSyZvi29zStkyfimHp")
  const [tokenAddress, setTokenAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [mintSuccess, setMintSuccess] = useState<boolean>(false);
  const [minting, setMinting] = useState<boolean>(false);
  const handleChange = (value) => {
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setAmount(parseInt(value))
    } else {
      setAmount(0)
    }
  }

  const mint = async () => {
    setMinting(true);
    const token = await mintSPL(keyPair, authority, freeze);
    setTokenAddress(token.toString());
    toast.show({ description: `New Token address is ${tokenAddress}` });
    setMintSuccess(true);
    setMinting(false);
  }

  const mintTo = async () => {
    await mintToSomeone(keyPair, tokenAddress, sendTo, authority, amount);
    const totalSupply = await getTotalSupply(tokenAddress);
    const ownerBalance = await getOwnerBalace(sendTo);
    toast.show({ description: `Total Supply : ${totalSupply.toString}, Owner Balance : ${ownerBalance.toString()}` });
    navigation.navigate("Home");
  }

  return (
    <Background>
      <VStack alignItems="center" space={5}>
        <Text>{amount}</Text>
        <VStack space={2}>
          <Text bold color="white" fontSize="xl">Mint Authority</Text>
          <AddressText>{authority}</AddressText>
        </VStack>
        <VStack space={2}>
          <Text bold color="white" fontSize="xl">Freeze Authority</Text>
          <AddressText>{freeze}</AddressText>
        </VStack>
        <Button
          colorScheme="gray"
          variant="outline"
          onPress={mint}
          w="1/3"
          isLoading={minting}
          _text={{
            color: "white",
            fontSize: 22
          }}
          _spinner={{
            color: "white"
          }}
        >
          <HStack justifyContent="center" alignItems="center" space={4}>
            <Text color="white" fontSize="lg">Mint</Text>
            <Ionicons name="arrow-down-circle-outline" size={24} color="white" />
          </HStack>
        </Button>
      </VStack>
      <Divider my={4} />
      <VStack alignItems="center" space={5}>
        <VStack space={2}>
          <Text bold color="white" fontSize="xl">Send To this</Text>
          <AddressText>{sendTo}</AddressText>
        </VStack>
        <VStack space={2}>
          <Text bold color="white" fontSize="xl">Amount</Text>
          <Input value={amount.toString()} placeholder="Input" minWidth="90%" onChangeText={handleChange} />
        </VStack>
        <Button
          colorScheme="gray"
          variant="outline"
          isDisabled={!mintSuccess}
          onPress={mintTo}
          w="1/3"
        >
          <HStack justifyContent="center" alignItems="center" space={4}>
            <Text color="white" fontSize="lg">Mint To</Text>
            <Ionicons name="return-down-back-sharp" size={24} color="white" />
          </HStack>
        </Button>
      </VStack>
    </Background >
  )
}

export default Mint;