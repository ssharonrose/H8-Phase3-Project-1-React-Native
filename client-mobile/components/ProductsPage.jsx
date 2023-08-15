import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import ProductCard from './ProductCard';
import display from "./CarouselMainPage/dataCarouselHome.json"
import CarouselCards from './CarouselDetailPage/Carousel';
import CarouselCardsMainPage from './CarouselMainPage/Carousel';
import { GET_PRODUCTS, DETAIL_PRODUCT } from '../queries/query';
import { useQuery } from '@apollo/client';


const ProductsPage = ({ navigation }) => {
    const { data, loading, error } = useQuery(GET_PRODUCTS);
    // console.log(data?.products, "<<<<<<<<<<<")


    return (
        <>
            <ScrollView>
                <CarouselCardsMainPage data={display} />
                <ProductCard products={data?.products}></ProductCard>
            </ScrollView>
        </>
    )
}

export default ProductsPage