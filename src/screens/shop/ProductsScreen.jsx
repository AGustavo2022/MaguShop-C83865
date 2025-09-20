import { StyleSheet, Text, View, FlatList,Pressable } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { colors } from '../../global/colors'
import { useEffect, useState } from 'react'
import Search from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../../services/shopApi'
import { setProductSelected } from '../../store/slices/shopSlice'


const ProductsScreen = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [keyword, setKeyword] = useState("")

    const category = useSelector(state=>state.shopReducer.categorySelected)

    const {data: productsFilteredByCategory, isLoading, error} = useGetProductsByCategoryQuery(category.toLowerCase())

    const dispatch = useDispatch()

    const handleSelectProduct = (product) => {
        dispatch(setProductSelected(product))
        navigation.navigate("Producto")
    }
    
    useEffect(() => {
        if (keyword) {
            const productsFilteredByKeyword = productsFilteredByCategory.filter(
                product => product.title.toLowerCase().includes(keyword.toLowerCase())
            )
            setProductsFiltered(productsFilteredByKeyword)
        } else {
            setProductsFiltered(productsFilteredByCategory)
        }
    }, [category, keyword,productsFilteredByCategory])

    
    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => handleSelectProduct(item)}>
            <FlatCard>
                <Text>{item.title}</Text>
            </FlatCard>
        </Pressable>

)

    console.log('produtos de produts',productsFiltered)

    return (
        <>
            <Search keyword={keyword} setKeyword={setKeyword} />
            <FlatList
                data={productsFiltered}
                renderItem={renderProductItem}
                keyExtractor={item => item.id}
            />
        </>

    )
}

export default ProductsScreen

const styles = StyleSheet.create({})
