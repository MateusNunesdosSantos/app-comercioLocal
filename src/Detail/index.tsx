import { RouteProp,  useNavigation,  useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { IMarker } from "../Home";

type DetailRoute = RouteProp<{detail: IMarker}, "detail">

export default function Detail () {
    const [address, setAddres] = useState<any>();

    const { params } = useRoute<DetailRoute>();
    const navigation = useNavigation();

useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${params.latitude}&lon=${params.longitude}&format=json`
    ).then(async (request) => {
      const data = await request.json();

      setAddres(data);
     navigation.setOptions({
         title: params.name,
     })
    });
  }, []);



return (
        <View style={styles.container}>
            <Text style={styles.title}>{params.name}</Text>
            <Text style={styles.subTile}>{params.description}</Text>
            <Text style={styles.section}>Endereço</Text>
            <Text style={styles.text}>{address?.address.road}</Text>
            <Text style={styles.text}>{address?.address.city}</Text>
            <Text style={styles.text}>{address?.address.postcode}</Text>
            <Text style={styles.text}>{address?.address.state}</Text>

            <Text style={styles.section}>Contato</Text>
            <Text style={styles.text}>{params.contact}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f5f5',
        padding: 20,
    },
    title: {
        color: '#322153',
        fontSize: 28,
        fontWeight: 'bold',
    },
    subTile: {
        color: '#6c6c80',
        fontSize: 18,
        fontWeight: '400',
    },
    section: {
        color: '#322153',
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 20,
    },
    text: {
        color: '#6c6c80',
        fontSize: 16,
    }
})