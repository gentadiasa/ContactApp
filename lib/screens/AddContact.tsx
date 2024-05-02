// AddContact.tsx
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Touchable, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, createContact, fetchContacts, updateContact } from '../slices/contactSlices';
import { rHeight, rWidth } from '../constants/variables';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Contact } from '../types/types';
import { StackNavigation } from '../router/router';
import { RootState } from '../store/store';
import Loader from '../components/loader';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
    data?: Contact;
}  

const AddContact: React.FC = () => {
    const state = useSelector((state: RootState) => state.contacts);
    const navigation = useNavigation<StackNavigation>();
    const [loading, setLoading] = useState(false);
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
        try {
            let payload = {
                firstName,
                lastName,
                age: parseInt(age),
                photo: img == '' ? 'N/A' : img
            }
            setLoading(true)
            let { data } = route.params as Props;
            let res = data ? await updateContact({...payload, id: data?.id}) : await createContact(payload)
            setLoading(false)
            await dispatch(fetchContacts())
            console.log('rrr', res)
            if(data && res){
                return navigation.navigate('ContactDetail', {data: payload});
            } else if (res){
                // navigation.goBack()
            }
        } catch (error) {
            setLoading(false)
        }
        
    };

    const addImage = () => {
        ImageCropPicker.openPicker({
            includeBase64: true,
        }).then(res => {
            let image = res as any
            let base64image = image['data']
            setImg(`data:${res.mime};base64,${base64image}`)
        });
    }

    return (
        <View style={{flex:1, backgroundColor: 'white'}}>
            {loading && <Loader />}

            <View style={{flexDirection:'row', alignItems: 'center', marginStart: 10, marginTop: rHeight(3),}}>
                <TouchableOpacity
                    style={{
                        paddingRight: 10,
                    }}
                    onPress={()=>navigation.goBack()}
                >
                    <Icon
                        color="black"
                        name="angle-left"
                        size={rHeight(4.5)}
                    />
                </TouchableOpacity>
                <Text style={styles.header}>{route.params ? 'Edit Contact' : 'New Contact'}</Text>
            </View>

            <View style={{paddingHorizontal: 10, marginTop: 15}}>
            <View style={{maxWidth: rWidth(30), alignSelf:'center'}}>
                {
                    img != '' ?
                    <View style={{alignItems:'center'}}>
                        <Image source={{uri: img}} style={{width: rHeight(18), height: rHeight(18), borderRadius: 100, }}/>
                        <TouchableOpacity
                            onPress={addImage}
                            style={{backgroundColor: 'lightgray', alignItems:'center', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 12, marginTop: 5, marginBottom: 10}}
                        >
                            <Text>Change Photo</Text>
                        </TouchableOpacity>
                    </View>
                    : 
                    <>
                        <Icon
                            color="gray"
                            name="user-circle"
                            size={rHeight(15)}
                        />
                        <TouchableOpacity
                            onPress={addImage}
                            style={{backgroundColor: 'lightgray', alignItems:'center', borderRadius: 20, margin: 10, paddingVertical: 10}}
                        >
                            <Text >Add Photo</Text>
                        </TouchableOpacity>
                    </>
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
                    style={{ ...styles.container, backgroundColor: firstName == '' || lastName == '' || img == '' || age == '' ? 'gray' : 'green', alignItems: 'center', borderRadius: 10 }}
                    disabled={firstName == '' || lastName == '' || img == '' || age == ''}
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
        borderRadius: 10,
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
        fontSize: 27,
        fontWeight: 'bold',
        color: 'black',
    },
    text: {
        fontSize: 17,
        color: 'black',
    }
})

export default AddContact;
