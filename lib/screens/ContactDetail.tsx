// src/components/ContactDetail.tsx
import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../store/store';
import { StackNavigation } from '../router/router';
import { rHeight } from '../constants/variables';
import { deleteContacts } from '../slices/contactSlices';

const ContactDetail: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();
    const contactId = useSelector((state: RootState) => state.contacts.selectedContactId);
    const contact = useSelector((state: RootState) =>
        state.contacts.contacts.find(c => c.id === contactId)
    );
    const dispatch = useDispatch<any>();

    const handleDelete = async () => {
        await dispatch(deleteContacts(contactId));
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'maroon' }}>
            <View style={styles.container}>
                <Image source={{ uri: contact?.photo }} style={{ width: rHeight(10), height: rHeight(10), borderRadius: 50 }} />
                <Text style={styles.text}>{contact?.firstName} {contact?.lastName}</Text>
                <Text style={{ marginBottom: 20 }}>{contact?.age}</Text>
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddContact', {data: contact})}
                    style={{ ...styles.container, backgroundColor: 'navy', justifyContent: 'center', borderRadius: 10 }}
                >
                    <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold' }}>Edit Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ ...styles.container, backgroundColor: 'black', justifyContent: 'center', borderRadius: 10 }}
                >
                    <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold' }}>Delete Contact</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={{ alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ ...styles.container, backgroundColor: 'red', justifyContent: 'center', borderRadius: 10 }}
                >
                    <Text style={{ ...styles.text, color: 'white', fontWeight: 'bold' }}>BACK</Text>
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
        alignItems: 'center',
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

export default ContactDetail;
