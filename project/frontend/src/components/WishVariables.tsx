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
import { chatGPTLoadingState } from "../store/chatGPTLoadingState";

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
  getSuggest: (place: string, hour: string, way: string) => void;
  getHistories: () => void;
};

export const WishVariables = (props: PropType) => {
  const { register, handleSubmit, watch } = useForm<FormValues>();
  const [question, setQuestion] = useRecoilState(questionState);
  const [loading, setLoading] = useRecoilState(chatGPTLoadingState);
  // 全ての値を監視することができる
  const watchedValue = watch();

  // TODO ここのフォーム送信のトリガーが1つ前になっているので修正する
  // TODO timeoutの時にローディングステータスを外す
  // TODO loading中はボタンをおせなくする
  const trySuggest = async (data: FormValues) => {
    const { place, hour, way } = data;
    setQuestion({ place: place, hour: hour, way: way });
    // TODO hour -> timeという変数名になおしておく
    setLoading(true);
    await props.getSuggest(place, hour, way);
    await props.getHistories();
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(trySuggest)}>
        <Grid
          // PCとスマホの2つにレスポンシブ対応
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

          {/* ASK 選択時にiphoneのキーボードが出ないようにする方法 */}
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
                <Select defaultValue={question.way} {...register("way")}>
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
