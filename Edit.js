import React, {useState} from "react";
import {View, Text, Button, StatusBar, TextInput, StyleSheet, Alert} from "react-native";
import {dataSource} from "./DataSource.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    textInputStyle: {
        borderWidth: 1,
        marginBottom: 8
    },
    container: {
        padding: 10,
        gap: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10
    },
    buttonStyle: {
        flex: 1,
    },
    textStyle: {
        fontSize: 16
    }
})

const Edit = ({navigation, route}) => {
    const [title, setTitle] = useState(route.params.title);
    const [author, setAuthor] = useState(route.params.author);
    const [publishYear, setPublishYear] = useState(route.params.publishYear)
    const [isbn, setIsbn] = useState(route.params.isbn);
    const [img, setImg] = useState(route.params.img);
    const [copyOwned, setCopyOwned] = useState(route.params.copyOwned);

    const setData = async(value) => {
        await AsyncStorage.setItem('bookData', value);
        navigation.navigate('Home');
    };

    return(
        <View style={styles.container}>
            <StatusBar/>
            <Text style={styles.textStyle}>Title: </Text>
            <TextInput style={styles.textInputStyle} value={title} onChangeText={setTitle}/>
            <Text>Author: </Text>
            <TextInput style={styles.textInputStyle} value={author} onChangeText={setAuthor}/>
            <Text>Publish Year: </Text>
            <TextInput style={styles.textInputStyle} value={publishYear} onChangeText={setPublishYear}/>
            <Text>ISBN: </Text>
            <TextInput style={styles.textInputStyle} value={isbn} onChangeText={setIsbn}/>
            <Text>Image URI: </Text>
            <TextInput style={styles.textInputStyle} value={img} onChangeText={setImg}/>
            <Text>Copy Owned: </Text>
            <TextInput style={styles.textInputStyle} value={copyOwned} onChangeText={setCopyOwned}/>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonStyle}>
                    <Button
                        title='Save'
                        onPress={() => {
                            let myData = JSON.parse(route.params.dataString);
                            myData[route.params.index].title = title;
                            myData[route.params.index].author = author;
                            myData[route.params.index].publishYear = publishYear;
                            myData[route.params.index].ISBN = isbn;
                            myData[route.params.index].image = img;
                            myData[route.params.index].copyOwned = copyOwned;
                            let stringData = JSON.stringify(myData);
                            setData(stringData);
                        }}
                    />
                </View>
                <View style={styles.buttonStyle}>
                    <Button
                        title='Delete'
                        onPress={() => {
                            let myData = JSON.parse(route.params.dataString);
                            Alert.alert("Are you sure?", '',
                                [{text: 'Yes', onPress:() => {
                                        myData.splice(route.params.index, 1);
                                        let stringData = JSON.stringify(myData);
                                        setData(stringData)
                                    }},
                                    {text: 'No'}
                                ])
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

export default Edit;
