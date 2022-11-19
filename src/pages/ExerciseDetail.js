import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { fetchData, exerciseOptions, youtubeOptions} from '../utils/fetchData'
import Detail from '../components/Detail'
import ExerciseVideo from '../components/ExerciseVideo'
import SimilarExercise from '../components/SimilarExercise'

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([])
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([])
  const [targetEquipmentExercises, setTargetEquipmentExercises] = useState([])
  const {id} = useParams()

  useEffect(() => {
    const fetchExercisesData = async () =>{
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
      const youtubeDbUrl = 'https://youtube-search-and-download.p.rapidapi.com'
      
      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`,exerciseOptions)
      setExerciseDetail(exerciseDetailData)

      const exerciseVideosData = await fetchData(`${youtubeDbUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions)
      setExerciseVideos(exerciseVideosData.contents) 
      
      const targetMuscleExrcisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,exerciseOptions)
      setTargetMuscleExercises(targetMuscleExrcisesData)
      
      const equipmentExrcisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,exerciseOptions) 
      setTargetEquipmentExercises(equipmentExrcisesData)
    }
    fetchExercisesData()
    
  }, [id])
  
  return (
  <Box>
    <Detail  exerciseDetail={exerciseDetail}/>
    <ExerciseVideo exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
    <SimilarExercise targetMuscleExercises={targetMuscleExercises} targetEquipmentExercises={targetEquipmentExercises}/>
  </Box>
    )
}

export default ExerciseDetail