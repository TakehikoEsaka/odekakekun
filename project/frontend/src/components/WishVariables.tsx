import {
  Input,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
// import Select from "../hooks/ChakraReactSelect";

// できればばreact-hook-formを使いたい
// import { useController } from "react-hook-form";

interface OPtions {
  value: string;
  label: string;
}

const wayOptions: OPtions[] = [
  { value: "blue", label: "電車" },
  { value: "red", label: "車" },
  { value: "green", label: "徒歩" },
  { value: "yellow", label: "バス" },
  { value: "purple", label: "自転車" },
];

const hourOptions: OPtions[] = [
  { value: "2時間", label: "2時間" },
  { value: "1時間", label: "1時間" },
  { value: "30分", label: "30分" },
];

type PropType = {
  getSuggest: (wishVariables: string) => void;
};

export const WishVariables = (props: PropType) => {
  const trySuggest = () => {
    // ここでreact-hook-formで染めれてないからちょっと辛い。。
    var question = "近くにある徒歩を使って使って1時間でいける場所を探す";
    props.getSuggest(question);
  };

  return (
    <>
      <Grid
        // ここはレスポンシブで列の数を変えておく対応させておく
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
      >
        <FormControl p={4}>
          <FormLabel>場所</FormLabel>
          <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center">
            <GridItem colSpan={4}>
              <Input placeholder="地名/駅名" defaultValue="近く" />
            </GridItem>
            <GridItem colSpan={1} color="blackAlpha.700">
              にある
            </GridItem>
          </Grid>
        </FormControl>

        <FormControl p={3}>
          <FormLabel>交通手段</FormLabel>
          <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center">
            <GridItem colSpan={4}>
              <Select placeholder="Select option">
                {wayOptions.map((option) => (
                  <option value={option.label}>{option.label}</option>
                ))}
              </Select>
            </GridItem>
            <GridItem colSpan={1}>を使って</GridItem>
          </Grid>
        </FormControl>

        {/* 選択時にiphoneのキーボードが出ないようにしたい。inputProps={{ readOnly: true }}をつける必要があるけど難しいな。。*/}
        <FormControl p={3} isReadOnly={true}>
          <FormLabel>時間</FormLabel>
          <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center">
            <GridItem colSpan={4}>
              <Select placeholder="1時間">
                {hourOptions.map((option) => (
                  <option value={option.label}>{option.label}</option>
                ))}
              </Select>
            </GridItem>
            <GridItem colSpan={1}>以内でいける</GridItem>
          </Grid>
        </FormControl>
      </Grid>

      <Flex justifyContent="center">
        <Button
          // chakraUIならcolorSchemeを指定すると背景色と背景色と対応する色味をセットでもってくれてるのでデザイン知識がなくても補完してくれるs
          colorScheme="blue"
          onClick={trySuggest}
        >
          探す
        </Button>
      </Flex>
    </>
  );
};
