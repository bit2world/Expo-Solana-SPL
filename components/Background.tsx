import React from "react";
import { VStack } from "native-base";

interface Props {
  children: React.ReactNode
}

const Background = ({ children }: Props) => {
  return (
    <VStack h="full" justifyContent="center" alignItems="center" bgColor="blueGray.900">
      {children}
    </VStack>
  )
}

export default Background;