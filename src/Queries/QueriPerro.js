import { useQuery, queryCache } from "@tanstack/react-query";
import axios from "axios";
import { LoremIpsum } from "lorem-ipsum";

export function useBuscarPerro() {
    return useQuery(
        ["buscarPerro"], buscarPerro, {
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        keepPreviousData: false,
        enabled: true
    }
    )
}

export const buscarPerro = async () => {
    //ya no llama a esta api sino que a backend
    //const { data } =  await axios.get("https://dog.ceo/api/breeds/image/random")
    const { data } =  await axios.get("http://127.0.0.1:8000/api/tinder/getPerroAzar")
    
    // let nombrePerro = generateRandomString(6);
    // let descripcionPerro = lorem.generateSentences(3)
    let PerroPreFusion= {foto: data.perros.url_foto, nombre: data.perros.nombre, descripcion: data.perros.descripcion, id: data.perros.id}

    return PerroPreFusion;

    //setObjetoPrueba(response.data);
}

export const postInteraccion = async () => {
    //ya no llama a esta api sino que a backend
    //const { data } =  await axios.get("https://dog.ceo/api/breeds/image/random")
    const { data } =  await axios.get("http://127.0.0.1:8000/api/tinder/getPerroAzar")
    // await axios.post("http://127.0.0.1:8000/api/tinder/postInteraccion", {
    //     preferencia: 'A',
    //     id_perro_interesado: 1,
    //     id_perro_candidato: 'Flintstone'
    //   });
    console.log(data);
    // let nombrePerro = generateRandomString(6);
    // let descripcionPerro = lorem.generateSentences(3)
    let PerroPreFusion= {foto: data.perros.url_foto, nombre: data.perros.nombre, descripcion: data.perros.descripcion}

    return PerroPreFusion;

    //setObjetoPrueba(response.data);
}

// const  generateRandomString = (num) => {
//     const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     let result1= ' ';
//     const charactersLength = characters.length;
//     for ( let i = 0; i < num; i++ ) {
//         result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }

//     return result1;   
// }

// const lorem = new LoremIpsum({
//     sentencesPerParagraph: {
//       max: 8,
//       min: 4
//     },
//     wordsPerSentence: {
//       max: 16,
//       min: 4
//     }
//   });