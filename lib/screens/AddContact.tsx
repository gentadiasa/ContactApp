// AddContact.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Touchable, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, createContact, updateContact } from '../slices/contactSlices';
import { rHeight, rWidth } from '../constants/variables';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Contact } from '../types/types';
import { StackNavigation } from '../router/router';
import { RootState } from '../store/store';
import Loader from '../components/loader';

interface Props {
    data?: Contact;
}  

const AddContact: React.FC = () => {
    const state = useSelector((state: RootState) => state.contacts);
    const navigation = useNavigation<StackNavigation>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [img, setImg] = useState('');
    const dispatch = useDispatch<any>();
    const route = useRoute();

    useEffect(()=>{
        if(route.params){
            const { data } = route.params as Props;
            setFirstName(`${data?.firstName}`);
            setLastName(`${data?.lastName}`);
            setAge(`${data?.age}`);
            setImg(`${data?.photo}`);
        }
    },[])

    const handleAddContact = async () => {
        if(route.params){
            let { data } = route.params as Props;
            let res = await dispatch(updateContact(data?.id))
            if(res){
                navigation.goBack()
            }
        }
        let payload = {
            firstName,
            lastName,
            age: parseInt(age),
            photo: img
        }
        let res = await dispatch(createContact(payload))
        if(res){
            navigation.goBack()
        }
    };

    const addImage = () => {
        ImageCropPicker.openPicker({
            includeBase64: true,
        }).then(res => {
            let image = res as any
            let base64image = image['data']
            setImg(`data:${res.mime};base64,${base64image}`)
            // console.log(img.substring(0,30))
        });
    }

    return (
        <View style={{flex:1,backgroundColor: 'maroon'}}>
            {state.loading && <Loader />}
            <Text style={styles.header}>{route.params ? 'Edit Contact' : 'Add New Contact'}</Text>
            <View style={styles.container}>
            <View style={{maxWidth: rWidth(30), alignSelf:'center'}}>
                {
                    img != '' ?
                    <TouchableOpacity onPress={addImage}>
                    <Image source={{uri: img}} style={{width: rHeight(10), height: rHeight(10), borderRadius: 50}}/>
                    </TouchableOpacity>
                    : <Button title={"Add Contact Image"} onPress={addImage} />
                }
            </View>
            <TextInput
                placeholder="Enter Contact First Name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
                style={styles.container}
            />
            <TextInput
                placeholder="Enter Contact Last Name"
                value={lastName}
                style={styles.container}
                onChangeText={text => setLastName(text)}
            />
            <TextInput
                placeholder="Input Age"
                keyboardType='number-pad'
                value={age.toString()}
                style={{...styles.container, marginBottom: rHeight(5)}}
                onChangeText={text => setAge(text)}
            />

            <TouchableOpacity
                    onPress={handleAddContact}
                    style={{ ...styles.container, backgroundColor: 'green', alignItems: 'center', borderRadius: 10 }}
                    disabled={firstName == '' && lastName == '' && img == '' && age == ''}
                >
                    <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold' }}>{route.params ? "Update" : "Add Contact"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        shadowColor: "#000",
        borderRadius: 20,
        maxHeight: 500,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: rHeight(3)
    },
    text: {
        fontSize: 17,
        color: 'black',
    }
})

export default AddContact;
