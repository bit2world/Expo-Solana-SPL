import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, HStack } from "native-base";

type Props = {
  children: React.ReactNode;
  icon: string;
  pressHandler: () => void;
}
const IconBtn = ({ children, icon, pressHandler }: Props) => {
  return (
    <Button
      colorScheme="gray"
      variant="outline"
      onPress={pressHandler}
      w="1/3"
    >
      <HStack justifyContent="center" alignItems="center" space={4}>
        <Text color="white" fontSize="lg">{children}</Text>
        <Ionicons name={icon} size={24} color="white" />
      </HStack>
    </Button>
  )
};

export default IconBtn;