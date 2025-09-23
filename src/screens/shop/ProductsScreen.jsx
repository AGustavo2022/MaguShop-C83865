import { StyleSheet, FlatList, Pressable, Image, View } from 'react-native'
import FlatCard from '../../components/FlatCard'
import { useEffect, useState } from 'react'
import Search from '../../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../../services/shopApi'
import { setProductSelected } from '../../store/slices/shopSlice'
import JosefinSansRegular from '../../components/JosefinSans-Regular'


const ProductsScreen = ({ navigation }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [keyword, setKeyword] = useState("")

    const category = useSelector(state => state.shopReducer.categorySelected)

    const { data: productsFilteredByCategory, isLoading, error } = useGetProductsByCategoryQuery(category.toLowerCase())

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
    }, [category, keyword, productsFilteredByCategory])


    const renderProductItem = ({ item }) => (
        <Pressable onPress={() => handleSelectProduct(item)}>
            <FlatCard style={styles.cardContainer}>
                <Image
                    source={{ uri: item.mainImage }}
                    style={styles.productImage}
                    resizeMode="cover"
                />

                <View style={styles.infoContainer}>
                    <JosefinSansRegular style={styles.title}>{item.title}</JosefinSansRegular>
                    <JosefinSansRegular style={styles.brand}>Marca: {item.brand}</JosefinSansRegular>

                    {item.discount > 0 ? (
                        <View>
                            <JosefinSansRegular style={styles.originalPrice}>
                                ${item.price}
                            </JosefinSansRegular>
                            <JosefinSansRegular style={styles.discountedPrice}>
                                ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                            </JosefinSansRegular>
                            <JosefinSansRegular style={styles.discountBadge}>
                                ¡{item.discount}% OFF!
                            </JosefinSansRegular>
                        </View>
                    ) : (
                        <JosefinSansRegular style={styles.currentPrice}>
                            ${item.price}
                        </JosefinSansRegular>
                    )}
                    <JosefinSansRegular style={styles.stock}>
                        {item.stock > 0 ? `Stock: ${item.stock}` : 'AGOTADO'}
                    </JosefinSansRegular>
                </View>
            </FlatCard>
        </Pressable>

    )

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

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
    },
    brand: {
        fontSize: 12,
        marginBottom: 5,
    },
    currentPrice: {
        fontSize: 18,
        color: 'green',
    },
    originalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    discountedPrice: {
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
    },
    discountBadge: {
        fontSize: 10,
        color: 'orange',
        marginTop: 2,
    },
    stock: {
        fontSize: 10,
        color: 'gray',
        marginTop: 5,
    }
});