import { StyleSheet, Text, View, Pressable, Image, ScrollView, useWindowDimensions } from 'react-native'
import { colors } from '../../global/colors'
import { useSelector,useDispatch } from 'react-redux'
import { addItemTocart } from '../../store/slices/cartSlice'
import JosefinSansRegular from '../../components/JosefinSans-Regular'
import BellezaRegular from '../../components/Belleza-Regular'


const ProductScreen = () => {
    const product = useSelector(state=>state.shopReducer.productSelected)
    const { width } = useWindowDimensions()
    const dispatch = useDispatch()
    console.log('producto',product)
    return (
        <ScrollView style={styles.productContainer}>
            <JosefinSansRegular style={styles.textBrand}>{product.brand}</JosefinSansRegular>
            <BellezaRegular style={styles.textTitle}>{product.title}</BellezaRegular>
            <Image
                source={{ uri: product.mainImage }}
                alt={product.title}
                width='100%'
                height={width * .7}
                resizeMode='contain'
            />
            <JosefinSansRegular style={styles.longDescription}>{product.longDescription}</JosefinSansRegular>
            <View style={styles.tagsContainer}>
                <View style={styles.tags}>
                    <JosefinSansRegular style={styles.tagText}>Tags : </JosefinSansRegular>
                    {
                        product.tags?.map(tag => <JosefinSansRegular key={Math.random()} style={styles.tagText}>{tag}</JosefinSansRegular>)
                    }
                </View>

                {
                    product.discount > 0 && <View style={styles.discount}><JosefinSansRegular style={styles.discountText}>-{product.discount}%</JosefinSansRegular></View>
                }
            </View>
            {
                product.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>
            }
            <JosefinSansRegular style={styles.price}>Precio: ${product.price}</JosefinSansRegular>
            <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }, styles.addToCartButton]}
                onPress={()=>dispatch(addItemTocart({product:product,quantity:1}))}>
                <JosefinSansRegular style={styles.textAddToCart}>Agregar al carrito</JosefinSansRegular>
            </Pressable>
        </ScrollView>
    )
}

export default ProductScreen

const styles = StyleSheet.create({
    productContainer: {
        paddingHorizontal: 16,
        marginVertical: 16,
    },
    textBrand: {
        color: colors.grisOscuro,
    },
    textTitle: {
        fontSize: 24,
        fontWeight: '700'
    },
    longDescription: {
        fontSize: 16,
        textAlign: 'justify',
        paddingVertical: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8
    },
    tags: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 14,
        color: colors.purple
    },
    price: {
        fontWeight: '800',
        fontSize: 18
    },
    discount: {
        backgroundColor: colors.brightOrange,
        width: 52,
        height: 52,
        borderRadius: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    discountText: {
        color: colors.white,
        textAlign: 'center',
        verticalAlign: 'center'
    },
    noStockText: {
        color: colors.red
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        alignSelf: 'center',
        paddingVertical: 16
    },
    addToCartButton: {
        padding: 8,
        paddingHorizontal: 16,
        backgroundColor: colors.purple,
        borderRadius: 16,
        marginVertical: 16
    },
    textAddToCart: {
        color: colors.white,
        fontSize: 24,
        textAlign: 'center',
    }
})