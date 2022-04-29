import { StatusBar } from 'expo-status-bar';
import {TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import axios from "axios";
import { useEffect, useState } from 'react';

const baseURL = "http://192.168.43.8:8080/leiturista";

export default function App() {

  const [post, setPost] = useState(null)
  const [error, setErro] = useState(null)

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data[0]);
      console.log(response.data);
    }).catch(error => {
      setErro(error);
    });
  }, []);

  if (error) return (
    <View style={styles.container}>
      <Text>Erro: ${error.message}</Text>
      <StatusBar style="auto" />
    </View>
  )

  if (!post) return (
    <View style={styles.container}>
      <Text>Sem dados!</Text>
      <TouchableOpacity onPress={() => updatePost()}>
        <Text>Cadastrar</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  )

  async function updatePost() {
    await axios.post(baseURL, {
      "matricula": 54321,
      "codigo": "123ABC",
      "situacao": "Impedimento de leitura",
      "latitude": -22.40873045,
      "longitude": -43.6639959715907,
      "foto": "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"
    }).then((response) => {
      setPost(response.data)
    });
  }

  async function deletePost() {
    await axios.delete(baseURL)
      .then(() => {
        setPost(null);
        alert("Dados deletados!")
      });
  }

  return (
    <View style={styles.container}>
      <Text>Matrícula</Text>
      <Text>{post.matricula}</Text>
      <Text>Código</Text>
      <Text>{post.codigo}</Text>
      <Text>Situação</Text>
      <Text>{post.situacao}</Text>
      <Text>Latitude</Text>
      <Text>{post.latitude}</Text>
      <Text>Longitude</Text>
      <Text>{post.longitude}</Text>
      <Text>Foto</Text>
      <Image source={{ uri: `data:image/png;base64,${post.foto}` }} style={styles.foto} />
      <TouchableOpacity onPress={() => deletePost()}>
        <Text>Deletar</Text></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  foto: {
    width:100,
    height: 100,
    flex: 0.2,
    resizeMode: "contain"
  }
});
