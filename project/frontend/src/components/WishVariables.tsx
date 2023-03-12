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
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";

import { questionState } from "../store/questionState";

interface OPtions {
  value: string;
  label: string;
}

interface FormValues {
  place: string;
  hour: string;
  way: string;
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
  { value: "15分", label: "15分" },
];

type PropType = {
  getSuggest: (wishVariables: string) => void;
};

export const WishVariables = (props: PropType) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [question, setQuestion] = useRecoilState(questionState);

  const trySuggest = (data: FormValues) => {
    // ここでreact-hook-formで染めれてないからちょっと辛い。。

    const { place, hour, way } = data;
    setQuestion({ place: place, hour: hour, way: way });
    const sentence = `${question.place}から${question.hour}以内で${question.way}を使っていけるおすすめの場所を探してください`;
    console.log(sentence);
    props.getSuggest(sentence);
  };

  return (
    <>
      <form onSubmit={handleSubmit(trySuggest)}>
        <Grid
          // ここはレスポンシブで列の数を変えておく対応させておく
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        >
          <FormControl p={4}>
            <FormLabel>場所</FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center">
              <GridItem colSpan={4}>
                <Input
                  placeholder="地名/駅名"
                  defaultValue={question.place}
                  {...register("place")}
                />
              </GridItem>
              <GridItem colSpan={1} color="blackAlpha.700">
                から
              </GridItem>
            </Grid>
          </FormControl>

          {/* 選択時にiphoneのキーボードが出ないようにしたい。inputProps={{ readOnly: true }}をつける必要があるけど難しいな。。*/}
          <FormControl p={3} isReadOnly={true}>
            <FormLabel>時間</FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center">
              <GridItem colSpan={4}>
                <Select defaultValue={question.hour} {...register("hour")}>
                  {hourOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </GridItem>
              <GridItem colSpan={1}>以内</GridItem>
            </Grid>
          </FormControl>

          <FormControl p={3}>
            <FormLabel>交通手段</FormLabel>
            <Grid templateColumns="repeat(5, 1fr)" gap={4} alignItems="center">
              <GridItem colSpan={4}>
                <Select
                  // react-hook-formにdefaultのvalueを設定しておく必要がある
                  defaultValue={question.way}
                  {...register("way")}
                >
                  {wayOptions.map((option) => (
                    <option key={option.label} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </GridItem>
              <GridItem colSpan={1}>でいける</GridItem>
            </Grid>
          </FormControl>
        </Grid>

        <Flex justifyContent="center">
          <Button
            // chakraUIならcolorSchemeを指定すると背景色と背景色と対応する色味をセットでもってくれてるのでデザイン知識がなくても補完してくれるs
            colorScheme="blue"
            // typeをつけることでフォームの送信をする事ができる
            type="submit"
          >
            おすすめの場所を探す
          </Button>
        </Flex>
      </form>
    </>
  );
};
