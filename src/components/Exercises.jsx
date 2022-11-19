import React, { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExcerciseCard from "./ExcerciseCard";
const Exercises = ({ exercises, bodyPart, setExercises }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const exercisesPerPage =9;
  const indexOfLastExercise =  currentPage * exercisesPerPage
  const indexOfFirstExcercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercises.slice(indexOfFirstExcercise,indexOfLastExercise)
  const paginate = (e,value) =>{
    setCurrentPage(value)
    window.scrollTo({ top: 1800, behavior:'smooth'})
  }
  useEffect(()=>{
    const fetchExcerisesData = async () =>{
      let exercisesData = [];

      if(bodyPart === 'all'){
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      }else{
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }
      setExercises(exercisesData)
    }
    fetchExcerisesData()
  },[bodyPart])
  return (
    <Box id="exercises" sx={{ mt: { lg: "100px" } }} mt="50px" p="20px">
        <Typography variant="h3" mb='46px'>
            Showing Results
        </Typography>
        <Stack direction="row" sx={{ gap: {lg: ' 110px', xs:'50px'}}} flexWrap='wrap' justifyContent={"center"}>
            {currentExercises.map((exercise,index)=> (
                <ExcerciseCard key={index} exercise={exercise} />
            ))}
        </Stack>
        <Stack mt='100px' alignItems='center'>
              {exercises.length > 9 &&(
                <Pagination  color='standard' shape='rounded' count={Math.ceil(exercises.length/exercisesPerPage)} page={currentPage} onChange={paginate} size='large'/>
              ) }
        </Stack>
    </Box>
  );
};

export default Exercises;
