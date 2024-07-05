import axios from "axios";

const userAPI = axios.create({
  baseURL: "http://popcorner.vercel.app/",
});

export const getUser = (userID) => {
  // console.log(userID);
  return userAPI.get(`/users/${userID}`).then(({ data }) => {
    // console.log(data);
    return data.user;
  });
};
export const getChatbyChatId = (chatID)=>{
  return userAPI.get(`/messages/${chatID}`).then(({data})=>{
    return data
  })
}
// export const getMessagebyChatId = (chatID)=>{
//   return userAPI.post(`/messages/${chatID}`).then(({data})=>{
//     return data
//   })
// }

const apiKey = "fc774c3845ae6ffdefec17c7db1f7fec";

const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const getPopularMovies = () => {
  return moviesApi.get(`/movie/popular?api_key=${apiKey}`).then((res) => {
    // console.log(res.data);
    return res.data;
  });
};
