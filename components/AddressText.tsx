import { Text } from "native-base";

type Props = {
  children: React.ReactNode;
}
const AddressText = ({ children }: Props) => {
  return (
    <Text
      color="white"
      borderWidth="2"
      borderColor="white"
      borderRadius="md"
      p={2}
    >
      {children}
    </Text>
  )
};

export default AddressText;