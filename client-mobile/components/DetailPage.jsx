import { useEffect, useState } from 'react';
import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';
// Carousel
import { View, ScrollView, StyleSheet } from 'react-native';
import CarouselCardsDetail from './CarouselDetailPage/Carousel';
import { DETAIL_PRODUCT } from '../queries/query';
import { useQuery } from '@apollo/client';

const DetailProductPage = ({ route, navigation }) => {
    const { productId } = route.params;
    console.log(productId)

    const { data, loading, error } = useQuery(DETAIL_PRODUCT, { variables: { productId: +productId } });

    console.log(data)

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number).slice(0, -3);
    }
    const isCarousel = React.useRef(null)

    const dataImage = [{ imgUrl: data?.product?.mainImg }]
    const images = data?.product?.Images?.map((el) => (dataImage.push({ imgUrl: el.imgUrl })))

    const backButtonHandler = () => {
        navigation.goBack()
    }

    return (
        // <></>
        <ScrollView >
            <Card >
                <Card.Actions>
                    <Button icon="arrow-left" mode="contained" onPress={backButtonHandler}>
                        Back
                    </Button>
                </Card.Actions>
                <View>
                    <CarouselCardsDetail data={dataImage} />
                </View>
                <Card.Title style={{ fontWeight: "bold" }} title={data?.product?.name} subtitle={`${rupiah(data?.product?.price)}`} />
                <Card.Content>
                    <Text variant="bodyMedium">Made by : {data?.product?.Author?.username}</Text>
                    <Text style={{ marginTop: 2 }} variant="bodyMedium">Category : {data?.product?.Category?.name}</Text>
                    <Text style={{ marginTop: 10 }} variant="bodyMedium">{data?.product?.description}</Text>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'col',
        justifyContent: "flex-start",
        // paddingHorizontal: 10,
        marginRight: 350
    },
    button: {
        flex: 0.5,
        alignItems: "flex-start",
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderColor: "red"
    },
});


export default DetailProductPage;
