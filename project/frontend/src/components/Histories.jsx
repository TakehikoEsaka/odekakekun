import { Flex, Box, Button } from "@chakra-ui/react";
import { useState } from "react";

export const Histories = (props) => {
  const [listItems, setListItems] = useState([]);

  const token = localStorage.getItem("access_token");

  const tryHistories = () => {
    histories = props.getHistories(token);
  };

  // const listItems = items.map((item) => <li key={item.toString()}>{item}</li>);

  return (
    <Flex justifyContent="center" p={6}>
      <Box width="80vw" height="20vh" color="gray.600">
        {props.histories}
      </Box>
      <Button onClick={tryHistories}>get histories</Button>

      <ul>
        {histories.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Flex>
  );
};
