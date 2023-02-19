import { Flex, Box } from "@chakra-ui/react";

type PropType = {
  suggest: String;
};

export const Results = (props: PropType) => {
  return (
    <Flex justifyContent="center" p={6}>
      <Box width="80vw" height="20vh" color="gray.600">
        {props.suggest}
      </Box>
    </Flex>
  );
};
