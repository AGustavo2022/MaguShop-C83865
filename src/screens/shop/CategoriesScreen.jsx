import { Pressable, View, StyleSheet, Image, Dimensions, FlatList } from 'react-native';
import FlatCard from '../../components/FlatCard';
import { useDispatch } from 'react-redux';
import { setCategorySelected } from '../../store/slices/shopSlice';
import { useGetCategoriesQuery } from '../../services/shopApi';
import JosefinSansRegular from '../../components/JosefinSans-Regular';


const CategoriesScreen = ({ navigation }) => {

    const { data: categories, isLoading, error } = useGetCategoriesQuery()


    const dispatch = useDispatch()

    const screenWidth = Dimensions.get('window').width;
    const cardWidth = screenWidth * 0.40; // Por ejemplo, 40% del ancho

    const handleSelectCategory = (category) => {
        dispatch(setCategorySelected(category))
        navigation.navigate("Productos")
    }

    const renderCategoryItem = ({ item }) => {
        return (
            <Pressable onPress={() => handleSelectCategory(item.title)}>
                <FlatCard style={[styles.cardCustom, { width: cardWidth }]}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.categoryIcon}
                            resizeMode='contain'
                        />
                    </View>
                    <JosefinSansRegular style={styles.title}>{item.title}</JosefinSansRegular>
                </FlatCard>
            </Pressable>
        )
    }

    return (
        <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={item => item.id}
        />
    )
}

export default CategoriesScreen


const styles = StyleSheet.create({
    cardCustom: {
        padding: 10,
        margin: 8,
        borderRadius: 12,
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: 150, 
        elevation: 5,
    }, 
    iconContainer: {
        width: 70, 
        height: 70,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOpacity: 0.05, 
        shadowRadius: 2,
    },
    categoryIcon: {
        width: 100,
        height: 80,
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
    },
});