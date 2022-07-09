import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Metadata from "../components/Metadata";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const NewRaffle = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="New Raffle"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      {/* main content  */}
      <main>
        <Container p={2} my={20}>
          <Heading as="h2" size="xl" sx={{ textAlign: "center" }}>
            Add new raffle
          </Heading>
          <div>
            <FormControl sx={{ my: 2 }}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input sx={{ _focus: "none" }} id="title" placeholder="Title" />
            </FormControl>
            <FormControl sx={{ my: 2 }}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Textarea sx={{ _focus: "none" }} placeholder="Description" />
            </FormControl>
            <FormControl sx={{ my: 2 }}>
              <FormLabel htmlFor="winners"># of winners</FormLabel>
              <NumberInput max={50} min={0}>
                <NumberInputField sx={{ _focus: "none" }} id="winners" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl sx={{ my: 2 }}>
              <FormLabel htmlFor="date">Date raffle ends</FormLabel>
              <DatePicker
                className="date-picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </FormControl>
            <FormControl sx={{ my: 2 }}>
              <FormLabel htmlFor="image">Image</FormLabel>
              <input type="file" id="image" />
            </FormControl>
            <Button mt={4} colorScheme="green" type="submit">
              Submit
            </Button>
          </div>
        </Container>
      </main>
    </>
  );
};

export default NewRaffle;
