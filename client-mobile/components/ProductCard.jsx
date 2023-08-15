import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import { DETAIL_PRODUCT } from '../queries/query';

const ProductCard = ({ products }) => {

    const navigation = useNavigation();

    console.log("ini products", products);

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number).slice(0, -3);
    }

    const detailButtonHandler = (productId) => {
        console.log(productId)

        navigation.navigate("DetailProductPage", { productId })
    }


    return (
        <>
            <View style={styles.container}>
                {products?.map((product) =>
                    <Card key={product.id} style={styles.card}>
                        <Card.Cover source={{ uri: product.mainImg }} />
                        <Card.Title style={{ fontWeight: "bold" }} title={product.name} subtitle={`${rupiah(product.price)}`} />
                        <Card.Content>
                            <Text numberOfLines={3} variant="bodyMedium">{product.description}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => detailButtonHandler(product.id)}>Detail</Button>
                        </Card.Actions>
                    </Card>)
                }

            </View>
        </>
    )
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        // numRows: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: "wrap"
    },
    card: {
        // flex: 1,
        width: "47%",
        padding: 5,
        marginHorizontal: 5,
        marginVertical: 10,
        // numRows: 2
    },
});

//   <Card style={{ width: "48%", padding: 5, marginHorizontal: 5, marginVertical: 10 }}>
//             <Card.Cover source={{ uri: product.mainImg }} />
//             <Card.Title style={{ fontWeight: "bold" }} title={product.name} subtitle={`${rupiah(product.price)}`} />
//             <Card.Content>
//                 <Text numberOfLines={3} variant="bodyMedium">{product.description}</Text>
//             </Card.Content>
//             <Card.Actions>
//                 <Button onPress={() => detailButtonHandler(product.id)}>Detail</Button>
//             </Card.Actions>
//         </Card>