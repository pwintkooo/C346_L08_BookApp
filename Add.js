import React, {useState} from "react";
import {View, Text, TextInput, Button, StyleSheet, StatusBar} from "react-native";
// import {dataSource} from "./DataSource";
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
    textStyle: {
        fontSize: 16
    }
})

const Add = ({navigation, route}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('')
    const [isbn, setIsbn] = useState('');
    const [img, setImg] = useState('');
    const [copyOwned, setCopyOwned] = useState('');

    const setData = async(value) => {
        AsyncStorage.setItem('bookData', value);
        navigation.navigate('Home');
    };

    return(
        <View style={styles.container}>
            <StatusBar/>
            <Text style={styles.textStyle}>Title: </Text>
            <TextInput style={styles.textInputStyle} value={title} onChangeText={setTitle}/>
            <Text style={styles.textStyle}>Author: </Text>
            <TextInput style={styles.textInputStyle} value={author} onChangeText={setAuthor}/>
            <Text style={styles.textStyle}>Publish Year: </Text>
            <TextInput style={styles.textInputStyle} value={publishYear} onChangeText={setPublishYear}/>
            <Text style={styles.textStyle}>ISBN: </Text>
            <TextInput style={styles.textInputStyle} value={isbn} onChangeText={setIsbn}/>
            <Text style={styles.textStyle}>Image URI: </Text>
            <TextInput style={styles.textInputStyle} value={img} onChangeText={setImg}/>
            <Text style={styles.textStyle}>Copy Owned: </Text>
            <TextInput style={styles.textInputStyle} value={copyOwned} onChangeText={setCopyOwned}/>
            <Button
                title='Done'
                onPress={() => {
                    let myData = JSON.parse(route.params.dataString);
                    const newBook = {
                        title: title,
                        author: author,
                        publishYear: publishYear,
                        ISBN: isbn,
                        image: img,
                        copyOwned: copyOwned
                    };
                    if (!title || !author || !publishYear || !isbn || !img || !copyOwned) {
                        return;
                    }
                    myData.push(newBook)
                    let stringData = JSON.stringify(myData);
                    setData(stringData)
                }}
            />
        </View>
    )
}

export default Add;
