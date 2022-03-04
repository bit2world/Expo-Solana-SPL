import { HStack, Spinner, Heading } from "native-base";

type Props = {
  children: React.ReactNode;
}
const Loading = ({ children }: Props) => {
  return (
    <HStack space={5} justifyContent="center" alignItems="center">
      <Spinner accessibilityLabel="Loading posts" size="lg" />
      <Heading color="primary.500" fontSize="4xl">
        {children}
      </Heading>
    </HStack>
  )
};

export default Loading;