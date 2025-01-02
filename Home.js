import React, {useState} from "react";
import {
    View,
    Text,
    StatusBar,
    FlatList,
    Button,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SectionList
} from "react-native";
import {dataSource} from "./DataSource.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        borderBottomColor: 'black',
        borderStyle: "solid",
        borderBottomWidth: 2,
    },
    detailContainer: {
        width: 250,
        gap: 10,
        display: "flex",
        justifyContent: "center",
    },
    imgStyle: {
        width: 150,
        height: 250,
        resizeMode: 'contain'
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    textStyle: {
        fontSize: 16
    },
    headerContainer: {
        backgroundColor: 'purple',
        padding: 10
    },
    headerStyle: {
        color: 'white',
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center"
    },
    flatListContainer: {
        paddingBottom: 80
    }
})

const Home = ({navigation}) => {
    const [myData, setMyData] = useState([]);

    const getData = async() => {
        let dataStr = await AsyncStorage.getItem('bookData');
        if (dataStr != null) {
            let jsonData = JSON.parse(dataStr);
            setMyData(jsonData);
        } else {
            setMyData(dataSource);
        }
    };
    getData();


    const renderItem = ({item, index}) => {
        return(
            <TouchableOpacity
                style={styles.contentContainer}
                onPress={() => {
                    let dataStr = JSON.stringify(myData);
                    navigation.navigate('Edit', {
                        dataString: dataStr,
                        index: index,
                        title: item.title,
                        author: item.author,
                        publishYear: item.publishYear,
                        isbn: item.ISBN,
                        img: item.image,
                        copyOwned: item.copyOwned
                    })
                }}
            >
                <View style={styles.detailContainer}>
                    <Text style={styles.titleStyle}>{item.title}</Text>
                    <Text style={styles.textStyle}>Author: {item.author}</Text>
                    <Text style={styles.textStyle}>Publish Year: {item.publishYear}</Text>
                    <Text style={styles.textStyle}>ISBN: {item.ISBN}</Text>
                    <Text style={styles.textStyle}>Copies Owned: {item.copyOwned}</Text>
                </View>
                <View style={styles.imgStyle}>
                    <Image source={{uri: item.image}} alt={item.name} style={styles.imgStyle}/>
                </View>
            </TouchableOpacity>
        )
    }

    return(
        <View style={styles.container}>
            <StatusBar/>
            <View style={styles.headerContainer}>
                <Text style={styles.headerStyle}>My Collections</Text>
            </View>
            <FlatList
                data={myData}
                renderItem={renderItem}
                ListFooterComponent={
                    <Button
                        title='Add Book'
                        onPress={() => {
                            let dataStr = JSON.stringify(myData);
                            navigation.navigate('Add', {dataString: dataStr});
                        }}
                    />
                }
            />
        </View>
    )
}

export default Home;
