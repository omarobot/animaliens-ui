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
import { db, storage } from "../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";

const NewRaffle = () => {
  // get admin from localStorage
  const admin = localStorage.getItem("app-admin");

  // states
  const [endDate, setEndDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [raffleImg, setRaffleImg] = useState(null);
  const [url, setURL] = useState("");
  const [raffleInfo, setRaffleInfo] = useState({});

  // get date and time in iso format
  const date = new Date(endDate.toISOString());
  const milliseconds = date.getTime();

  // firebase connection
  // upload image to firebase storage
  const storage = getStorage();
  const imagesRef = ref(storage, `rafflesImages/${raffleImg?.name}`);

  // firebase collection
  const userCollection = collection(db, "users");
  const raffleCollection = collection(db, "raffles");

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newValue = { ...raffleInfo };
    newValue[field] = value;
    setRaffleInfo(newValue);
  };

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, description, winners } = raffleInfo;
    if (!name || !description) {
      alert("Please fill in all fields");
    } else {
      // upload image to firebase storage
      if (raffleImg === null) {
        alert("Please select an image");
        return;
      } else {
        // upload image
        uploadBytes(imagesRef, raffleImg)
          .then((snapshot) => {
            // console.log("Uploaded a blob or file!");
          })
          .then(() => {
            getDownloadURL(imagesRef).then((url) => {
              setURL(url);
            });
          })
          .catch((error) => {
            alert(error);
          });
        // add raffle to firebase

        raffleInfo.date = milliseconds;
        raffleInfo.image = url;
        raffleInfo.winners = !winners ? 0 : parseInt(raffleInfo.winners);
        raffleInfo.entries = 0;

        const addRaffle = async () => {
          const docRef = await addDoc(raffleCollection, raffleInfo);
          if (docRef.id) {
            alert("Raffle added successfully!");
            window.location.reload();
          } else {
            alert("Error adding raffle");
          }
        };
        addRaffle();
      }
    }
  };

  return (
    <>
      <Metadata
        titleTwitter="SpaceBudz: Collectible Astronauts"
        title="New Raffle"
        description="Collect your unique SpaceBud as NFT on the Cardano blockchain."
      />
      {/* main content  */}
      <main>
        {admin ? (
          <Container p={2} my={20}>
            <Heading as="h2" size="xl" sx={{ textAlign: "center" }}>
              Add new raffle
            </Heading>
            <div>
              <form onSubmit={handleSubmit}>
                <FormControl sx={{ my: 2 }}>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    sx={{ _focus: "none" }}
                    onBlur={handleOnBlur}
                    name="name"
                    id="title"
                    placeholder="Title"
                  />
                </FormControl>
                <FormControl sx={{ my: 2 }}>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    sx={{ _focus: "none" }}
                    onBlur={handleOnBlur}
                    name="description"
                    placeholder="Description"
                  />
                </FormControl>
                <FormControl sx={{ my: 2 }}>
                  <FormLabel htmlFor="winners"># of winners</FormLabel>
                  <NumberInput
                    onBlur={handleOnBlur}
                    name="winners"
                    max={50}
                    min={0}
                  >
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
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </FormControl>
                <FormControl sx={{ my: 2 }}>
                  <FormLabel htmlFor="image">Image</FormLabel>
                  <input
                    onChange={(e) => setRaffleImg(e.target.files[0])}
                    type="file"
                    id="image"
                  />
                </FormControl>
                <Button mt={4} colorScheme="green" type="submit">
                  Submit
                </Button>
              </form>
            </div>
          </Container>
        ) : (
          <Container p={2} my={20}>
            <Heading as="h2" size="xl" sx={{ textAlign: "center" }}>
              You don't have access to this page
            </Heading>
          </Container>
        )}
      </main>
    </>
  );
};

export default NewRaffle;
