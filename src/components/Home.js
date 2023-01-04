import { Card, CardContent, createTheme, Grid, TextField, Typography, CircularProgress} from "@mui/material"
import { Stack, ThemeProvider } from "@mui/system";
import axios from "axios";

import React, { Component, useEffect, useState }  from 'react';
import { useBuscarPerro } from "../Queries/QueriPerro";
import Perro from "./Perro";

import { LinearProgress } from "@mui/material";

const Home = () => {
    
    


    useEffect(() => {
        //cargarImagenes();

        axios.get("http://127.0.0.1:8000/api/tinder/verInteresadosRechazados?id=1").then(
            (response) => {
                //setAceptados(response.data.perros);

                setCancelados(response.data.perros);
            },
            (error) => {
                console.log(error);
            }
        );
        axios.get("http://127.0.0.1:8000/api/tinder/verInteresadosAceptados?id=1").then(
            (response) => {
                //setAceptados(response.data.perros);

                setAceptados(response.data.perros);
            },
            (error) => {
                console.log(error);
            }
        );

    }, []);
    
    const [listado, setListado] = useState([]);
    const [finder, setFinder] = useState("");
    const [errors, setErrors] = useState(false);
    const [cancelados, setCancelados] = useState([]);
    const [aceptados, setAceptados] = useState([]);
    //const [cargando, setCargando] = useState(false);

    const [objetoPruebaAntiguo, setObjetoPrueba] = useState({nombre :'', foto: ''}); 
    const [nombrePerro, setNombrePerro] = useState(""); 


    const { data: objetoPrueba, isLoading: cargandoDos , refetch: recargar, isRefetching: cargando} = useBuscarPerro();

  //console.log(objetoPrueba);

    

    //console.log("alo");

    // const cargarImagenes = () => {
    //     //console.log("hola");
    //     setCargando(true); 
    //     //console.log("verdadero");
        
    //     axios.get("https://dog.ceo/api/breeds/image/random").then(
    //         (response) => {
    //             //console.log(response.data);
                
    //             setObjetoPrueba(response.data);
    //             setNombrePerro(generateRandomString(6));
    //             //setObjetoPrueba({...objetoPrueba, nombre: generateRandomString(6)});
    //             //setObjetoPrueba({foto: response.data.message, nombre: generateRandomString(6)});
    //             //aca Sleep
    //             setTimeout(function() {
    //                 setCargando(false);
    //               }, 1000);
                
    //             //onsole.log(objetoPrueba);
    //             //console.log("falso");
    //             //console.log('"'+ response.data.message +'"');
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // };

    
    
    const handleInputChange = (event)=> {
        setFinder(event.target.value);
    }
    const handleInputChangeDos = (event)=> {
        const {name, value} = event.target;
        setObjetoPrueba({...objetoPrueba,[name]: value});
        
    }
    const stackCancelados = (itemExterno) => {
        axios.post("http://127.0.0.1:8000/api/tinder/postInteraccion", {
            preferencia: 'R',
            id_perro_interesado: 1,
            id_perro_candidato: itemExterno.id  
            });
        setCancelados((cancelados) => [itemExterno,...cancelados]);
        recargar();
        //cargarImagenes();
        //console.log(itemExterno);

        axios.post("http://127.0.0.1:8000/api/tinder/postInteraccion", {
            preferencia: 'R',
            id_perro_interesado: 1,
            id_perro_candidato: itemExterno.id  
            });
            //console.log(itemExterno);
            
        var perroRechazado = {
            url_foto: itemExterno.perroFoto,
            nombre: itemExterno.perroNombre,
            descripcion: itemExterno.descripcionPerro,
            id: itemExterno.id
        };

        //console.log(perroRechazado);
        
        // setAceptados((aceptados) => [ itemExterno, ...aceptados]);
         axios.get("http://127.0.0.1:8000/api/tinder/verInteresadosRechazados?id=1").then(
            (response) => {
                //setAceptados(response.data.perros);

                setCancelados((Cancelados) => [ perroRechazado, ...response.data.perros]);
            },
            (error) => {
                console.log(error);
            }
        );



        //console.log(aceptadosAPI);
        //setAceptados();
        recargar();
        //cargarImagenes();
    }
    
    const stackAceptados =  (itemExterno) => {
        axios.post("http://127.0.0.1:8000/api/tinder/postInteraccion", {
            preferencia: 'A',
            id_perro_interesado: 1,
            id_perro_candidato: itemExterno.id  
            });
            //console.log(itemExterno);
            
        var perroAceptado = {
            url_foto: itemExterno.perroFoto,
            nombre: itemExterno.perroNombre,
            descripcion: itemExterno.descripcionPerro,
            id: itemExterno.id
        };

        //console.log(perroAceptado);
        
        // setAceptados((aceptados) => [ itemExterno, ...aceptados]);
         axios.get("http://127.0.0.1:8000/api/tinder/verInteresadosAceptados?id=1").then(
            (response) => {
                //setAceptados(response.data.perros);

                setAceptados((aceptados) => [ perroAceptado, ...response.data.perros]);
            },
            (error) => {
                console.log(error);
            }
        );



        //console.log(aceptadosAPI);
        //setAceptados();
        recargar();
        //cargarImagenes();
    }
    const stackArrepentidoC = (itemExterno) => {
        //console.log(itemExterno);
        axios.post("http://127.0.0.1:8000/api/tinder/cambiarInteraccion", {
            preferencia: 'A',
            id_perro_interesado: 1,
            id_perro_candidato: itemExterno.id  
            });
            //console.log(itemExterno);
            
        var perroAceptado = {
            url_foto: itemExterno.perroFoto,
            nombre: itemExterno.perroNombre,
            descripcion: itemExterno.descripcionPerro,
            id: itemExterno.id
        };

        //console.log(perroAceptado);
        
        // setAceptados((aceptados) => [ itemExterno, ...aceptados]);
         axios.get("http://127.0.0.1:8000/api/tinder/verInteresadosAceptados?id=1").then(
            (response) => {
                //setAceptados(response.data.perros);

                setAceptados((aceptados) => [ perroAceptado, ...response.data.perros]);
            },
            (error) => {
                console.log(error);
            }
        );


        //setAceptados((aceptados) => [ itemExterno, ...aceptados]);
        let result = cancelados.filter((item) => item.url_foto !== itemExterno.perroFoto);
        setCancelados(result);
        
    }
    const stackArrepentidoA = (itemExterno) => {
        axios.post("http://127.0.0.1:8000/api/tinder/cambiarInteraccion", {
            preferencia: 'R',
            id_perro_interesado: 1,
            id_perro_candidato: itemExterno.id  
            });
            
        var perroRechazado = {
            url_foto: itemExterno.perroFoto,
            nombre: itemExterno.perroNombre,
            descripcion: itemExterno.descripcionPerro,
            id: itemExterno.id
        };

        
        // setAceptados((aceptados) => [ itemExterno, ...aceptados]);
         axios.get("http://127.0.0.1:8000/api/tinder/verInteresadosRechazados?id=1").then(
            (response) => {
                //setAceptados(response.data.perros);

                setCancelados((cancelados) => [ perroRechazado, ...response.data.perros]);
            },
            (error) => {
                console.log(error);
            }
        );


        //setAceptados((aceptados) => [ itemExterno, ...aceptados]);
        let result = aceptados.filter((item) => item.url_foto !== itemExterno.perroFoto);
        setAceptados(result);




        // setCancelados((cancelados) => [ itemExterno,...cancelados]);
        // let result = aceptados.filter((item) => item.perroFoto !== itemExterno.perroFoto);
        // setAceptados(result);
        
    }

    
    let estilo = {}

    



    return (
        
        <Card sx={{backgroundImage: 'url(https://wallpaperaccess.com/full/1314846.jpg)'}}>
            <CardContent>


            <Typography style={{textAlign: "center"}} variant="h3">Tinder DOG</Typography>

            <br></br>
            
                <Grid container spacing={3} >

                    <Grid item xs={100} md={4} >
                    <Typography variant="h5" gutterBottom align="center" >
                    Candidato
                    </Typography>
                            {cargandoDos || cargando ? (
                                <CircularProgress />
                                
                            ): (objetoPrueba&& <Perro foto= {objetoPrueba.foto} nombre={objetoPrueba.nombre} descripcion={objetoPrueba.descripcion}
                                id= {objetoPrueba.id} funcionCancelados={stackCancelados} funcionAceptados={stackAceptados} estadoBoton={cargando}></Perro>
                        )}
     
                    </Grid>
                    
                    <Grid item xs={6} md={4} >
                        <Typography variant="h5" gutterBottom align="center" >
                        Aceptados
                        </Typography>
                        <Grid item  sx={{ overflowY: "scroll", maxHeight: "80vh"}}>
                            {aceptados.map((element, index) => (
                                // <Perro 
                                //     foto= {element.perroFoto} nombre= {element.perroNombre} descripcion={element.descripcionPerro} cancelado= {"aceptado" } 
                                //     id= {element.id} funcionArrepentirseA= {stackArrepentidoA}
                                // ></Perro>
                                <Perro 
                                    foto= {element.url_foto} nombre= {element.nombre} descripcion={element.descripcion} cancelado= {"aceptado" } 
                                    id= {element.id} funcionArrepentirseA= {stackArrepentidoA}
                                ></Perro>
                            ))}
                        </Grid>
                            
                    </Grid>
                    
                    <Grid item xs={6} md={4} >
                    <Typography variant="h5" gutterBottom align="center" >
                    Cancelados
                    </Typography>
                        <Grid item sx={{ overflowY: "scroll", maxHeight: "80vh"}}>
                            {cancelados.map((element, index) => (
                                <Perro 
                                foto= {element.url_foto} nombre= {element.nombre} descripcion={element.descripcion} cancelado= {"cancelado" } 
                                id= {element.id} funcionArrepentirseC= {stackArrepentidoC}
                                ></Perro>
                                // <Perro 
                                // foto= {element.perroFoto} nombre= {element.perroNombre} descripcion={element.descripcionPerro} cancelado= {"cancelado"}  
                                // id= {element.id} funcionArrepentirseC= {stackArrepentidoC}
                                // ></Perro>
                                
                            ))}
                        </Grid>
                        
                    </Grid>
                
                    
                </Grid>
                
            </CardContent>        
        </Card>
    
    );
}

export default Home;