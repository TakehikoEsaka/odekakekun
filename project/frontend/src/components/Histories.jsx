import {
  Flex,
  Box,
  List,
  Button,
  ListItem,
  UnorderedList,
  ListIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { FaWalking, FaTrain, MdPedalBike, FaBus } from "react-icons/fa";

export const Histories = (props) => {
  const token = localStorage.getItem("access_token");

  const tryHistories = () => {
    console.log(props.histories);
    props.getHistories(token);
    console.log(props.histories[0].answer);
  };

  return (
    <Flex justifyContent="center" p={6}>
      <Button onClick={tryHistories}>get histories</Button>
      <List>
        {props.histories &&
          props.histories.map((item) => (
            <ListItem key={item}>
              <ListIcon as={FaWalking} color="green.500" />
              {item.answer}
            </ListItem>
          ))}
      </List>
    </Flex>
  );
};
