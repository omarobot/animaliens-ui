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
  // states
  const [startDate, setStartDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [raffleImg, setRaffleImg] = useState(null);
  const [url, setURL] = useState("");

  // firebase connection
  // upload image to firebase storage
  const storage = getStorage();
  const imagesRef = ref(storage, `rafflesImages/${raffleImg?.name}`);

  const userCollection = collection(db, "users");

  const raffleCollection = collection(db, "raffles");
  console.log(raffleImg);

  const createUser = async () => {
    const docRef = await addDoc(userCollection, {
      firstname: "Suhag",
      lastname: "Al Amin",
    });
    console.log("Document written with ID: ", docRef.id);
  };
  // createUser();

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // upload image to firebase storage
    if (raffleImg === null) {
      alert("Please select an image");
      return;
    } else {
      uploadBytes(imagesRef, raffleImg)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!");
        })
        .then(() => {
          getDownloadURL(imagesRef).then((url) => {
            console.log(url);
            setURL(url);
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
        <Container p={2} my={20}>
          <Heading as="h2" size="xl" sx={{ textAlign: "center" }}>
            Add new raffle
          </Heading>
          <div>
            <form onSubmit={handleSubmit}>
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
      </main>
    </>
  );
};

export default NewRaffle;
