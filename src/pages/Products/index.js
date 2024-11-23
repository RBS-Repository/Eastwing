import React from "react";
import Cards from "../../components/Card";
import { Grid, Box, Flex, Button, Spinner, Text, Container } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { fetchProductList } from "../../api.js";
import "@fontsource/inter";
import { Link } from 'react-router-dom';
function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("products", fetchProductList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;
      return morePagesExist ? allGroups.length + 1 : undefined;
    },
  });

  if (status === "loading")
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );

  if (status === "error")
    return (
      <Flex justify="center" align="center" height="100vh">
        <Text fontSize="lg" color="red.500" fontFamily="Inter">
          An error has occurred: {error.message}
        </Text>
      </Flex>
    );

  return (
    <Container maxW="container.xl" p={4} centerContent fontFamily="Inter" >
      <Grid  id="menu"
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)", 
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)"
        }}
        gap={0}
        mb={5}
      >
        {data.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((item) => (
              <Box
                key={item._id}
                w="100%"
                p={4}
                borderWidth="1px"
                borderRadius="lg"
              >
                <Cards item={item} />
              </Box>
            ))}
          </React.Fragment>
        ))}
      </Grid>

      <Flex mt={8} justify="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          loadingText="Loading more..."
          disabled={!hasNextPage || isFetchingNextPage}
          variant="solid"
          colorScheme="blue"
          size="lg"
          fontFamily="Inter"
        >
          {hasNextPage ? "Load More" : "No More Products"}
        </Button>
      </Flex>
      
    </Container>
    
  );
}

export default Products;
